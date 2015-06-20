/**
 * Defines list of global events transmitted inside the application.
 *
 * Views should never listen to these, instead stores and native renderer
 * consume these, transform them to view-friendly format and fire store-specific
 * events.
 */
import keymirror from 'keymirror';
import appEvents from './appEvents.js';

export default activateEvents({
  /**
   * Fired when labels are downloaded
   */
  labelsDownloaded: null,

  /**
   * Fired when positions are downloaded
   */
  positionsDownloaded: null,

  /**
   * Fired when links are downloaded
   */
  linksDownloaded: null,

  /**
   * Fired when new galaxy page is opened and graph download is required
   */
  downloadGraphRequested: null,

  /**
   * Fired when user hover mouse over a node
   */
  nodeOver: null
});

function activateEvents(events) {
  Object.keys(events).forEach(setActiveCommand);
  return events;

  function setActiveCommand(eventName, idx) {
    events[eventName] = {
      id: eventName,
      fire: fire(eventName),
      on: on(eventName),
      off: off(eventName)
    };
  }
}

function fire(name) {
  return function () {
    appEvents.fire.apply(this, [name].concat(Array.prototype.slice.call(arguments)));
  }
}

function on(name) {
  return function (callback) {
    appEvents.on(name, callback);
  }
}

function off(name) {
  return function (callback) {
    appEvents.off(name, callback);
  }
}
