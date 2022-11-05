const assert = require('assert');

function runtest(he_sim, euler_init, quat, vec_ned, vec_xyz, vec_ned_exp, vec_xyz_exp, epsilon) {
    he_sim.utils_euler_to_quat(euler_init, quat)

    he_sim.utils_quat_vec_frame_rotation_xyz_to_ned(quat, vec_xyz, vec_ned);

    // console.log (vec_ned);
    // console.log (vec_ned_exp);

    assert((vec_ned['n']) > ((vec_ned_exp['n']) - (epsilon)));
    assert((vec_ned['n']) < ((vec_ned_exp['n']) + (epsilon)));
    assert((vec_ned['e']) > ((vec_ned_exp['e']) - (epsilon)));
    assert((vec_ned['e']) < ((vec_ned_exp['e']) + (epsilon)));
    assert((vec_ned['d']) > ((vec_ned_exp['d']) - (epsilon)));
    assert((vec_ned['d']) < ((vec_ned_exp['d']) + (epsilon)));

    he_sim.utils_quat_vec_frame_rotation_ned_to_xyz(quat, vec_ned, vec_xyz);

    assert((vec_xyz['x']) > ((vec_xyz_exp['x']) - (epsilon)));
    assert((vec_xyz['x']) < ((vec_xyz_exp['x']) + (epsilon)));
    assert((vec_xyz['y']) > ((vec_xyz_exp['y']) - (epsilon)));
    assert((vec_xyz['y']) < ((vec_xyz_exp['y']) + (epsilon)));
    assert((vec_xyz['z']) > ((vec_xyz_exp['z']) - (epsilon)));
    assert((vec_xyz['z']) < ((vec_xyz_exp['z']) + (epsilon)));

}

function quat_vec_frame_rotation(he_sim) {
    const euler_init = {};
    const quat = {};
    const vec_xyz = {};
    const vec_ned = {};
    const vec_xyz_exp = {};
    const vec_ned_exp = {};
    const epsilon = 0.000001;


    euler_init['0'] = 0  * Math.PI /180;
    euler_init['1'] = 0  * Math.PI /180;
    euler_init['2'] = 45 * Math.PI /180;

    vec_xyz['x'] = 1;
    vec_xyz['y'] = 0;
    vec_xyz['z'] = 0;

    vec_ned_exp['n'] = Math.sqrt(2)/2;
    vec_ned_exp['e'] = Math.sqrt(2)/2;
    vec_ned_exp['d'] = 0;

    vec_xyz_exp['x'] = 1;
    vec_xyz_exp['y'] = 0;
    vec_xyz_exp['z'] = 0;

    runtest(he_sim, euler_init, quat, vec_ned, vec_xyz, vec_ned_exp, vec_xyz_exp, epsilon);


    euler_init['0'] = 0  * Math.PI /180;
    euler_init['1'] = 0  * Math.PI /180;
    euler_init['2'] = 45 * Math.PI /180;

    vec_xyz['x'] = 0;
    vec_xyz['y'] = 1;
    vec_xyz['z'] = 0;

    vec_ned_exp['n'] = -Math.sqrt(2)/2;
    vec_ned_exp['e'] = Math.sqrt(2)/2;
    vec_ned_exp['d'] = 0;

    vec_xyz_exp['x'] = 0;
    vec_xyz_exp['y'] = 1;
    vec_xyz_exp['z'] = 0;

    runtest(he_sim, euler_init, quat, vec_ned, vec_xyz, vec_ned_exp, vec_xyz_exp, epsilon);


    euler_init['0'] = 0  * Math.PI /180;
    euler_init['1'] = 0  * Math.PI /180;
    euler_init['2'] = 45 * Math.PI /180;

    vec_xyz['x'] = 0;
    vec_xyz['y'] = 0;
    vec_xyz['z'] = 1;

    vec_ned_exp['n'] = 0;
    vec_ned_exp['e'] = 0;
    vec_ned_exp['d'] = 1;

    vec_xyz_exp['x'] = 0;
    vec_xyz_exp['y'] = 0;
    vec_xyz_exp['z'] = 1;

    runtest(he_sim, euler_init, quat, vec_ned, vec_xyz, vec_ned_exp, vec_xyz_exp, epsilon);


}

module.exports = {
    quat_vec_frame_rotation
};
