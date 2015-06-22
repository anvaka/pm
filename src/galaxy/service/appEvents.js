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
   * Fired when new galaxy page is opened and graph download is required
   */
  'downloadGraphRequested',

  /**
   * Fired when user hover mouse over a node
   */
  'nodeHover',

  /**
   * Fired when user clicks a node
   */
  'nodeClick'
], appEvents);

