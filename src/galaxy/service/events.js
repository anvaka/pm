/**
 * Defines list of global events transmitted inside the application.
 *
 * Views should never listen to these, instead stores and native renderer
 * consume these, transform them to view-friendly format and fire store-specific
 * events.
 */
import keymirror from 'keymirror';

export default keymirror({
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
   linksDownloaded: null
});
