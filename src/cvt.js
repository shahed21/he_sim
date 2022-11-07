const ivt = {
    airframe_model_index: 0,
    pos_lla: {
        Lat: 0,
        Lon: 0,
        Alt: 0
    },
    euler: {
        '0': 0,
        '1': 0,
        '2': 0
    }
}
const cvt = {
    airframe_model_index: 0,
    rc: {
        index: 0,
        axis: [0,0,-32767,0,0,0,0],
        button: [0,0,0,0,0,0]
    },
    delta_vector: {
        aeleron: 0,
        elevator: 0,
        rudder: 0,
        throttle: 0
    },
    pos_lla: {
        Lat: 0,
        Lon: 0,
        Alt: 0
    },
    pos_ned: {
        n: 0,
        e: 0,
        d: 0
    },
    vel_ned: {
        n: 0,
        e: 0,
        d: 0
    },
    vel_uvw: {
        x: 0,
        y: 0,
        z: 0
    },
    acc_uvw: {
        x: 0,
        y: 0,
        z: 0
    },
    quat: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0
    },
    quat_dot: {
        '0': 0,
        '1': 0,
        '2': 0,
        '3': 0
    },
    ang_vel_pqr: {
        p: 0,
        q: 0,
        r: 0
    },
    ang_acc_pqr: {
        p: 0,
        q: 0,
        r: 0
    },
    V_a: 0,      
    alpha: 0,    
    beta: 0,     
    force_xyz: {
        x: 0,
        y: 0,
        z: 0
    },
    torque_lmn: {
        l: 0,
        m: 0,
        n: 0
    },
    J_vector: {},
    Rho_vector: {}
};

module.exports = {
    ivt,
    cvt
};