function he_sim_utils_calculateRhoVector(J_vector, Rho_vector) {
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

function he_sim_utils_quat_to_euler(quat, euler) {
    euler['0'] = atan2((2*(((quat['0'])*(quat['1']))+((quat['2'])*(quat['3'])))),(((quat['0'])*(quat['0']))+((quat['3'])*(quat['3']))-((quat['1'])*(quat['1']))-((quat['2'])*(quat['2']))));
    euler['1'] = asin(2(((quat['0'])*(quat['2']))-((quat['1'])*(quat['3']))));
    euler['2'] = atan2((2*(((quat['0'])*(quat['3']))+((quat['2'])*(quat['1'])))),(((quat['0'])*(quat['0']))+((quat['1'])*(quat['1']))-((quat['3'])*(quat['3']))-((quat['2'])*(quat['2']))));
}

function he_sim_utils_euler_to_quat(euler, quat) {
    phi_2 = (euler['0'])/2;
    theta_2 = (euler['1'])/2;
    psi_2 = (euler['2'])/2;

    quat['0'] = (cos(psi_2))*(cos(theta_2))*(cos(phi_2)) + (sin(psi_2))*(sin(theta_2))*(sin(phi_2));
    quat['1'] = (cos(psi_2))*(cos(theta_2))*(sin(phi_2)) + (sin(psi_2))*(sin(theta_2))*(cos(phi_2));
    quat['2'] = (cos(psi_2))*(sin(theta_2))*(cos(phi_2)) + (sin(psi_2))*(cos(theta_2))*(sin(phi_2));
    quat['3'] = (sin(psi_2))*(cos(theta_2))*(cos(phi_2)) + (cos(psi_2))*(sin(theta_2))*(sin(phi_2));
}

function he_sim_utils_quat_vec_frame_rotation_xyz_to_ned(quat, vec_xyz, vec_ned) {
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

function he_sim_utils_quat_vec_frame_rotation_ned_to_xyz(quat, vec_ned, vec_xyz) {
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

function he_sim_utils_C_X(alpha, C_arr) {
    const C_D =  (C_arr.D_0) + (C_arr.D_alpha) * (alpha);
    const C_L =  (C_arr.L_0) + (C_arr.L_alpha) * (alpha);
    const retVal = -(C_D) * (Math.cos(alpha)) + (C_L) * (Math.sin(alpha));
    return retVal;
}

function he_sim_utils_C_X_q(alpha, C_arr) {
    const retVal = -(C_arr.D_q) * (Math.cos(alpha)) + (C_arr.L_q) * (Math.sin(alpha));
    return retVal;
}

function he_sim_utils_C_X_delta_e(alpha, C_arr) {
    const retVal = -(C_arr.D_delta_e) * (Math.cos(alpha)) + (C_arr.L_delta_e) * (Math.sin(alpha));
    return retVal;
}