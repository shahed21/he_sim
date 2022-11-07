const cvt = {
    rc: {
        index: 0,
        axis: [0,0,0,0,0,0,0],
        button: [0,0,0,0,0,0]
    },
    delta_vector: {
        aeleron: 0,
        elevator: 0,
        rudder: 0,
        throttle: 0
    }
};

function update_delta_vector() {
    const maxInt = 32767;
    cvt.delta_vector.aeleron = (cvt.rc.axis[0])/(maxInt);
    cvt.delta_vector.elevator = -(cvt.rc.axis[4])/(maxInt);
    cvt.delta_vector.rudder = -(cvt.rc.axis[3])/(maxInt);
    cvt.delta_vector.throttle = ((cvt.rc.axis[2])+(maxInt))/((maxInt)*(2));

    // console.log(cvt.delta_vector);
}

function update_cvt() {
    update_delta_vector();
}

module.exports = {
    cvt,
    update_cvt
};