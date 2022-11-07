const rc = require('./rc_controller');
const {cvt, update_cvt} = require('./cvt');

rc.setup_rc_controller(cvt.rc);

const interval = setInterval(update_cvt, 4);
// clearInterval(interval);
// setTimeout(update_cvt, 4);