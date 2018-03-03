# Lego Boost AI and manual control

TODO: Simple AI for Lego Boost. Now only manual control support.

## Setup

### Prerequisites for Windows

Install https://www.npmjs.com/package/windows-build-tools

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

#### Linux / macOS

Check Noble [prerequisites](https://github.com/noble/noble#prerequisites)

## Links

* https://github.com/hobbyquaker/node-movehub
* https://github.com/JorgePe/pyb00st/blob/master/examples/demo_motor.py
* https://github.com/kencanak/lego-boost-experiment/blob/master/index.js