import appEvents from '../service/appEvents.js';

export default around;

function around(r, x, y, z) {
  appEvents.around.fire(r, x, y, z);
}
