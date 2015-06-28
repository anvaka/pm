import appEvents from '../service/appEvents.js';

export default highlight;

function highlight(query, color, size) {
  appEvents.highlightQuery.fire(query, color, size);
}
