const boost = require("./movehub-async/movehub-async");

class HubControl {
  constructor(deviceInfo, controlData) {
    this.hub = null;
    this.device = deviceInfo;
    this.control = controlData;
    this.prevDevice = { ...this.device };
    this.prevControl = { ...this.control };

    this.states = {
      Turn: turn.bind(this),
      Drive: drive.bind(this),
      Stop: stop.bind(this),
      Manual: manual.bind(this)
    };

    this.currentState = this.states["Drive"];
  }

  async start() {
    const bleRady = await boost.bleReadyAsync();
    const connectDetails = await boost.hubFoundAsync();
    this.hub = await boost.connectAsync(connectDetails);

    this.hub.on("error", err => {
      this.device.err = err;
    });

    this.hub.on("disconnect", () => {
      this.device.connected = false;
    });

    this.hub.on("distance", distance => {
      this.device.distance = distance;
    });

    this.hub.on("rssi", rssi => {
      this.device.rssi = rssi;
    });

    this.hub.on("port", portObject => {
      const { port, action } = portObject;
      this.device.ports[port].action = action;
    });

    this.hub.on("color", color => {
      this.device.color = color;
    });

    this.hub.on("tilt", tilt => {
      const { roll, pitch } = tilt;
      this.device.tilt.roll = roll;
      this.device.tilt.pitch = pitch;
    });

    this.hub.on("rotation", rotation => {
      const { port, angle } = rotation;
      this.device.ports[port].angle = angle;
    });

    await this.hub.connectAsync();
    this.device.connected = true;

    this.hub.led("red");
  }

  setNextState(state) {
    this.currentState = this.states[state];
  }

  update() {
    this.currentState();

    this.prevDevice = { ...this.device };
    this.prevControl = { ...this.control };
  }
}

function turn() {
  if (this.device.distance > 100) {
    this.control.turnAngle = 0;
    this.setNextState("Drive");
    return;
  }

  this.control.turnAngle = this.control.turnAngle - 10;

  this.hub.motorTimeAngle(180, 100, -100);
}

function drive() {
  if (this.device.distance < 100) {
    this.setNextState("Turn");
    return;
  }

  this.hub.motorTimeMulti(1, 100, 100);
}

function stop() {
  this.control.speed = 0;
  this.control.turnAngle = 0;

  this.hub.motorTimeAngle(0, 0, 0);
}

function manual() {
  if (this.control.speed != this.prevControl.speed || this.control.turnAngle != this.prevControl.turnAngle) {
    let motorA = this.control.speed + (this.control.turnAngle > 0 ? Math.abs(this.control.turnAngle) : 0);
    let motorB = this.control.speed + (this.control.turnAngle < 0 ? Math.abs(this.control.turnAngle) : 0);
    
    if (motorA > 100) {
      motorB -= motorA - 100;
      motorA = 100;
    }

    if (motorB > 100) {
      motorA -= motorB - 100;
      motorB = 100;
    }

    this.control.motorA = motorA;
    this.control.motorB = motorB;

    this.hub.motorTimeMulti(60, motorA, motorB);
  }

  if (this.control.tilt.pitch != this.prevControl.tilt.pitch) {
    this.hub.motorTime("C", 60, this.control.tilt.pitch);
  }

  if (this.control.tilt.roll != this.prevControl.tilt.roll) {
    this.hub.motorTime("D", 60, this.control.tilt.roll);
  }
}

module.exports = HubControl;