const {uav_param_config, g, rho} = require('@shahed21/uav_params');
const he_sim = require('../index');
const test_01 = require('./utils/calculateRhoVector');
const test_02 = require('./utils/quat_to_euler');
const test_03 = require('./utils/quat_vec_frame_rotation');

test_01.calculateRhoVector(he_sim, uav_param_config);
test_02.quat_to_euler(he_sim);
test_03.quat_vec_frame_rotation(he_sim);

console.log('Passed all tests!');