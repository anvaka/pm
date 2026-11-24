import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../src/galaxy/windows/windowCollectionModel.js', import.meta.url), 'utf8');
const dataURL = text => 'data:text/javascript;base64,' + Buffer.from(text).toString('base64');

async function fixture() {
  // Inject only the event transport; execute the actual collection implementation.
  const eventSource = `export function eventify(api) {
    const handlers = new Map();
    api.on = (name, callback) => { if (!handlers.has(name)) handlers.set(name, []); handlers.get(name).push(callback); };
    api.fire = (name, ...args) => { for (const callback of handlers.get(name) || []) callback(...args); };
    return api;
  }
  const bus = eventify({});
  export default {
    showNodeListWindow: { on: callback => bus.on('show', callback), fire: (...args) => bus.fire('show', ...args) },
    hideNodeListWindow: { on: callback => bus.on('hide', callback), fire: (...args) => bus.fire('hide', ...args) }
  };`;
  const url = dataURL(eventSource + `
// fixture ${Math.random()}`);
  const { default: events } = await import(url);
  const transformed = source
    .replace("'../service/appEvents.js'", JSON.stringify(url))
    .replace("import eventify from 'ngraph.events';", `import { eventify } from ${JSON.stringify(url)};`);
  const { default: model } = await import(dataURL(transformed));
  return { events, model };
}

for (const removed of [0, 1]) {
  for (const operation of ['update', 'hide']) {
    test(`${operation} a surviving window after removing index ${removed}`, async () => {
      const { events, model } = await fixture();
      const items = [{ name: 'first' }, { name: 'second' }, { name: 'third' }];
      items.forEach((item, i) => events.showNodeListWindow.fire(item, `id${i}`));
      events.hideNodeListWindow.fire(`id${removed}`);
      const expected = items.filter((_, i) => i !== removed);
      if (operation === 'update') {
        const replacement = { name: 'updated third' };
        events.showNodeListWindow.fire(replacement, 'id2');
        expected[expected.length - 1] = replacement;
      } else {
        events.hideNodeListWindow.fire('id2');
        expected.pop();
      }
      assert.deepEqual(model.getWindows(), expected);
      events.hideNodeListWindow.fire('unknown');
      assert.deepEqual(model.getWindows(), expected);
    });
  }
}

test('removed IDs can reopen and change notifications preserve removal indices', async () => {
  const { events, model } = await fixture();
  const removed = [];
  model.on('changed', index => { if (index !== undefined) removed.push(index); });
  events.showNodeListWindow.fire('a', 'a');
  events.showNodeListWindow.fire('b', 'b');
  events.hideNodeListWindow.fire('a');
  events.showNodeListWindow.fire('new a', 'a');
  events.hideNodeListWindow.fire('b');
  assert.deepEqual(model.getWindows(), ['new a']);
  assert.deepEqual(removed, [0, 0]);
});
