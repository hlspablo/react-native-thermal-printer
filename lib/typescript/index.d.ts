type BluetoothPrinter = {
    deviceName: string;
    macAddress: string;
    charset: string;
    encodingId: number;
};
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
declare const _default: {
    printTcp: (args: Partial<PrintTcpInterface> & Pick<PrinterInterface, "payload">) => Promise<void>;
    printBluetooth: (args: Partial<PrintBluetoothInterface> & Pick<PrinterInterface, "payload">) => Promise<void>;
    defaultConfig: PrintTcpInterface & PrintBluetoothInterface;
    getBluetoothDeviceList: () => Promise<BluetoothPrinter[]>;
    getPrinterWidthMM: (args: Partial<PrintBluetoothInterface> & Pick<PrintBluetoothInterface, "macAddress">) => Promise<number>;
    getPrinterDpi: (args: Partial<PrintBluetoothInterface> & Pick<PrintBluetoothInterface, "macAddress">) => Promise<number>;
};
export default _default;
