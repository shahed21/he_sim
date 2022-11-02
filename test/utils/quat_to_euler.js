const assert = require('assert');

function quat_to_euler(he_sim) {
    const euler = {};
    const quat = {
        '0':1,
        '1':0,
        '2':0,
        '3':0
    };
    const euler_exp = {
        '0':0,
        '1':0,
        '2':0
    };
    const quat_exp = {
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

    assert(euler['0']<((euler_exp['0'])+(0.00001)));
    assert(euler['0']>((euler_exp['0'])-(0.00001)));
    assert(euler['1']<((euler_exp['1'])+(0.00001)));
    assert(euler['1']>((euler_exp['1'])-(0.00001)));
    assert(euler['2']<((euler_exp['2'])+(0.00001)));
    assert(euler['2']>((euler_exp['2'])-(0.00001)));

    assert(quat['0']<((quat_exp['0'])+(0.00001)));
    assert(quat['0']>((quat_exp['0'])-(0.00001)));
    assert(quat['1']<((quat_exp['1'])+(0.00001)));
    assert(quat['1']>((quat_exp['1'])-(0.00001)));
    assert(quat['2']<((quat_exp['2'])+(0.00001)));
    assert(quat['2']>((quat_exp['2'])-(0.00001)));
    assert(quat['3']<((quat_exp['3'])+(0.00001)));
    assert(quat['3']>((quat_exp['3'])-(0.00001)));


    euler['0'] = 0.3209159;
    euler['1'] = 0.1620968;
    euler['2'] =-0.3914566;

    euler_exp['0'] = 0.3209159;
    euler_exp['1'] = 0.1620968;
    euler_exp['2'] =-0.3914566;
    
    quat_exp ['0'] = 0.962612;
    quat_exp ['1'] = 0.171748;
    quat_exp ['2'] = 0.047423;
    quat_exp ['3'] = -0.204040;

    he_sim.utils_euler_to_quat(euler, quat);
    console.log(quat[0]);
    console.log(quat[1]);
    console.log(quat[2]);
    console.log(quat[3]);
    console.log('------')
    assert(quat['0']<((quat_exp['0'])+(0.00001)));
    assert(quat['0']>((quat_exp['0'])-(0.00001)));
    assert(quat['1']<((quat_exp['1'])+(0.00001)));
    assert(quat['1']>((quat_exp['1'])-(0.00001)));
    assert(quat['2']<((quat_exp['2'])+(0.00001)));
    assert(quat['2']>((quat_exp['2'])-(0.00001)));
    assert(quat['3']<((quat_exp['3'])+(0.00001)));
    assert(quat['3']>((quat_exp['3'])-(0.00001)));

    he_sim.utils_quat_to_euler(quat, euler);
    console.log(euler['0']);
    console.log(euler['1']);
    console.log(euler['2']);
    console.log('------')
    assert(euler['0']<((euler_exp['0'])+(0.00001)));
    assert(euler['0']>((euler_exp['0'])-(0.00001)));
    assert(euler['1']<((euler_exp['1'])+(0.00001)));
    assert(euler['1']>((euler_exp['1'])-(0.00001)));
    assert(euler['2']<((euler_exp['2'])+(0.00001)));
    assert(euler['2']>((euler_exp['2'])-(0.00001)));

    he_sim.utils_euler_to_quat(euler, quat);
    console.log(quat[0]);
    console.log(quat[1]);
    console.log(quat[2]);
    console.log(quat[3]);
    console.log('------')
    assert(quat['0']<((quat_exp['0'])+(0.00001)));
    assert(quat['0']>((quat_exp['0'])-(0.00001)));
    assert(quat['1']<((quat_exp['1'])+(0.00001)));
    assert(quat['1']>((quat_exp['1'])-(0.00001)));
    assert(quat['2']<((quat_exp['2'])+(0.00001)));
    assert(quat['2']>((quat_exp['2'])-(0.00001)));
    assert(quat['3']<((quat_exp['3'])+(0.00001)));
    assert(quat['3']>((quat_exp['3'])-(0.00001)));

    he_sim.utils_quat_to_euler(quat, euler);
    console.log(euler['0']);
    console.log(euler['1']);
    console.log(euler['2']);
    console.log('------')
    assert(euler['0']<((euler_exp['0'])+(0.00001)));
    assert(euler['0']>((euler_exp['0'])-(0.00001)));
    assert(euler['1']<((euler_exp['1'])+(0.00001)));
    assert(euler['1']>((euler_exp['1'])-(0.00001)));
    assert(euler['2']<((euler_exp['2'])+(0.00001)));
    assert(euler['2']>((euler_exp['2'])-(0.00001)));

    he_sim.utils_euler_to_quat(euler, quat);
    console.log(quat[0]);
    console.log(quat[1]);
    console.log(quat[2]);
    console.log(quat[3]);
    console.log('------')
    assert(quat['0']<((quat_exp['0'])+(0.00001)));
    assert(quat['0']>((quat_exp['0'])-(0.00001)));
    assert(quat['1']<((quat_exp['1'])+(0.00001)));
    assert(quat['1']>((quat_exp['1'])-(0.00001)));
    assert(quat['2']<((quat_exp['2'])+(0.00001)));
    assert(quat['2']>((quat_exp['2'])-(0.00001)));
    assert(quat['3']<((quat_exp['3'])+(0.00001)));
    assert(quat['3']>((quat_exp['3'])-(0.00001)));

    he_sim.utils_quat_to_euler(quat, euler);
    console.log(euler['0']);
    console.log(euler['1']);
    console.log(euler['2']);
    console.log('------')
    assert(euler['0']<((euler_exp['0'])+(0.00001)));
    assert(euler['0']>((euler_exp['0'])-(0.00001)));
    assert(euler['1']<((euler_exp['1'])+(0.00001)));
    assert(euler['1']>((euler_exp['1'])-(0.00001)));
    assert(euler['2']<((euler_exp['2'])+(0.00001)));
    assert(euler['2']>((euler_exp['2'])-(0.00001)));

    he_sim.utils_euler_to_quat(euler, quat);
    console.log(quat[0]);
    console.log(quat[1]);
    console.log(quat[2]);
    console.log(quat[3]);
    console.log('------')
    assert(quat['0']<((quat_exp['0'])+(0.00001)));
    assert(quat['0']>((quat_exp['0'])-(0.00001)));
    assert(quat['1']<((quat_exp['1'])+(0.00001)));
    assert(quat['1']>((quat_exp['1'])-(0.00001)));
    assert(quat['2']<((quat_exp['2'])+(0.00001)));
    assert(quat['2']>((quat_exp['2'])-(0.00001)));
    assert(quat['3']<((quat_exp['3'])+(0.00001)));
    assert(quat['3']>((quat_exp['3'])-(0.00001)));

    he_sim.utils_quat_to_euler(quat, euler);
    console.log(euler['0']);
    console.log(euler['1']);
    console.log(euler['2']);
    console.log('------')
    assert(euler['0']<((euler_exp['0'])+(0.00001)));
    assert(euler['0']>((euler_exp['0'])-(0.00001)));
    assert(euler['1']<((euler_exp['1'])+(0.00001)));
    assert(euler['1']>((euler_exp['1'])-(0.00001)));
    assert(euler['2']<((euler_exp['2'])+(0.00001)));
    assert(euler['2']>((euler_exp['2'])-(0.00001)));

    he_sim.utils_euler_to_quat(euler, quat);
    console.log(quat[0]);
    console.log(quat[1]);
    console.log(quat[2]);
    console.log(quat[3]);
    console.log('------')
    assert(quat['0']<((quat_exp['0'])+(0.00001)));
    assert(quat['0']>((quat_exp['0'])-(0.00001)));
    assert(quat['1']<((quat_exp['1'])+(0.00001)));
    assert(quat['1']>((quat_exp['1'])-(0.00001)));
    assert(quat['2']<((quat_exp['2'])+(0.00001)));
    assert(quat['2']>((quat_exp['2'])-(0.00001)));
    assert(quat['3']<((quat_exp['3'])+(0.00001)));
    assert(quat['3']>((quat_exp['3'])-(0.00001)));

}

module.exports = {
    quat_to_euler
};