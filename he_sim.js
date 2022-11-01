const {uav_param_config, g, rho} = require('@shahed21/uav_params');
const utils = require('./utils');

function he_sim_nlom(
    force_xyz, //user input
    torque_lmn, //user input
    mass, //airframe constant
    J_vector, //airframe constant
    Rho_vector, //airframe constant
    vel_uvw, //system input
    ang_vel_pqr, //system input
    quat, //system input
    vel_ned, //system output
    acc_uvw, //system output
    quat_dot, // system output
    ang_acc_pqr //system output
) {
    utils.utils_quat_vec_frame_rotation_ned_to_xyz(quat, vel_uvw, vel_ned);

    acc_uvw['x'] = ((ang_vel_pqr['r'])*(vel_uvw['y'])) - ((ang_vel_pqr['q'])*(vel_uvw['z'])) + (force_xyz['x'])/(mass);
    acc_uvw['y'] = ((ang_vel_pqr['p'])*(vel_uvw['z'])) - ((ang_vel_pqr['r'])*(vel_uvw['x'])) + (force_xyz['y'])/(mass);
    acc_uvw['z'] = ((ang_vel_pqr['q'])*(vel_uvw['x'])) - ((ang_vel_pqr['p'])*(vel_uvw['y'])) + (force_xyz['z'])/(mass);

    quat_dot['0'] = - 0.5 * (((ang_vel_pqr['p'])*(quat['1'])) + ((ang_vel_pqr['q'])*(quat['2'])) + ((ang_vel_pqr['r'])*(quat['3'])));
    quat_dot['1'] =   0.5 * (((ang_vel_pqr['p'])*(quat['0'])) + ((ang_vel_pqr['r'])*(quat['2'])) - ((ang_vel_pqr['q'])*(quat['3'])));
    quat_dot['2'] =   0.5 * (((ang_vel_pqr['q'])*(quat['0'])) - ((ang_vel_pqr['r'])*(quat['1'])) + ((ang_vel_pqr['p'])*(quat['3'])));
    quat_dot['3'] =   0.5 * (((ang_vel_pqr['r'])*(quat['0'])) + ((ang_vel_pqr['q'])*(quat['1'])) - ((ang_vel_pqr['p'])*(quat['2'])));

    ang_acc_pqr['p'] = ((Rho_vector['1'])*(ang_vel_pqr['p'])*(ang_vel_pqr['q'])) - ((Rho_vector['2'])*(ang_vel_pqr['r'])*(ang_vel_pqr['q'])) + ((Rho_vector['3'])*torque_lmn['l']) + ((Rho_vector['4'])*torque_lmn['m']);
    ang_acc_pqr['q'] = ((Rho_vector['5'])*(ang_vel_pqr['p'])*(ang_vel_pqr['r'])) - ((Rho_vector['6'])*(((ang_vel_pqr['p'])*(ang_vel_pqr['p']))-((ang_vel_pqr['r'])*(ang_vel_pqr['r'])))) + ((mass)/(J_vector['y']));
    ang_acc_pqr['r'] = ((Rho_vector['7'])*(ang_vel_pqr['p'])*(ang_vel_pqr['q'])) - ((Rho_vector['1'])*(ang_vel_pqr['r'])*(ang_vel_pqr['q'])) + ((Rho_vector['4'])*torque_lmn['l']) + ((Rho_vector['8'])*torque_lmn['n']);
}

function he_sim_forces_torques(
    airframe_model_index, //user input
    delta_vector, //user input control signal
    quat, //system input
    ang_vel_pqr, //system input
    V_a, //system input Air Speed
    alpha, //system input angle of attack
    beta, //system input slip angle
    force_xyz, //system output
    torque_lmn //system output
) {
    const uav_model = uav_param_config.uavs[(airframe_model_index)];
    const weight_xyz = {};
    const weight_ned = {};
    weight_ned['n'] = 0;
    weight_ned['e'] = 0;
    weight_ned['d'] = (uav_model.mass) * (g);
    utils.utils_quat_vec_frame_rotation_ned_to_xyz((quat), (weight_ned), (weight_xyz));

    prop_force_component_x = (0.5) * (rho) * (uav_model.S_prop) * (uav_model.C_arr.prop) * 
        ( (Math.pow(( (uav_model.k_motor) * (delta_vector.throttle) ), 2)) - (Math.pow((V_a), 2)) );
    long_aero_force_component_x = (0.5) * (rho) * Math.pow( (V_a), 2) * (uav_model.S) * 
        (
            (utils.utils_C_X(alpha, uav_model.C_arr)) + 
            ((utils.utils_C_X_q(alpha, C_arr))*(uav_model.c) * (ang_vel_pqr.q)/(2 * (V_a))) +
            ((delta_vector.elevator) * (utils.utils_C_X_delta_e(alpha, uav_model.C_arr)))
        );
}

module.exports = 
    {
        he_sim_nlom,
        he_sim_forces_torques
    };
