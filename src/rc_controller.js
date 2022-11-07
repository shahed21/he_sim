const { JoystickDevice, listDevices } = require('linux-joystick');

function setup_rc_controller(rc) {
    const devicePath = listDevices()[rc.index];
    const joystick = new JoystickDevice(devicePath);
    
    joystick.on('button_pressed', (event) => {
        // console.log('Pressed button:', event);
        rc.button[event.number] = event.value;
        // console.log(rc.button[event.number]);
    });
    
    joystick.on('button_released', (event) => {
        // console.log('Released button:', event);
        rc.button[event.number] = event.value;
        // console.log(rc.button[event.number]);
    });
    
    joystick.on('button_changed', (event) => {
        // console.log('Button changed:', event);
        rc.button[event.number] = event.value;
        // console.log(rc.button[event.number]);
    });
    
    joystick.on('axis_changed', (event) => {
        // Axis value ranges from -32767 to +32767
        // console.log('Axis changed:', event);
        rc.axis[event.number] = event.value;
        // console.log(rc.axis[event.number]);
    });    
}

module.exports = {
    setup_rc_controller
}