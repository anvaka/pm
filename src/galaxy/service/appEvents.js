/**
 * Defines list of global events transmitted inside the application.
 *
 * Views should never listen to these, instead stores and native renderer
 * consume these, transform them to view-friendly format and fire store-specific
 * events.
 */
import eventify from 'ngraph.events';
import eventMirror from './eventMirror.js';

var appEvents = eventify({});

export default eventMirror([
  /**
   * Fired when labels are downloaded
   */
  'labelsDownloaded',

  /**
   * Fired when positions are downloaded
   */
  'positionsDownloaded',

  /**
   * Fired when links are downloaded
   */
  'linksDownloaded',

  /**
   * Fired when entire graph is downloaded
   */
  'graphDownloaded',

  /**
   * Fired when new galaxy page is opened and graph download is required
   */
  'downloadGraphRequested',

  /**
   * Fired when user hover mouse over a node
   */
  'nodeHover',

  /**
   * Fired when user wants to select a node
   */
  'selectNode',

  /**
   * Fired when user wants to toggle camera steering mode. In steering
   * mode camera will always try to focus on mouse position. Thus
   * middle point of the screen is the only stable point.
   */
  'toggleSteering',

  /**
   * Fired when user wants to show or hide links
   */
  'toggleLinks',

  /**
   * Requests the application to show "Steering mode" indicator.
   */
  'showSteeringMode',

  /**
   * fired when user inputs a text into the search bar
   */
  'commandBarChanged',

  /**
   * fired when user requesed to show or hide help screen
   */
  'toggleHelp',

  // These events are not documented since I'm not sure whether to keep them
   'showNodeListWindow',
   'hideNodeListWindow',
   'showDegree',
   'focusOnNode',
   'focusScene',
   'highlightQuery',
   'queryHighlighted',
   'highlightLinks',
   'cls',
   'around',
   'queryChanged',

   'accelerateNavigation',

   'renderLinks'
], appEvents);

