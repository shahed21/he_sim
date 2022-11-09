const {uav_param_config, g, rho} = require('@shahed21/uav_params');
const rc = require('./rc_controller');
const {ivt, cvt} = require('./cvt');
const {svt} = require('./svt.js');
const utils = require('./utils');
const he_sim = require('./he_sim');
const rk4 = require('./runge_kutta');
const stream = require('./stream')

function setup() {
    utils.initialize_cvt(ivt, cvt, uav_param_config);
    rc.setup_rc_controller(cvt.rc);
    // console.log(svt);
    stream.setupServer(svt);
}


function loop() {
    utils.update_cvt(ivt, cvt);
    // console.log('----------------------loop----------------------')
    // console.log(`1. quat0: ${cvt.quat['0']}`);
    he_sim.he_sim_forces_torques(
        cvt.airframe_model_index,
        cvt.delta_vector,
        cvt.quat,
        cvt.ang_vel_pqr,
        cvt.V_a,
        cvt.alpha,
        cvt.beta,
        cvt.force_xyz,
        cvt.torque_lmn
    );
    // console.log(`2. aeleron: ${cvt.delta_vector.aeleron}`);
    // console.log(`force_x: ${cvt.force_xyz.x}`);
    // console.log(`force_y: ${cvt.force_xyz.y}`);
    // console.log(`force_z: ${cvt.force_xyz.z}`);
    // console.log(`torque_l: ${cvt.torque_lmn.l}`);
    // console.log(`torque_m: ${cvt.torque_lmn.m}`);
    // console.log(`torque_n: ${cvt.torque_lmn.n}`);

    rk4.runge_kutta_4(
        he_sim,
        cvt.force_xyz,
        cvt.torque_lmn,
        0.004,
        uav_param_config.uavs[cvt.airframe_model_index].mass,
        cvt.J_vector,
        cvt.Rho_vector,
        cvt.pos_ned,
        cvt.vel_uvw,
        cvt.ang_vel_pqr,
        cvt.quat,
        cvt.vel_ned,
        cvt.acc_uvw,
        cvt.quat_dot,
        cvt.ang_acc_pqr,
        cvt.pos_ned,
        cvt.vel_uvw,
        cvt.quat,
        cvt.ang_vel_pqr
    );

    // console.log(`pos_n: ${cvt.pos_ned.n}`);

    utils.update_svt(cvt, svt);
}

setup();
const interval = setInterval(loop, 4);
// clearInterval(interval);
// loop();
// loop();