/**
 * This is a syntax sugar wrapper which allows consumer to register events on
 * a given event bus, later clients can have rich API to consume events.
 *
 * For example:
 *
 * // Create a simple event bus:
 * var myBus = require('ngraph.events')({});
 *
 * // Register several events on this bus:
 * var events = eventMirror(['sayHi', 'sayBye'], myBus);
 *
 * // Now consumers can do:
 * events.sayHi.fire('world'); // fire 'sayHi' event, and pass 'world' argument
 *
 * // this will listen to 'sayHi' event, and will print "Hello world"
 * events.sayHi.on(function (name) { console.log('Hello ' + name); })
 *
 * // it is also equivalent to
 * myBus.fire('sayHi', 'world');
 * myBus.on('sayHi', function (name) { console.log('Hello ' + name); });
 *
 * Why? I think having explicit place with all registered events can be
 * beneficial for the reader. You can easily find and document all possible
 * events in the system.
 */
export default eventMirror;

function eventMirror(eventNames, eventBus) {
  var events = Object.create(null);
  eventNames.forEach(setActiveCommand);

  return events;

  function setActiveCommand(eventName, idx) {
    events[eventName] = {
      id: eventName,
      fire: fire(eventName),
      on: on(eventName),
      off: off(eventName)
    };
  }

  function fire(name) {
    return function () {
      eventBus.fire.apply(this, [name].concat(Array.prototype.slice.call(arguments)));
    }
  }

  function on(name) {
    return function (callback) {
      eventBus.on(name, callback);
    }
  }

  function off(name) {
    return function (callback) {
      eventBus.off(name, callback);
    }
  }
}
