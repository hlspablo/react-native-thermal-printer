import { NativeModules } from 'react-native';

type BluetoothPrinter = {
  deviceName: string;
  macAddress: string;
  charset: string;
  encodingId: number;
};

type NativeModuleType = typeof NativeModules & {
  ThermalPrinterModule: {
    printTcp(
      ip: string,
      port: number,
      payload: string,
      autoCut: boolean,
      openCashbox: boolean,
      mmFeedPaper: number,
      printerDpi: number,
      printerWidthMM: number,
      printerNbrCharactersPerLine: number,
      timeout: number,
      charset: string,
      encodingId: number
    ): Promise<void>;
    printBluetooth(
      macAddress: string,
      payload: string,
      autoCut: boolean,
      openCashbox: boolean,
      mmFeedPaper: number,
      printerDpi: number,
      printerWidthMM: number,
      printerNbrCharactersPerLine: number,
      charset: string,
      encodingId: number
    ): Promise<void>;
    getBluetoothDeviceList(): Promise<BluetoothPrinter[]>;
    getPrinterWidthMM(
      macAddress: string,
      printerDpi: number,
      printerWidthMM: number,
      printerNbrCharactersPerLine: number,
      charset: string,
      encodingId: number
    ): Promise<number>;
    getPrinterDpi(
      macAddress: string,
      printerDpi: number,
      printerWidthMM: number,
      printerNbrCharactersPerLine: number,
      charset: string,
      encodingId: number
    ): Promise<number>;
  };
};

const { ThermalPrinterModule }: NativeModuleType =
  NativeModules as NativeModuleType;

interface PrinterInterface {
  payload: string;
  autoCut: boolean;
  openCashbox: boolean;
  mmFeedPaper: number;
  printerDpi: number;
  printerWidthMM: number;
  printerNbrCharactersPerLine: number;
  charset: string;
  encodingId: number;
}

interface PrintTcpInterface extends PrinterInterface {
  ip: string;
  port: number;
  timeout: number;
  charset: string;
  encodingId: number;
}

interface PrintBluetoothInterface extends PrinterInterface {
  macAddress: string;
  charset: string;
  encodingId: number;
}

let defaultConfig: PrintTcpInterface & PrintBluetoothInterface = {
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
  encodingId: 0,
};

const getConfig = (
  args: Partial<typeof defaultConfig>
): typeof defaultConfig => {
  return Object.assign({}, defaultConfig, args);
};

const printTcp = async (
  args: Partial<PrintTcpInterface> & Pick<PrinterInterface, 'payload'>
): Promise<void> => {
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
    encodingId,
  } = getConfig(args);

  await ThermalPrinterModule.printTcp(
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
  );
};

const printBluetooth = (
  args: Partial<PrintBluetoothInterface> & Pick<PrinterInterface, 'payload'>
): Promise<void> => {
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
    encodingId,
  } = getConfig(args);

  return ThermalPrinterModule.printBluetooth(
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
  );
};

const getBluetoothDeviceList = (): Promise<BluetoothPrinter[]> => {
  return ThermalPrinterModule.getBluetoothDeviceList();
};

const getPrinterWidthMM = (
  args: Partial<PrintBluetoothInterface> &
    Pick<PrintBluetoothInterface, 'macAddress'>
): Promise<number> => {
  const {
    macAddress,
    printerDpi,
    printerWidthMM,
    printerNbrCharactersPerLine,
    charset,
    encodingId,
  } = getConfig(args);

  return ThermalPrinterModule.getPrinterWidthMM(
    macAddress,
    printerDpi,
    printerWidthMM,
    printerNbrCharactersPerLine,
    charset,
    encodingId
  );
};

const getPrinterDpi = (
  args: Partial<PrintBluetoothInterface> &
    Pick<PrintBluetoothInterface, 'macAddress'>
): Promise<number> => {
  const {
    macAddress,
    printerDpi,
    printerWidthMM,
    printerNbrCharactersPerLine,
    charset,
    encodingId,
  } = getConfig(args);

  return ThermalPrinterModule.getPrinterDpi(
    macAddress,
    printerDpi,
    printerWidthMM,
    printerNbrCharactersPerLine,
    charset,
    encodingId
  );
};

export default {
  printTcp,
  printBluetooth,
  defaultConfig,
  getBluetoothDeviceList,
  getPrinterWidthMM,
  getPrinterDpi,
};
