const {uav_param_config, g, rho} = require('@shahed21/uav_params');
const utils = require('./utils');

function he_sim_nlom(
    force_xyz,   //user input
    torque_lmn,  //user input
    mass,        //airframe constant
    J_vector,    //airframe constant
    Rho_vector,  //airframe constant
    vel_uvw,     //system input
    ang_vel_pqr, //system input
    quat,        //system input
    vel_ned,     //system output
    acc_uvw,     //system output
    quat_dot,    // system output
    ang_acc_pqr  //system output
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
    delta_vector,         //user input control signal
    quat,                 //system input
    ang_vel_pqr,          //system input
    V_a,                  //system input Air Speed
    alpha,                //system input angle of attack
    beta,                 //system input slip angle
    force_xyz,            //system output
    torque_lmn            //system output
) {
    const uav_model = uav_param_config.uavs[(airframe_model_index)];
    const kientic_force = (0.5) * (rho) * Math.pow( (V_a), 2) * (uav_model.S);
    const weight_xyz = {};
    const weight_ned = {};
    const C = uav_model.C_arr;
    const b_2_Va = (uav_model.b) / (2 * (V_a));
    const c_2_Va = (uav_model.c) / (2 * (V_a));
    weight_ned['n'] = 0;
    weight_ned['e'] = 0;
    weight_ned['d'] = (uav_model.mass) * (g);
    utils.utils_quat_vec_frame_rotation_ned_to_xyz((quat), (weight_ned), (weight_xyz));

    const prop_force_component_x = (0.5) * (rho) * (uav_model.S_prop) * (C.prop) * 
        ( (Math.pow(( (uav_model.k_motor) * (delta_vector.throttle) ), 2)) - (Math.pow((V_a), 2)) );
    
    const long_aero_force_component_x = kientic_force * 
        (
            (utils.utils_C_X(alpha, C)) + 
            ((utils.utils_C_X_q(alpha, C)) * (ang_vel_pqr.q) * c_2_Va) +
            ((delta_vector.elevator) * (utils.utils_C_X_delta_e(alpha, C)))
        );

    force_xyz.x = (weight_xyz.x) + (long_aero_force_component_x) + (prop_force_component_x);

    const long_aero_force_component_y = kientic_force * 
    (
        (C.Y_0) +
        ((C.Y_beta) * (beta)) +
        ((C.Y_p) * (ang_vel_pqr.p) * b_2_Va) +
        ((C.Y_r) * (ang_vel_pqr.r) * b_2_Va) +
        ((C.Y_delta_r) * (delta_vector.rudder))
    );

    force_xyz.y = weight_xyz.y + long_aero_force_component_y;

    const long_aero_force_component_z = kientic_force * 
    (
        (utils.utils_C_Z(alpha, C)) +
        ((utils.utils_C_Z_q(alpha, C)) * (ang_vel_pqr.q) * c_2_Va) +
        ((delta_vector.elevator) * (utils.utils_C_Z_delta_e(alpha, C)))
    );

    force_xyz.z = weight_xyz.z + long_aero_force_component_z;

    torque_lmn['l'] = (kientic_force) * (uav_model.b) * 
        (
            (C.l_0) + 
            ((C.l_beta) * (beta)) +
            ((C.l_p) * (b_2_Va) * (ang_vel_pqr.p)) +
            ((C.l_r) * (b_2_Va) * (ang_vel_pqr.r)) +
            ((C.l_delta_a) * (delta_vector.aeleron)) +
            ((C.l_delta_r) * (delta_vector.rudder))
        ) - ((uav_model.k_T_p) * Math.pow(((uav_model.k_Omega) * (delta_vector.throttle)), 2));

    torque_lmn['n'] = (kientic_force) * (uav_model.c) * 
        (
            (C.m_0) + 
            ((C.m_alpha) * (alpha)) +
            ((C.m_q) * (c_2_Va) * (ang_vel_pqr.q)) +
            ((C.m_delta_e) * (delta_vector.elevator))
        );
        
    torque_lmn['n'] = (kientic_force) * (uav_model.b) * 
        (
            (C.n_0) + 
            ((C.n_beta) * (beta)) +
            ((C.n_p) * (b_2_Va) * (ang_vel_pqr.p)) +
            ((C.n_r) * (b_2_Va) * (ang_vel_pqr.r)) +
            ((C.n_delta_a) * (delta_vector.aeleron)) +
            ((C.n_delta_r) * (delta_vector.rudder))
        );
}

function lat_long_to_meters_simple(pos_lla_init, pos_lla, pos_ned) {
    const earth_radius = (6371000);
    const delta_lat = (pos_lla['Lat'] - pos_lla_init['Lat']) * (Math.PI) /(180);
    const delta_lon = (pos_lla['Lon'] - pos_lla_init['Lon']) * (Math.PI) /(180);
    pos_ned['n'] = (earth_radius) * (delta_lat);
    pos_ned['e'] = (earth_radius) * ((delta_lon) * Math.cos((pos_lla_init['Lat']) * (Math.PI) /(180)));
    pos_ned['d'] = pos_lla_init['Alt'] - pos_lla['Alt'];
}

function lat_long_to_meters(pos_lla_init, pos_lla, pos_ned) {
    lat_long_to_meters_simple(pos_lla_init, pos_lla, pos_ned);
}

function meters_to_lat_long_simple(pos_lla_init, pos_ned, pos_lla) {
    const earth_radius = (6371000);
    const delta_lat = (pos_ned['n']) / (earth_radius);
    const delta_lon = (pos_ned['e']) / ((earth_radius) * Math.cos((pos_lla_init['Lat']) * (Math.PI) /(180)));
    pos_lla['Alt'] = pos_lla_init['Alt'] - pos_ned['d'];
    pos_lla['Lat'] = pos_lla_init['Lat'] + delta_lat;
    pos_lla['Lon'] = pos_lla_init['Lon'] + delta_lon;
}

function meters_to_lat_long(pos_lla_init, pos_ned, pos_lla) {
    meters_to_lat_long_simple(pos_lla_init, pos_ned, pos_lla);
}

module.exports = 
    {
        he_sim_nlom,
        he_sim_forces_torques,
        lat_long_to_meters,
        meters_to_lat_long
    };
