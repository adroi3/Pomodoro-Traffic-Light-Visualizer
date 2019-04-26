"use strict";
exports.__esModule = true;
var TrafficLightVisualizerPlugin = require("../../Api/TrafficLightVisualizerPlugins/TrafficLightVisualizerPluginsNamespace");
var SerialPort = require("serialport");
var ArduinoPlugin = /** @class */ (function () {
    function ArduinoPlugin() {
        this.timeoutForReEnablingButton = 1000;
        this.previousDateNow = Date.now();
        this.internalBuffer = [];
        this.buttonClickIsEnabled = true;
    }
    ArduinoPlugin.prototype.startsWith = function (trafficLightVisualizerService, options, onArduinoIsReady) {
        this.trafficLightVisualizerService = trafficLightVisualizerService;
        this.serialPort = new SerialPort(options.port, { baudRate: options.baudRate });
        this.onArduinoIsReady = onArduinoIsReady;
        this.fetchMessagesFromArduino();
    };
    ArduinoPlugin.prototype.setTrafficLight = function (trafficLightStatus) {
        var _this = this;
        var outgoingMessages;
        outgoingMessages = this.createOutgoingMessagesForPomodoroPanelWith(trafficLightStatus);
        outgoingMessages.forEach(function (x) { return _this.serialPort.write([x.trafficLightNumber, x.trafficLightStatus]); });
    };
    ArduinoPlugin.prototype.setBreakTrafficLight = function (breakTrafficLightStatus) {
        var _this = this;
        var outgoingMessages;
        outgoingMessages = this.createOutgoingMessagesForBreakPanel(breakTrafficLightStatus);
        outgoingMessages.forEach(function (x) { return _this.serialPort.write([x.trafficLightNumber, x.trafficLightStatus]); });
    };
    ArduinoPlugin.prototype.createOutgoingMessagesForBreakPanel = function (breakTrafficLightStatus) {
        var outgoingMessages = [];
        switch (breakTrafficLightStatus) {
            case TrafficLightVisualizerPlugin.BreakTrafficLightStatus.Red:
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.RED_4,
                    trafficLightStatus: ArduinoTrafficLightStatus.ON
                });
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.GREEN_4,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF
                });
                break;
            case TrafficLightVisualizerPlugin.BreakTrafficLightStatus.Green:
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.RED_4,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF
                });
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.GREEN_4,
                    trafficLightStatus: ArduinoTrafficLightStatus.ON
                });
                break;
            case TrafficLightVisualizerPlugin.BreakTrafficLightStatus.Nothing:
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.RED_4,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF
                });
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.GREEN_4,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF
                });
                break;
        }
        return outgoingMessages;
    };
    ArduinoPlugin.prototype.createOutgoingMessagesForPomodoroPanelWith = function (trafficLightStatus) {
        var outgoingMessages = [];
        switch (trafficLightStatus) {
            case TrafficLightVisualizerPlugin.TrafficLightStatus.Green:
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.RED_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF
                });
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.YELLOW_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF
                });
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.GREEN_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.ON
                });
                break;
            case TrafficLightVisualizerPlugin.TrafficLightStatus.Yellow:
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.RED_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF
                });
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.GREEN_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF
                });
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.YELLOW_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.ON
                });
                break;
            case TrafficLightVisualizerPlugin.TrafficLightStatus.Red:
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.YELLOW_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF
                });
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.GREEN_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.OFF
                });
                outgoingMessages.push({
                    trafficLightNumber: ArduinoTrafficLightNumber.RED_2,
                    trafficLightStatus: ArduinoTrafficLightStatus.ON
                });
                break;
            default:
                break;
        }
        return outgoingMessages;
    };
    ArduinoPlugin.prototype.writeDebuggingInformationToInternalBuffer = function (incomingMessage, completeMessage, buffer) {
        if (incomingMessage !== ArduinoIncommingMessage.ARDUNIO_IS_READY
            && incomingMessage !== ArduinoIncommingMessage.BUTTON_CLICKED
            && completeMessage.length % 2 !== 0) {
            for (var i = 0; i < buffer.byteLength; i++) {
                var nextInternalBufferMessage = buffer.readInt8(i);
                console.log("Internal buffer will be filled with " + nextInternalBufferMessage);
                this.internalBuffer.push(nextInternalBufferMessage);
            }
            return true;
        }
        return false;
    };
    ArduinoPlugin.prototype.fetchMessagesFromArduino = function () {
        var _this = this;
        this.serialPort.on('data', function (data) {
            var buffer = data;
            var completeMessage = [];
            if (_this.internalBuffer.length > 0) {
                completeMessage = _this.internalBuffer.slice(0);
                _this.internalBuffer = [];
            }
            for (var i = 0; i < buffer.byteLength; i++) {
                var nextBufferMessage = buffer.readInt8(i);
                completeMessage.push(nextBufferMessage);
            }
            var incomingMessage = completeMessage[0];
            if (_this.writeDebuggingInformationToInternalBuffer(incomingMessage, completeMessage, buffer))
                return;
            var currentDateNow = Date.now();
            switch (incomingMessage) {
                case ArduinoIncommingMessage.ARDUNIO_IS_READY:
                    _this.onArduinoIsReady();
                    break;
                case ArduinoIncommingMessage.BUTTON_CLICKED:
                    _this.listenForButtonClick();
                    break;
                default:
                    for (var i = 0; i < completeMessage.length; i += 2) {
                        console.log("Message from Arduino: " + ArduinoTrafficLightNumber[completeMessage[i]] + ", " + ArduinoTrafficLightStatus[completeMessage[i + 1]] + ", " + (currentDateNow - _this.previousDateNow));
                    }
                    break;
            }
            _this.previousDateNow = currentDateNow;
        });
    };
    ArduinoPlugin.prototype.listenForButtonClick = function () {
        var _this = this;
        if (this.buttonClickIsEnabled === false)
            return;
        this.buttonClickIsEnabled = false;
        this.trafficLightVisualizerService.startOrStopPomodoro();
        setTimeout(function () { return _this.buttonClickIsEnabled = true; }, this.timeoutForReEnablingButton);
    };
    return ArduinoPlugin;
}());
exports.ArduinoPlugin = ArduinoPlugin;
var ArduinoIncommingMessage;
(function (ArduinoIncommingMessage) {
    ArduinoIncommingMessage[ArduinoIncommingMessage["ARDUNIO_IS_READY"] = 2] = "ARDUNIO_IS_READY";
    ArduinoIncommingMessage[ArduinoIncommingMessage["BUTTON_CLICKED"] = 33] = "BUTTON_CLICKED";
})(ArduinoIncommingMessage || (ArduinoIncommingMessage = {}));
var ArduinoTrafficLightNumber;
(function (ArduinoTrafficLightNumber) {
    ArduinoTrafficLightNumber[ArduinoTrafficLightNumber["RED_1"] = 53] = "RED_1";
    ArduinoTrafficLightNumber[ArduinoTrafficLightNumber["YELLOW_1"] = 43] = "YELLOW_1";
    ArduinoTrafficLightNumber[ArduinoTrafficLightNumber["GREEN_1"] = 39] = "GREEN_1";
    ArduinoTrafficLightNumber[ArduinoTrafficLightNumber["RED_2"] = 45] = "RED_2";
    ArduinoTrafficLightNumber[ArduinoTrafficLightNumber["YELLOW_2"] = 47] = "YELLOW_2";
    ArduinoTrafficLightNumber[ArduinoTrafficLightNumber["GREEN_2"] = 35] = "GREEN_2";
    ArduinoTrafficLightNumber[ArduinoTrafficLightNumber["RED_3"] = 51] = "RED_3";
    ArduinoTrafficLightNumber[ArduinoTrafficLightNumber["GREEN_3"] = 49] = "GREEN_3";
    ArduinoTrafficLightNumber[ArduinoTrafficLightNumber["RED_4"] = 37] = "RED_4";
    ArduinoTrafficLightNumber[ArduinoTrafficLightNumber["GREEN_4"] = 41] = "GREEN_4";
})(ArduinoTrafficLightNumber || (ArduinoTrafficLightNumber = {}));
var ArduinoTrafficLightStatus;
(function (ArduinoTrafficLightStatus) {
    ArduinoTrafficLightStatus[ArduinoTrafficLightStatus["ON"] = 1] = "ON";
    ArduinoTrafficLightStatus[ArduinoTrafficLightStatus["OFF"] = 0] = "OFF";
})(ArduinoTrafficLightStatus || (ArduinoTrafficLightStatus = {}));
//# sourceMappingURL=ArduinoPlugin.js.map