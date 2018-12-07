import * as TrafficLightVisualizerPlugin from "../Api/TrafficLightVisualizerPlugin/TrafficLightVisualizerPluginNamespace";
import * as TrafficLightVisualizerService from "../Api/TrafficLightVisualizerService/TrafficLightVisualizerServiceNamespace";
import { TrafficLightVisualizerArduinoPluginOptions } from "./TrafficLightVisualizerArduinoPluginOptions";

import * as SerialPort from "serialport";

export class TrafficLightVisualizerArduinoPlugin implements TrafficLightVisualizerPlugin.TrafficLightVisualizerPlugin<TrafficLightVisualizerArduinoPluginOptions> {

    private readonly timeoutForReEnablingButton = 1000;

    private trafficLightVisualizerService: TrafficLightVisualizerService.TrafficLightVisualizerService<TrafficLightVisualizerArduinoPluginOptions>;
    private serialPort: SerialPort;
    private previousDateNow: number = Date.now();
    private internalBuffer: number[] = [];
    private buttonClickIsEnabled: boolean = true;

    private onArduinoIsReady: TrafficLightVisualizerPlugin.OnArduinoIsReady;

    public startsWith(
        trafficLightVisualizerService: TrafficLightVisualizerService.TrafficLightVisualizerService<TrafficLightVisualizerArduinoPluginOptions>,
        options: TrafficLightVisualizerArduinoPluginOptions,
        onArduinoIsReady: TrafficLightVisualizerPlugin.OnArduinoIsReady): void {

        this.trafficLightVisualizerService = trafficLightVisualizerService;
        this.serialPort = new SerialPort(options.port, { baudRate: options.baudRate });
        this.onArduinoIsReady = onArduinoIsReady;

        this.fetchMessagesFromArduino();
    }

    public setTrafficLight(trafficLightStatus: TrafficLightVisualizerPlugin.TrafficLightStatus): void {
        let outgoingMessages: ArduinoOutgoingMessage[];

        outgoingMessages = this.createOutgoingMessagesForPomodoroPanelWith(trafficLightStatus);

        outgoingMessages.forEach(x => this.serialPort.write([x.trafficLightNumber, x.trafficLightStatus]));
    }

    public setBreakTrafficLight(breakTrafficLightStatus: TrafficLightVisualizerPlugin.BreakTrafficLightStatus): void {
        let outgoingMessages: ArduinoOutgoingMessage[];

        outgoingMessages = this.createOutgoingMessagesForBreakPanel(breakTrafficLightStatus);

        outgoingMessages.forEach(x => this.serialPort.write([x.trafficLightNumber, x.trafficLightStatus]));
    }

