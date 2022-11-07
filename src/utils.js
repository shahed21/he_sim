var timestamp = require('internet-timestamp');

function utils_calculateRhoVector(J_vector, Rho_vector) {
    Rho_vector['prime'] = (J_vector['x'])*(J_vector['z']) - (J_vector['xz'])*(J_vector['xz']);
    Rho_vector['1'] = ((J_vector['xz'])*((J_vector['x'])-(J_vector['y'])+(J_vector['z'])))/(Rho_vector['prime']);
    Rho_vector['2'] = (((J_vector['z'])*((J_vector['z'])-(J_vector['y']))) + (J_vector['xz'])*(J_vector['xz']))/(Rho_vector['prime']);
    Rho_vector['3'] = (J_vector['z'])/(Rho_vector['prime']);
    Rho_vector['4'] = (J_vector['xz'])/(Rho_vector['prime']);
    Rho_vector['5'] = ((J_vector['z'])-(J_vector['x']))/(J_vector['y']);
    Rho_vector['6'] = (J_vector['xz'])/(J_vector['y']);
    Rho_vector['7'] = (((J_vector['x'])*((J_vector['x'])-(J_vector['y']))) + (J_vector['xz'])*(J_vector['xz']))/(Rho_vector['prime']);
    Rho_vector['8'] = (J_vector['x'])/(Rho_vector['prime']);
}

function utils_quat_to_euler(quat, euler) {
    // euler['0'] = Math.atan2((2*(((quat['0'])*(quat['1']))+((quat['2'])*(quat['3'])))),(((quat['0'])*(quat['0']))+((quat['3'])*(quat['3']))-((quat['1'])*(quat['1']))-((quat['2'])*(quat['2']))));
    euler['0'] = Math.atan2((2*(((quat['0'])*(quat['1']))+((quat['2'])*(quat['3'])))),(1 - (2 * (((quat['1'])*(quat['1']))+((quat['2'])*(quat['2']))))));
    euler['1'] = Math.asin(2*(((quat['0'])*(quat['2']))-((quat['1'])*(quat['3']))));
    euler['2'] = Math.atan2((2*(((quat['0'])*(quat['3']))+((quat['2'])*(quat['1'])))),(1 - (2 * (((quat['3'])*(quat['3']))+((quat['2'])*(quat['2']))))));
    // euler['2'] = Math.atan2((2*(((quat['0'])*(quat['3']))+((quat['2'])*(quat['1'])))),(((quat['0'])*(quat['0']))+((quat['1'])*(quat['1']))-((quat['3'])*(quat['3']))-((quat['2'])*(quat['2']))));
}

function utils_euler_to_quat(euler, quat) {
    phi_2 = (euler['0'])/2;
    theta_2 = (euler['1'])/2;
    psi_2 = (euler['2'])/2;

    quat['0'] = (Math.cos(psi_2))*(Math.cos(theta_2))*(Math.cos(phi_2)) + (Math.sin(psi_2))*(Math.sin(theta_2))*(Math.sin(phi_2));
    quat['1'] = (Math.cos(psi_2))*(Math.cos(theta_2))*(Math.sin(phi_2)) - (Math.sin(psi_2))*(Math.sin(theta_2))*(Math.cos(phi_2));
    quat['2'] = (Math.cos(psi_2))*(Math.sin(theta_2))*(Math.cos(phi_2)) + (Math.sin(psi_2))*(Math.cos(theta_2))*(Math.sin(phi_2));
    quat['3'] = (Math.sin(psi_2))*(Math.cos(theta_2))*(Math.cos(phi_2)) - (Math.cos(psi_2))*(Math.sin(theta_2))*(Math.sin(phi_2));
}

function utils_quat_vec_frame_rotation_xyz_to_ned(quat, vec_xyz, vec_ned) {
    vec_ned['n'] = 
        + vec_xyz['x'] * ((quat['1'])*(quat['1'])+(quat['0'])*(quat['0'])-(quat['2'])*(quat['2'])-(quat['3'])*(quat['3']))
        + vec_xyz['y'] * ((quat['1'])*(quat['2'])-(quat['0'])*(quat['3'])) * 2
        + vec_xyz['z'] * ((quat['1'])*(quat['3'])+(quat['0'])*(quat['2'])) * 2;

    vec_ned['e'] = 
        + vec_xyz['x'] * ((quat['1'])*(quat['2'])+(quat['0'])*(quat['3'])) * 2
        + vec_xyz['y'] * ((quat['2'])*(quat['2'])+(quat['0'])*(quat['0'])-(quat['1'])*(quat['1'])-(quat['3'])*(quat['3']))
        + vec_xyz['z'] * ((quat['2'])*(quat['3'])-(quat['0'])*(quat['1'])) * 2;

    vec_ned['d'] = 
        + vec_xyz['x'] * ((quat['1'])*(quat['3'])-(quat['0'])*(quat['2'])) * 2
        + vec_xyz['y'] * ((quat['3'])*(quat['2'])+(quat['0'])*(quat['1'])) * 2
        + vec_xyz['z'] * ((quat['3'])*(quat['3'])+(quat['0'])*(quat['0'])-(quat['1'])*(quat['1'])-(quat['2'])*(quat['2']));
}

