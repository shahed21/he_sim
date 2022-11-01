const {uav_param_config, g, rho} = require('@shahed21/uav_params');
const he_sim = require('../index');
const test_01 = require('./utils/calculateRhoVector');

test_01.calculateRhoVector(he_sim, uav_param_config);
console.log('Passed all tests!');