    private createOutgoingMessagesForBreakPanel(breakTrafficLightStatus: TrafficLightVisualizerPlugin.BreakTrafficLightStatus): ArduinoOutgoingMessage[] {
        const outgoingMessages: ArduinoOutgoingMessage[] = [];

        switch (breakTrafficLightStatus) {
            case TrafficLightVisualizerPlugin.BreakTrafficLightStatus.Red:
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.RED_4,
                    trafficLightStatus: ArduinoTrafficLightStatus.ON,
                });

                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.GREEN_4,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF,
                });

                break;

            case TrafficLightVisualizerPlugin.BreakTrafficLightStatus.Green:
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.RED_4,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF,
                });

                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.GREEN_4,
                    trafficLightStatus: ArduinoTrafficLightStatus.ON,
                });

                break;

            case TrafficLightVisualizerPlugin.BreakTrafficLightStatus.Nothing:
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.RED_4,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF,
                });

                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.GREEN_4,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF,
                });

                break;
        }

        return outgoingMessages;
    }

    private createOutgoingMessagesForPomodoroPanelWith(trafficLightStatus: TrafficLightVisualizerPlugin.TrafficLightStatus): ArduinoOutgoingMessage[] {
        const outgoingMessages: ArduinoOutgoingMessage[] = [];

        switch (trafficLightStatus) {
            case TrafficLightVisualizerPlugin.TrafficLightStatus.Green:
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.RED_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF,
                });

                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.YELLOW_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF,
                });

                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.GREEN_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.ON,
                });

                break;

            case TrafficLightVisualizerPlugin.TrafficLightStatus.Yellow:
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.RED_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF,
                });

                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.GREEN_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF,
                });

                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.YELLOW_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.ON,
                });

                break;

            case TrafficLightVisualizerPlugin.TrafficLightStatus.Red:
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.YELLOW_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF,
                });

                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.GREEN_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF,
                });

                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.RED_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.ON,
                });

                break;

            default:
                break;
        }

        return outgoingMessages;
    }

    private writeDebuggingInformationToInternalBuffer(incomingMessage: number, completeMessage: number[], buffer: Buffer): boolean {
        if (incomingMessage !== ArduinoIncommingMessage.ARDUNIO_IS_READY
            && incomingMessage !== ArduinoIncommingMessage.BUTTON_CLICKED
            && completeMessage.length % 2 !== 0) {
            for (let i = 0; i < buffer.byteLength; i++) {
                const nextInternalBufferMessage = buffer.readInt8(i);

                console.log(`Internal buffer will be filled with ${nextInternalBufferMessage}`);

                this.internalBuffer.push(nextInternalBufferMessage);
            }

            return true;
        }

        return false;
    }

    private fetchMessagesFromArduino(): void {
        this.serialPort.on('data', data => {

            const buffer = data as Buffer;

            let completeMessage: number[] = [];

            if (this.internalBuffer.length > 0) {
                completeMessage = this.internalBuffer.slice(0);

                this.internalBuffer = [];
            }

            for (let i = 0; i < buffer.byteLength; i++) {
                const nextBufferMessage = buffer.readInt8(i);

                completeMessage.push(nextBufferMessage);
            }

            const incomingMessage = completeMessage[0];

            if (this.writeDebuggingInformationToInternalBuffer(incomingMessage, completeMessage, buffer))
                return;

            const currentDateNow = Date.now();

            switch (incomingMessage) {
                case ArduinoIncommingMessage.ARDUNIO_IS_READY:
                    this.onArduinoIsReady();
                    break;
                case ArduinoIncommingMessage.BUTTON_CLICKED:
                    this.listenForButtonClick();
                    break;

                default:
                    for (let i = 0; i < completeMessage.length; i += 2) {
                        console.log(`Message from Arduino: ${ArduinoTrafficLightNumber[completeMessage[i]]}, ${ArduinoTrafficLightStatus[completeMessage[i + 1]]}, ${currentDateNow - this.previousDateNow}`);
                    }
                    break;
            }

            this.previousDateNow = currentDateNow;
        });
    }

    private listenForButtonClick(): void {
        if (this.buttonClickIsEnabled === false)
            return;

        this.buttonClickIsEnabled = false;

        this.trafficLightVisualizerService.startOrStopPomodoro();

        setTimeout(
            () => this.buttonClickIsEnabled = true,
            this.timeoutForReEnablingButton);
    }
}

interface ArduinoOutgoingMessage {
    trafficLightNumber: ArduinoTrafficLightNumber;
    trafficLightStatus: ArduinoTrafficLightStatus;
}

enum ArduinoIncommingMessage {
    ARDUNIO_IS_READY = 2,

    BUTTON_CLICKED = 33,
}

enum ArduinoTrafficLightNumber {
    RED_1 = 53,
    YELLOW_1 = 43,
    GREEN_1 = 39,

    RED_2 = 45,
    YELLOW_2 = 47,
    GREEN_2 = 35,

    RED_3 = 51,
    GREEN_3 = 49,

    RED_4 = 37,
    GREEN_4 = 41,
}

enum ArduinoTrafficLightStatus {
    ON = 1,
    OFF = 0,
}