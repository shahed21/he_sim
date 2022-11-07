const {uav_param_config, g, rho} = require('@shahed21/uav_params');
const rc = require('./rc_controller');
const {ivt, cvt} = require('./cvt');
const utils = require('./utils');
const he_sim = require('./he_sim');
const rk4 = require('./runge_kutta');

function setup() {
    utils.initialize_cvt(ivt, cvt, uav_param_config);
    rc.setup_rc_controller(cvt.rc);    
}


function loop() {
    utils.update_cvt(ivt, cvt);
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
        vt.quat,
        cvt.vel_ned,
        cvt.acc_uvw,
        cvt.quat_dot,
        cvt.ang_acc_pqr,
        cvt.pos_ned,
        cvt.vel_uvw,
        cvt.quat,
        cvt.ang_vel_pqr
    );
}

setup();
const interval = setInterval(loop, 4);
// clearInterval(interval);
// setTimeout(update_cvt, 4);