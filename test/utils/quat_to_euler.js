const assert = require('assert');

function quat_to_euler(he_sim) {
    const euler = {};
    const quat = {
        '0':1,
        '1':0,
        '2':0,
        '3':0
    };
    he_sim.utils_quat_to_euler(quat, euler);
    he_sim.utils_euler_to_quat(euler, quat);
    he_sim.utils_quat_to_euler(quat, euler);
    he_sim.utils_euler_to_quat(euler, quat);
    he_sim.utils_quat_to_euler(quat, euler);
    he_sim.utils_euler_to_quat(euler, quat);
    he_sim.utils_quat_to_euler(quat, euler);
    he_sim.utils_euler_to_quat(euler, quat);
    he_sim.utils_quat_to_euler(quat, euler);

    assert(euler['0']< (0.00001));
    assert(euler['0']>-(0.00001));
    assert(euler['1']< (0.00001));
    assert(euler['1']>-(0.00001));
    assert(euler['2']< (0.00001));
    assert(euler['2']>-(0.00001));

    quat['0'] = 0.7209159;
    quat['1'] = 0.4620968;
    quat['2'] = 0.3914566;
    quat['3'] = 0.5744693;

    he_sim.utils_quat_to_euler(quat, euler);
    console.log(euler['0']);
    console.log(euler['1']);
    console.log(euler['2']);
    console.log('------')

    he_sim.utils_euler_to_quat(euler, quat);
    console.log(quat[0]);
    console.log(quat[1]);
    console.log(quat[2]);
    console.log(quat[3]);
    console.log('------')

    he_sim.utils_quat_to_euler(quat, euler);
    console.log(euler['0']);
    console.log(euler['1']);
    console.log(euler['2']);
    console.log('------')

    he_sim.utils_euler_to_quat(euler, quat);
    console.log(quat[0]);
    console.log(quat[1]);
    console.log(quat[2]);
    console.log(quat[3]);
    console.log('------')

    he_sim.utils_quat_to_euler(quat, euler);
    console.log(euler['0']);
    console.log(euler['1']);
    console.log(euler['2']);
    console.log('------')

    he_sim.utils_euler_to_quat(euler, quat);
    console.log(quat[0]);
    console.log(quat[1]);
    console.log(quat[2]);
    console.log(quat[3]);
    console.log('------')

    he_sim.utils_quat_to_euler(quat, euler);
    console.log(euler['0']);
    console.log(euler['1']);
    console.log(euler['2']);
    console.log('------')

    he_sim.utils_euler_to_quat(euler, quat);
    console.log(quat[0]);
    console.log(quat[1]);
    console.log(quat[2]);
    console.log(quat[3]);
    console.log('------')

    assert(((euler['0'])-(0.5235986))/(0.5235987)> (0));
    // assert(((euler['0'])-(0.5235988))/(0.5235987)< (0));
    assert(((euler['1'])-(0.5235986))/(0.5235987)> (0));
    assert(((euler['1'])-(0.5235988))/(0.5235987)< (0));
    assert(((euler['2'])-(0.5235986))/(0.5235987)> (0));
    assert(((euler['2'])-(0.5235988))/(0.5235987)< (0));

}

module.exports = {
    quat_to_euler
};