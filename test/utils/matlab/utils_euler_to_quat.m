function [quat] = utils_euler_to_quat(euler)
%UNTITLED2 Summary of this function goes here
%   Detailed explanation goes here

phi_2 = (euler(1))/2;
theta_2 = (euler(2))/2;
psi_2 = (euler(3))/2;

quat1 = (cos(psi_2))*(cos(theta_2))*(cos(phi_2)) + (sin(psi_2))*(sin(theta_2))*(sin(phi_2));
quat2 = (cos(psi_2))*(cos(theta_2))*(sin(phi_2)) + (sin(psi_2))*(sin(theta_2))*(cos(phi_2));
quat3 = (cos(psi_2))*(sin(theta_2))*(cos(phi_2)) + (sin(psi_2))*(cos(theta_2))*(sin(phi_2));
quat4 = (sin(psi_2))*(cos(theta_2))*(cos(phi_2)) + (cos(psi_2))*(sin(theta_2))*(sin(phi_2));

quat = [quat1, quat2, quat3, quat4].';
end