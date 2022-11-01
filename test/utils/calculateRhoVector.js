
const assert = require('assert');

function calculateRhoVector(he_sim, uav_param_config) {
    var Rho_vector = {};

    var J_vector = uav_param_config.uavs[0].J_vector;

    he_sim.utils_calculateRhoVector(J_vector, Rho_vector)

    assert(((Rho_vector.prime) - 0.01963438)/0.01963439> 0);
    assert(((Rho_vector.prime) - 0.01963440)/0.01963439< 0);

    assert(((Rho_vector['1']) - 0.01744130)/0.01744134> 0);
    assert(((Rho_vector['1']) - 0.01744140)/0.01744134< 0);

    assert(((Rho_vector['2']) - 0.9906378)/0.9906379> 0);
    assert(((Rho_vector['2']) - 0.9906380)/0.9906379< 0);

    assert(((Rho_vector['3']) - 8.719394)/8.719395> 0);
    assert(((Rho_vector['3']) - 8.719396)/8.719395< 0);

    assert(((Rho_vector['4']) - 0.07639656)/0.07639657> 0);
    assert(((Rho_vector['4']) - 0.07639658)/0.07639657< 0);

    assert(((Rho_vector['5']) - 0.9809027)/0.9809028> 0);
    assert(((Rho_vector['5']) - 0.9809029)/0.9809028< 0);

    assert(((Rho_vector['6']) - 0.02604166)/0.02604167> 0);
    assert(((Rho_vector['6']) - 0.02604168)/0.02604167< 0);

    assert(((Rho_vector['7']) - 0.3336808)/0.3336809> 0);
    assert(((Rho_vector['7']) - 0.3336810)/0.3336809< 0);

    assert(((Rho_vector['8']) - 5.841790)/5.841791> 0);
    assert(((Rho_vector['8']) - 5.841792)/5.841791< 0);
}

module.exports = {calculateRhoVector};