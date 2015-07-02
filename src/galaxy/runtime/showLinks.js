import appEvents from '../service/appEvents.js';
import scene from '../store/scene.js';

export default showLinks;

function showLinks(from, to, color) {
  var graph = scene.getGraph();
  if (typeof from !== 'boolean') {
    from = from.results;
  }
  if (typeof to !== 'boolean') {
    to = to.results;
  }
  var links = graph.findLinks(from, to);
  appEvents.highlightLinks.fire(links, color);
}
