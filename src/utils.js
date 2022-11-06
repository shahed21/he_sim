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
        utils_C_Z_delta_e
    };