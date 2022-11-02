quat = [1,0,0,0].'
euler = utils_quat_to_euler(quat)

% quat_init = [0.7209159,0.4620968,0.3914566,0.5744693].'
euler_init = [0.3209159 0.1620968 -0.3914566].'

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