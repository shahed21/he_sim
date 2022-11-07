const {uav_param_config, g, rho} = require('@shahed21/uav_params');
const rc = require('./rc_controller');
const {ivt, cvt} = require('./cvt');
const utils = require('./utils');

function setup() {
    utils.initialize_cvt(ivt, cvt, uav_param_config);
    rc.setup_rc_controller(cvt.rc);    
}


function loop() {
    utils.update_cvt(cvt);
}

setup();
const interval = setInterval(loop, 4);
// clearInterval(interval);
// setTimeout(update_cvt, 4);