const MIN_DISTANCE = 75;
const OK_DISTANCE = 100;

const EXECUTE_TIME_SEC = 60;
const CHECK_TIME_MS = 59000;

// Speeds must be betwee -100 and 100
const TURN_SPEED = 20;
const DRIVE_SPEED = 20;
const REVERSE_SPEED = -15;

function turn() {
    if (this.device.distance < MIN_DISTANCE){
      this.setNextState('Back');
      return;
    } else if (this.device.distance > OK_DISTANCE) {
      this.setNextState('Drive');
      return;
    }
  
    // TODO: Check turn direction

    if (!this.control.driveInput || Date.now() - this.control.driveInput > CHECK_TIME_MS) {
        const direction = 'right';
        const motorA = direction == 'right' ? TURN_SPEED : 0;
        const motorB = direction == 'right' ? 0 : TURN_SPEED;

        this.control.driveInput = Date.now();
        this.hub.motorTimeMulti(EXECUTE_TIME_SEC, motorA, motorB);
    }
}
  
function drive() {
    if (this.device.distance < MIN_DISTANCE){
      this.setNextState('Back');
      return;
    } else if (this.device.distance < OK_DISTANCE) {
      this.setNextState('Turn');
      return;
    }
  
    if (!this.control.driveInput || Date.now() - this.control.driveInput > CHECK_TIME_MS) {
      this.control.driveInput = Date.now();
      this.hub.motorTimeMulti(EXECUTE_TIME_SEC, DRIVE_SPEED, DRIVE_SPEED);
    }
}
  
function back() {
    if (this.device.distance > OK_DISTANCE) {
      this.setNextState('Turn');
      return;
    }
  
    if (!this.control.driveInput || Date.now() - this.control.driveInput > CHECK_TIME_MS) {
      this.control.driveInput = Date.now();
      this.hub.motorTimeMulti(EXECUTE_TIME_SEC, REVERSE_SPEED, REVERSE_SPEED);
    }
}
  
function stop() {
    this.control.speed = 0;
    this.control.turnAngle = 0;
  
    if (!this.control.driveInput || Date.now() - this.control.driveInput > CHECK_TIME_MS) {
        this.control.driveInput = Date.now();
        this.hub.motorTimeMulti(EXECUTE_TIME_SEC, 0, 0);
    }
}

module.exports.stop = stop;
module.exports.back = back;
module.exports.drive = drive;
module.exports.turn = turn;