quat = [1,0,0,0].'
euler = utils_quat_to_euler(quat)

euler_init = [0 0 45].' * pi /180

quat = utils_euler_to_quat(euler_init)
% norm(quat)

euler = utils_quat_to_euler(quat)
quat = utils_euler_to_quat(euler)
% norm(quat)

euler = utils_quat_to_euler(quat)
quat = utils_euler_to_quat(euler)
% norm(quat)

euler = utils_quat_to_euler(quat)
quat = utils_euler_to_quat(euler)
% norm(quat)

euler = utils_quat_to_euler(quat)
quat = utils_euler_to_quat(euler)
% norm(quat)

%vec_ned = [0 1 0].';

%vec_xyz = euler_vec_frame_rotation_ned_to_xyz(euler_init, vec_ned)
%vec_ned = euler_vec_frame_rotation_xyz_to_ned(euler_init, vec_xyz)
