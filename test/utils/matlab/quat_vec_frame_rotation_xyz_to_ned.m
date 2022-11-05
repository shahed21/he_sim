function vec_ned = quat_vec_frame_rotation_xyz_to_ned(quat, vec_xyz) {
  vec_ned = zeros(3,1);
    vec_ned(1) = 
        + vec_xyz(1) * ((quat(2))*(quat(2))+(quat(1))*(quat(1))-(quat(3))*(quat(3))-(quat(4))*(quat(4)))
        + vec_xyz(2) * ((quat(2))*(quat(3))-(quat(1))*(quat(4))) * 2
        + vec_xyz(3) * ((quat(2))*(quat(4))+(quat(1))*(quat(3))) * 2;

    vec_ned(2) = 
        + vec_xyz(1) * ((quat(2))*(quat(3))+(quat(1))*(quat(4))) * 2
        + vec_xyz(2) * ((quat(3))*(quat(3))+(quat(1))*(quat(1))-(quat(2))*(quat(2))-(quat(4))*(quat(4)))
        + vec_xyz(3) * ((quat(3))*(quat(4))-(quat(1))*(quat(2))) * 2;

    vec_ned(3) = 
        + vec_xyz(1) * ((quat(2))*(quat(4))-(quat(1))*(quat(3))) * 2
        + vec_xyz(2) * ((quat(4))*(quat(3))+(quat(1))*(quat(2))) * 2
        + vec_xyz(3) * ((quat(4))*(quat(4))+(quat(1))*(quat(1))-(quat(2))*(quat(2))-(quat(3))*(quat(3)));
}