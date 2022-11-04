quat = [1,0,0,0].'
euler = utils_quat_to_euler(quat)

euler_init = [30 15 -90].' * pi /180

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