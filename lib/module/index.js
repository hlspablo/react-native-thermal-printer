import { NativeModules } from 'react-native';
const {
  ThermalPrinterModule
} = NativeModules;
let defaultConfig = {
  macAddress: '',
  ip: '192.168.192.168',
  port: 9100,
  payload: '',
  autoCut: true,
  openCashbox: false,
  mmFeedPaper: 20,
  printerDpi: 203,
  printerWidthMM: 48,
  printerNbrCharactersPerLine: 42,
  timeout: 30000,
  charset: 'CP437',
  encodingId: 0
};
const getConfig = args => {
  return Object.assign({}, defaultConfig, args);
};
const printTcp = async args => {
  const {
    ip,
    port,
    payload,
    autoCut,
    openCashbox,
    mmFeedPaper,
    printerDpi,
    printerWidthMM,
    printerNbrCharactersPerLine,
    timeout,
    charset,
    encodingId
  } = getConfig(args);
  await ThermalPrinterModule.printTcp(ip, port, payload, autoCut, openCashbox, mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine, timeout, charset, encodingId);
};
const printBluetooth = args => {
  const {
    macAddress,
    payload,
    autoCut,
    openCashbox,
    mmFeedPaper,
    printerDpi,
    printerWidthMM,
    printerNbrCharactersPerLine,
    charset,
    encodingId
  } = getConfig(args);
  return ThermalPrinterModule.printBluetooth(macAddress, payload, autoCut, openCashbox, mmFeedPaper, printerDpi, printerWidthMM, printerNbrCharactersPerLine, charset, encodingId);
};
const getBluetoothDeviceList = () => {
  return ThermalPrinterModule.getBluetoothDeviceList();
};
const getPrinterWidthMM = args => {
  const {
    macAddress,
    printerDpi,
    printerWidthMM,
    printerNbrCharactersPerLine,
    charset,
    encodingId
  } = getConfig(args);
  return ThermalPrinterModule.getPrinterWidthMM(macAddress, printerDpi, printerWidthMM, printerNbrCharactersPerLine, charset, encodingId);
};
const getPrinterDpi = args => {
  const {
    macAddress,
    printerDpi,
    printerWidthMM,
    printerNbrCharactersPerLine,
    charset,
    encodingId
  } = getConfig(args);
  return ThermalPrinterModule.getPrinterDpi(macAddress, printerDpi, printerWidthMM, printerNbrCharactersPerLine, charset, encodingId);
};
export default {
  printTcp,
  printBluetooth,
  defaultConfig,
  getBluetoothDeviceList,
  getPrinterWidthMM,
  getPrinterDpi
};
//# sourceMappingURL=index.js.map