function utils_quat_vec_frame_rotation_ned_to_xyz(quat, vec_ned, vec_xyz) {
    vec_xyz['x'] = 
        + vec_ned['n'] * ((quat['1'])*(quat['1'])+(quat['0'])*(quat['0'])-(quat['2'])*(quat['2'])-(quat['3'])*(quat['3']))
        + vec_ned['e'] * ((quat['1'])*(quat['2'])+(quat['0'])*(quat['3'])) * 2
        + vec_ned['d'] * ((quat['1'])*(quat['3'])-(quat['0'])*(quat['2'])) * 2;

    vec_xyz['y'] = 
        + vec_ned['n'] * ((quat['1'])*(quat['2'])-(quat['0'])*(quat['3'])) * 2
        + vec_ned['e'] * ((quat['2'])*(quat['2'])+(quat['0'])*(quat['0'])-(quat['1'])*(quat['1'])-(quat['3'])*(quat['3']))
        + vec_ned['d'] * ((quat['2'])*(quat['3'])+(quat['0'])*(quat['1'])) * 2;

    vec_xyz['z'] = 
        + vec_ned['n'] * ((quat['1'])*(quat['3'])+(quat['0'])*(quat['2'])) * 2
        + vec_ned['e'] * ((quat['3'])*(quat['2'])-(quat['0'])*(quat['1'])) * 2
        + vec_ned['d'] * ((quat['3'])*(quat['3'])+(quat['0'])*(quat['0'])-(quat['1'])*(quat['1'])-(quat['2'])*(quat['2']));
}

function utils_C_X(alpha, C_arr) {
    //TODO Optimize this with Z
    const C_D =  (C_arr.D_0) + (C_arr.D_alpha) * (alpha);
    const C_L =  (C_arr.L_0) + (C_arr.L_alpha) * (alpha);
    const retVal = -(C_D) * (Math.cos(alpha)) + (C_L) * (Math.sin(alpha));
    return retVal;
}

function utils_C_X_q(alpha, C_arr) {
    const retVal = -(C_arr.D_q) * (Math.cos(alpha)) + (C_arr.L_q) * (Math.sin(alpha));
    return retVal;
}

function utils_C_X_delta_e(alpha, C_arr) {
    const retVal = -(C_arr.D_delta_e) * (Math.cos(alpha)) + (C_arr.L_delta_e) * (Math.sin(alpha));
    return retVal;
}

function utils_C_Z(alpha, C_arr) {
    //TODO Optimize this with X
    const C_D =  (C_arr.D_0) + (C_arr.D_alpha) * (alpha);
    const C_L =  (C_arr.L_0) + (C_arr.L_alpha) * (alpha);
    const retVal = -(C_D) * (Math.sin(alpha)) - (C_L) * (Math.cos(alpha));
    return retVal;
}

function utils_C_Z_q(alpha, C_arr) {
    const retVal = -(C_arr.D_q) * (Math.sin(alpha)) - (C_arr.L_q) * (Math.cos(alpha));
    return retVal;
}

function utils_C_Z_delta_e(alpha, C_arr) {
    const retVal = -(C_arr.D_delta_e) * (Math.sin(alpha)) - (C_arr.L_delta_e) * (Math.cos(alpha));
    return retVal;
}

// TODO add AWGN from gust_sigma
function calculate_wind(ivt, cvt) {
    cvt.wind_ned.n = ivt.wind.n;
    cvt.wind_ned.e = ivt.wind.e;
    cvt.wind_ned.d = ivt.wind.d;
    utils_quat_vec_frame_rotation_ned_to_xyz(cvt.quat, cvt.wind_ned, cvt.wind_xyz);
}

function calculate_airspeed(cvt) {
    cvt.V_a_xyz.x = cvt.vel_uvw.x - cvt.wind_xyz.x;
    cvt.V_a_xyz.y = cvt.vel_uvw.y - cvt.wind_xyz.y;
    cvt.V_a_xyz.z = cvt.vel_uvw.z - cvt.wind_xyz.z;

    cvt.V_a = Math.sqrt(Math.pow((cvt.V_a_xyz.x),2)+Math.pow((cvt.V_a_xyz.y),2)+Math.pow((cvt.V_a_xyz.z),2));
    cvt.alpha = Math.atan2((cvt.V_a_xyz.z), (cvt.V_a_xyz.x));
    cvt.beta = Math.asin((cvt.V_a_xyz.y)/ (cvt.V_a));
}

