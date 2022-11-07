function runge_kutta_4(
    he_sim,
    force_xyz,       //user input
    torque_lmn,      //user input
    h_step_size,     //user input
    mass,            //airframe constant
    J_vector,        //airframe constant
    Rho_vector,      //airframe constant

    pos_ned,         //system input
    vel_uvw,         //system input
    ang_vel_pqr,     //system input
    quat,            //system input

    vel_ned,         //system output
    acc_uvw,         //system output
    quat_dot,        //system output
    ang_acc_pqr,     //system output

    pos_ned_new,     //system output
    vel_uvw_new,     //system output
    quat_new,        //system output
    ang_vel_pqr_new  //system output
) {

    const vel_ned_k1 = {};
    const vel_ned_k2 = {};
    const vel_ned_k3 = {};
    const vel_ned_k4 = {};
    const vel_ned_res = {};

    const ang_acc_pqr_k1 = {};
    const ang_acc_pqr_k2 = {};
    const ang_acc_pqr_k3 = {};
    const ang_acc_pqr_k4 = {};
    const ang_acc_pqr_res = {};

    const quat_dot_k1 = {};
    const quat_dot_k2 = {};
    const quat_dot_k3 = {};
    const quat_dot_k4 = {};
    const quat_dot_res = {};

    const acc_uvw_k1 = {};
    const acc_uvw_k2 = {};
    const acc_uvw_k3 = {};
    const acc_uvw_k4 = {};
    const acc_uvw_res = {};


    const ang_vel_pqr_k1 = {};
    const ang_vel_pqr_k2 = {};
    const ang_vel_pqr_k3 = {};

    const quat_k1 = {};
    const quat_k2 = {};
    const quat_k3 = {};

    const vel_uvw_k1 = {};
    const vel_uvw_k2 = {};
    const vel_uvw_k3 = {};

    // k_1
    he_sim.he_sim_nlom(
        force_xyz, 
        torque_lmn, 
        mass, 
        J_vector, 
        Rho_vector, 
        vel_uvw, 
        ang_vel_pqr, 
        quat, 
        vel_ned_k1,
        acc_uvw_k1,
        quat_dot_k1,
        ang_acc_pqr_k1
    );

    ang_vel_pqr_k1['p'] = ang_vel_pqr['p'] + ang_acc_pqr_k1['p'] * h_step_size/2;
    ang_vel_pqr_k1['q'] = ang_vel_pqr['q'] + ang_acc_pqr_k1['q'] * h_step_size/2;
    ang_vel_pqr_k1['r'] = ang_vel_pqr['r'] + ang_acc_pqr_k1['r'] * h_step_size/2;

    quat_k1['0'] = quat['0'] + quat_dot_k1['0'] * h_step_size/2;
    quat_k1['1'] = quat['1'] + quat_dot_k1['1'] * h_step_size/2;
    quat_k1['2'] = quat['2'] + quat_dot_k1['2'] * h_step_size/2;
    quat_k1['3'] = quat['3'] + quat_dot_k1['3'] * h_step_size/2;

    vel_uvw_k1['x'] = vel_uvw['x'] + acc_uvw_k1['x'] * h_step_size/2;
    vel_uvw_k1['y'] = vel_uvw['y'] + acc_uvw_k1['y'] * h_step_size/2;
    vel_uvw_k1['z'] = vel_uvw['z'] + acc_uvw_k1['z'] * h_step_size/2;


    // k_2
    he_sim.he_sim_nlom(
        force_xyz, 
        torque_lmn, 
        mass, 
        J_vector, 
        Rho_vector, 
        vel_uvw_k1, 
        ang_vel_pqr_k1, 
        quat_k1, 
        vel_ned_k2,
        acc_uvw_k2,
        quat_dot_k2,
        ang_acc_pqr_k2
    );

    ang_vel_pqr_k2['p'] = ang_vel_pqr['p'] + ang_acc_pqr_k2['p'] * h_step_size/2;
    ang_vel_pqr_k2['q'] = ang_vel_pqr['q'] + ang_acc_pqr_k2['q'] * h_step_size/2;
    ang_vel_pqr_k2['r'] = ang_vel_pqr['r'] + ang_acc_pqr_k2['r'] * h_step_size/2;

    quat_k2['0'] = quat['0'] + quat_dot_k2['0'] * h_step_size/2;
    quat_k2['1'] = quat['1'] + quat_dot_k2['1'] * h_step_size/2;
    quat_k2['2'] = quat['2'] + quat_dot_k2['2'] * h_step_size/2;
    quat_k2['3'] = quat['3'] + quat_dot_k2['3'] * h_step_size/2;

    vel_uvw_k2['x'] = vel_uvw['x'] + acc_uvw_k2['x'] * h_step_size/2;
    vel_uvw_k2['y'] = vel_uvw['y'] + acc_uvw_k2['y'] * h_step_size/2;
    vel_uvw_k2['z'] = vel_uvw['z'] + acc_uvw_k2['z'] * h_step_size/2;

    // k_3
    he_sim.he_sim_nlom(
        force_xyz, 
        torque_lmn, 
        mass, 
        J_vector, 
        Rho_vector, 
        vel_uvw_k2, 
        ang_vel_pqr_k2, 
        quat_k2, 
        vel_ned_k3,
        acc_uvw_k3,
        quat_dot_k3,
        ang_acc_pqr_k3
    );

    ang_vel_pqr_k3['p'] = ang_vel_pqr['p'] + ang_acc_pqr_k3['p'] * h_step_size;
    ang_vel_pqr_k3['q'] = ang_vel_pqr['q'] + ang_acc_pqr_k3['q'] * h_step_size;
    ang_vel_pqr_k3['r'] = ang_vel_pqr['r'] + ang_acc_pqr_k3['r'] * h_step_size;

    quat_k3['0'] = quat['0'] + quat_dot_k3['0'] * h_step_size;
    quat_k3['1'] = quat['1'] + quat_dot_k3['1'] * h_step_size;
    quat_k3['2'] = quat['2'] + quat_dot_k3['2'] * h_step_size;
    quat_k3['3'] = quat['3'] + quat_dot_k3['3'] * h_step_size;

    vel_uvw_k3['x'] = vel_uvw['x'] + acc_uvw_k3['x'] * h_step_size;
    vel_uvw_k3['y'] = vel_uvw['y'] + acc_uvw_k3['y'] * h_step_size;
    vel_uvw_k3['z'] = vel_uvw['z'] + acc_uvw_k3['z'] * h_step_size;

    // k_3
    he_sim.he_sim_nlom(
        force_xyz,
        torque_lmn,
        mass,
        J_vector,
        Rho_vector,
        vel_uvw_k3,
        ang_vel_pqr_k3,
        quat_k3,
        vel_ned_k4,
        acc_uvw_k4,
        quat_dot_k4,
        ang_acc_pqr_k4
    );

    // Integral Rates
    vel_ned_res['n'] = ((vel_ned_k1['n']) + (vel_ned_k2['n'])*2 + (vel_ned_k3['n'])*2 + (vel_ned_k4['n']))/6;
    vel_ned_res['e'] = ((vel_ned_k1['e']) + (vel_ned_k2['e'])*2 + (vel_ned_k3['e'])*2 + (vel_ned_k4['e']))/6;
    vel_ned_res['d'] = ((vel_ned_k1['d']) + (vel_ned_k2['d'])*2 + (vel_ned_k3['d'])*2 + (vel_ned_k4['d']))/6;

    acc_uvw_res['x'] = ((acc_uvw_k1['x']) + (acc_uvw_k2['x'])*2 + (acc_uvw_k3['x'])*2 + (acc_uvw_k4['x']))/6;
    acc_uvw_res['y'] = ((acc_uvw_k1['y']) + (acc_uvw_k2['y'])*2 + (acc_uvw_k3['y'])*2 + (acc_uvw_k4['y']))/6;
    acc_uvw_res['z'] = ((acc_uvw_k1['z']) + (acc_uvw_k2['z'])*2 + (acc_uvw_k3['z'])*2 + (acc_uvw_k4['z']))/6;

    quat_dot_res['0'] = ((quat_dot_k1['0']) + (quat_dot_k2['0'])*2 + (quat_dot_k3['0'])*2 + (quat_dot_k4['0']))/6;
    quat_dot_res['1'] = ((quat_dot_k1['1']) + (quat_dot_k2['1'])*2 + (quat_dot_k3['1'])*2 + (quat_dot_k4['1']))/6;
    quat_dot_res['2'] = ((quat_dot_k1['2']) + (quat_dot_k2['2'])*2 + (quat_dot_k3['2'])*2 + (quat_dot_k4['2']))/6;
    quat_dot_res['3'] = ((quat_dot_k1['3']) + (quat_dot_k2['3'])*2 + (quat_dot_k3['3'])*2 + (quat_dot_k4['3']))/6;

    ang_acc_pqr_res['p'] = ((ang_acc_pqr_k1['p']) + (ang_acc_pqr_k2['p'])*2 + (ang_acc_pqr_k3['p'])*2 + (ang_acc_pqr_k4['p']))/6;
    ang_acc_pqr_res['q'] = ((ang_acc_pqr_k1['q']) + (ang_acc_pqr_k2['q'])*2 + (ang_acc_pqr_k3['q'])*2 + (ang_acc_pqr_k4['q']))/6;
    ang_acc_pqr_res['r'] = ((ang_acc_pqr_k1['r']) + (ang_acc_pqr_k2['r'])*2 + (ang_acc_pqr_k3['r'])*2 + (ang_acc_pqr_k4['r']))/6;


    // Output Integrals
    pos_ned_new['n'] = pos_ned['n'] + vel_ned_res['n'] * h_step_size;
    pos_ned_new['e'] = pos_ned['e'] + vel_ned_res['e'] * h_step_size;
    pos_ned_new['d'] = pos_ned['d'] + vel_ned_res['d'] * h_step_size;

    ang_vel_pqr_new['p'] = ang_vel_pqr['p'] + ang_acc_pqr_res['p'] * h_step_size;
    ang_vel_pqr_new['q'] = ang_vel_pqr['q'] + ang_acc_pqr_res['q'] * h_step_size;
    ang_vel_pqr_new['r'] = ang_vel_pqr['r'] + ang_acc_pqr_res['r'] * h_step_size;

    quat_new['0'] = quat['0'] + quat_dot_res['0'] * h_step_size;
    quat_new['1'] = quat['1'] + quat_dot_res['1'] * h_step_size;
    quat_new['2'] = quat['2'] + quat_dot_res['2'] * h_step_size;
    quat_new['3'] = quat['3'] + quat_dot_res['3'] * h_step_size;

    vel_uvw_new['x'] = vel_uvw['x'] + acc_uvw_res['x'] * h_step_size;
    vel_uvw_new['y'] = vel_uvw['y'] + acc_uvw_res['y'] * h_step_size;
    vel_uvw_new['z'] = vel_uvw['z'] + acc_uvw_res['z'] * h_step_size;

    // Output Rates
    vel_ned['n'] = (vel_ned_k1['n']);
    vel_ned['e'] = (vel_ned_k1['e']);
    vel_ned['d'] = (vel_ned_k1['d']);

    acc_uvw['x'] = (acc_uvw_k1['x']);
    acc_uvw['y'] = (acc_uvw_k1['y']);
    acc_uvw['z'] = (acc_uvw_k1['z']);

    quat_dot['0'] = (quat_dot_k1['0']);
    quat_dot['1'] = (quat_dot_k1['1']);
    quat_dot['2'] = (quat_dot_k1['2']);
    quat_dot['3'] = (quat_dot_k1['3']);

    ang_acc_pqr['p'] = (ang_acc_pqr_k1['p']);
    ang_acc_pqr['q'] = (ang_acc_pqr_k1['q']);
    ang_acc_pqr['r'] = (ang_acc_pqr_k1['r']);

}

module.exports = {
    runge_kutta_4
}