euler_init = [0 0 45].' * pi /180
quat = utils_euler_to_quat(euler_init);
vec_xyz = [0 0 1].';
vec_ned = quat_vec_frame_rotation_xyz_to_ned(quat, vec_xyz)
vec_xyz = quat_vec_frame_rotation_ned_to_xyz(quat, vec_ned)
