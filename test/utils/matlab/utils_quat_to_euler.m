function [euler] = utils_quat_to_euler(quat)
%UNTITLED Summary of this function goes here
%   Detailed explanation goes here
euler1 = atan2(2*((quat(1)*quat(2))+(quat(3)*quat(4))), (1 - (2 * (((quat(2))*(quat(2)))+((quat(3))*(quat(3)))))));
euler2 = asin(2*(((quat(1))*(quat(3)))-((quat(2))*(quat(4)))));
euler3 = atan2((2*(((quat(1))*(quat(4)))+((quat(3))*(quat(2))))),(1 - (2 * (((quat(4))*(quat(4)))+((quat(3))*(quat(3)))))));

euler = [euler1, euler2, euler3].';
end