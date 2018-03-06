# Lego Boost AI and manual control

Simple AI for Lego Boost.

* AI mode
* Manual control mode

## Execute

```sh
$ npm start
```

### Manual mode controls

```
t               toggle between AI / Manual mode
arrow keys      speed and direction (motor A & B)
q, w            roll (motor C)
a, s            pitch (motor D)
z               full stop
```

## Setup

### Linux / macOS

Check Noble [prerequisites](https://github.com/noble/noble#prerequisites).

### Windows

Install [Windows build tools](https://www.npmjs.com/package/windows-build-tools) from npm.

```sh
$ npm install --global windows-build-tools
$ npm config set msvs_version 2015 --global
```

##### Setup Noble

If your adapter is not in the list of supported [adapters](https://github.com/noble/node-bluetooth-hci-socket#compatible-bluetooth-40-usb-adapters), set correct [VID and PID](https://github.com/noble/node-bluetooth-hci-socket#force-adapter-usb-vid-and-pid) as environment variables. These can be seen from Zadig.

```sh
$ set BLUETOOTH_HCI_SOCKET_USB_VID=0x1286
$ set BLUETOOTH_HCI_SOCKET_USB_PID=0x204C
```

## Links

* https://github.com/hobbyquaker/node-movehub
* https://github.com/JorgePe/pyb00st/blob/master/examples/demo_motor.py
* https://github.com/kencanak/lego-boost-experiment/blob/master/index.js