const svt = {
    Time: "",

    Lat: 0,
    Lon: 0,

    Alt_meters: 0,
    Alt_feet: 0,
    Alt_yards: 0,
    
    rollDegrees: 0,
    pitchDegrees: 0,
    headingDegrees: 0,
    
    filtered_airspeed_mps:0,
    filtered_airspeed_knots:0,
    filtered_airspeed_mph:0,
    filtered_airspeed_kph:0,

    filtered_groundspeed_mps:0,
    filtered_groundspeed_knots:0,
    filtered_groundspeed_mph:0,
    filtered_groundspeed_kph:0,

    filtered_windspeed_mps:0,
    filtered_windspeed_knots:0,
    filtered_windspeed_mph:0,
    filtered_windspeed_kph:0,

    filtered_winddir_deg: 0,
    filtered_winddir_rad: 0,

    filtered_groundtrackdir_deg: 0,
    filtered_groundtrackdir_rad: 0,

    vel_d_mps: 0,
    vel_d_fps: 0,

    filtered_alpha_deg: 0,
    filtered_alpha_rad: 0,

    filtered_beta_deg: 0,
    filtered_beta_rad: 0,

    vel_x: 0,
    vel_y: 0,
    vel_z: 0
};

// console.log(svt);

module.exports = {
    svt
};