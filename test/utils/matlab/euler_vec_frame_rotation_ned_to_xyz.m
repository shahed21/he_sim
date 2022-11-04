function vec_xyz = euler_vec_frame_rotation_ned_to_xyz(euler, vec_ned) {
    cphi = cos(euler(1));
    sphi = sin(euler(1));
    ctheta = cos(euler(2));
    stheta = sin(euler(2));
    cpsi = cos(euler(3));
    spsi = sin(euler(3));

    rot_mat = [ctheta*cpsi*sphi*stheta*cpsi, ctheta*spsi*sphi*stheta*spsi, -stheta;
               -cphi*spsi*cphi*stheta*cpsi,  cphi*cpsi*cphi*stheta*spsi,   sphi*ctheta;
               sphi*spsi,                    -sphi*cpsi,                   cphi*ctheta];
    
    vec_xyz = rot_mat * vec_ned;
}