function initialize_cvt(ivt, cvt, uav_param_config) {
    cvt.airframe_model_index = ivt.airframe_model_index;
    cvt.pos_lla.Lat = ivt.pos_lla.Lat;
    cvt.pos_lla.Lon = ivt.pos_lla.Lon;
    cvt.pos_lla.Alt = ivt.pos_lla.Alt;

    utils_euler_to_quat(ivt.euler, cvt.quat);
    cvt.J_vector = uav_param_config.uavs[cvt.airframe_model_index].J_vector;
    utils_calculateRhoVector(cvt.J_vector, cvt.Rho_vector);
    // console.log(cvt.Rho_vector);
}

function update_delta_vector(cvt) {
    const maxInt = 32767;
    cvt.delta_vector.aeleron = (cvt.rc.axis[0])/(maxInt);
    cvt.delta_vector.elevator = -(cvt.rc.axis[4])/(maxInt);
    cvt.delta_vector.rudder = -(cvt.rc.axis[3])/(maxInt);
    cvt.delta_vector.throttle = ((cvt.rc.axis[2])+(maxInt))/((maxInt)*(2));

    // console.log(cvt.delta_vector);
}

function update_cvt(ivt, cvt) {
    update_delta_vector(cvt);
    calculate_wind(ivt, cvt);
    calculate_airspeed(cvt);
}

function update_svt(cvt, svt) {
    euler = {};
    utils_quat_to_euler(cvt.quat, euler);
    // console.log(cvt.pos_lla.Lat);
    // console.log(svt['Lat']);

    svt['Lat']                           = cvt.pos_lla.Lat;
    svt['Lon']                           = cvt.pos_lla.Lon;

    svt['Alt_meters']                    = cvt.pos_lla.Alt;
    svt['Alt_feet']                      = (3.28084)*(cvt.pos_lla.Alt);
    svt['Alt_yards']                     = (svt['Alt_feet'])/3;

    svt['rollDegrees']                   = euler['0']*180/Math.PI;  // TODO this needs a filter
    svt['pitchDegrees']                  = euler['1']*180/Math.PI;  // TODO this needs a filter
    svt['headingDegrees']                = euler['2']*180/Math.PI;  // TODO this needs a filter

    svt['filtered_airspeed_mps']         = cvt.V_a;
    svt['filtered_airspeed_knots']       = (1.943844)*cvt.V_a;
    svt['filtered_airspeed_mph']         = (3.6)     *cvt.V_a;
    svt['filtered_airspeed_kph']         = (2.236936)*cvt.V_a;

    svt['filtered_groundspeed_mps']      = Math.sqrt((Math.pow(cvt.vel_ned.n,2) + Math.pow(cvt.vel_ned.e,2)));
    svt['filtered_groundspeed_knots']    = (1.943844)*(svt['filtered_groundspeed_mps']);
    svt['filtered_groundspeed_mph']      = (3.6)*(svt['filtered_groundspeed_mps']);
    svt['filtered_groundspeed_kph']      = (2.236936)*(svt['filtered_groundspeed_mps']);

    svt['filtered_windspeed_mps']        = Math.sqrt(Math.pow(cvt.wind_ned.n,2) + Math.pow(cvt.wind_ned.e,2) + Math.pow(cvt.wind_ned.d,2));
    svt['filtered_windspeed_knots']      = (1.943844)* (svt['filtered_windspeed_mps']);
    svt['filtered_windspeed_mph']        = (3.6)     * (svt['filtered_windspeed_mps']);
    svt['filtered_windspeed_kph']        = (2.236936)* (svt['filtered_windspeed_mps']);

    svt['filtered_winddir_deg']          = 0;
    svt['filtered_winddir_rad']          = 0;

    svt['filtered_groundtrackdir_deg']   = 0;
    svt['filtered_groundtrackdir_rad']   = 0;

    svt['vel_d_mps']                     = cvt.vel_ned.d;
    svt['vel_d_fps']                     = (3.28084)*(cvt.vel_ned.d);

    svt['filtered_alpha_deg']            = (cvt.alpha) * 180 / Math.PI;
    svt['filtered_alpha_rad']            = (cvt.alpha);

    svt['filtered_beta_deg']             = (cvt.beta) * 180 / Math.PI;
    svt['filtered_beta_rad']             = (cvt.beta);

    svt['vel_x']                         = cvt.vel_uvw.x;
    svt['vel_y']                         = cvt.vel_uvw.y;
    svt['vel_z']                         = cvt.vel_uvw.z;


    const timenow = Date.now();
    svt.Time = timestamp(timenow);
    // console.log(svt.Time);
}

module.exports = 
    {
        utils_calculateRhoVector,
        utils_quat_to_euler,
        utils_euler_to_quat,
        utils_quat_vec_frame_rotation_xyz_to_ned,
        utils_quat_vec_frame_rotation_ned_to_xyz,
        utils_C_X,
        utils_C_X_q,
        utils_C_X_delta_e,
        utils_C_Z,
        utils_C_Z_q,
        utils_C_Z_delta_e,
        initialize_cvt,
        update_cvt,
        update_svt
    };