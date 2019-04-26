"use strict";
exports.__esModule = true;
var TrafficLightVisualizerPlugins = require("../Api/TrafficLightVisualizerPlugins/TrafficLightVisualizerPluginsNamespace");
var NodeNotifier = require("node-notifier");
var TrafficLightVisualizerNodeService = /** @class */ (function () {
    function TrafficLightVisualizerNodeService() {
        this.timers = new Timers();
    }
    TrafficLightVisualizerNodeService.prototype.startsWith = function (trafficLightVisualizerPlugin, timeoutForReachingYellow, timeoutForReachingGreen, timeoutForReachingEndOfBreak, timeoutForStayingGreenWhenBreakEnded, pomodoroIsOverMessage, pomodoroIsAlmostOverMessage, breakIsOverMessage, pluginOptions, onIsReady, trafficLightVisualizerCommunicationPlugins) {
        this.trafficLightVisualizerPlugin = trafficLightVisualizerPlugin;
        this.timeoutForReachingYellow = timeoutForReachingYellow;
        this.timeoutForReachingGreen = timeoutForReachingGreen;
        this.timeoutForReachingEndOfBreak = timeoutForReachingEndOfBreak;
        this.timeoutForStayingGreenWhenBreakEnded = timeoutForStayingGreenWhenBreakEnded;
        this.pomodoroIsOverMessage = pomodoroIsOverMessage;
        this.pomodoroIsAlmostOverMessage = pomodoroIsAlmostOverMessage;
        this.breakIsOverMessage = breakIsOverMessage;
        this.trafficLightVisualizerCommunicationPlugins = trafficLightVisualizerCommunicationPlugins;
        if (pluginOptions !== null && onIsReady !== null) {
            this.trafficLightVisualizerPlugin.startsWith(this, pluginOptions, onIsReady);
        }
    };
    TrafficLightVisualizerNodeService.prototype.startOrStopPomodoro = function () {
        if (!this.timers.isSwitchToBreakAllowed) {
            this.timers.isSwitchToBreakAllowed = true;
            this.reachGreen();
        }
        else if (this.timers.pomodoroTimer === null) {
            this.stopBreak();
            this.startPomodoro();
        }
        else {
            this.stopPomodoro();
        }
    };
    TrafficLightVisualizerNodeService.prototype.startPomodoro = function () {
        var _this = this;
        if (this.trafficLightVisualizerPlugin !== null) {
            this.trafficLightVisualizerPlugin
                .setTrafficLight(TrafficLightVisualizerPlugins.TrafficLightStatus.Red);
        }
        this.trafficLightVisualizerPlugin;
        this.trafficLightVisualizerCommunicationPlugins.forEach(function (x) { return x.onPomodoroStarted(); });
        this.timers.pomodoroTimer = setTimeout(function () { return _this.reachYellow(); }, this.timeoutForReachingYellow);
    };
    TrafficLightVisualizerNodeService.prototype.stopPomodoro = function () {
        if (this.timers.pomodoroTimer !== null) {
            clearTimeout(this.timers.pomodoroTimer);
            this.timers.pomodoroTimer = null;
        }
        if (this.trafficLightVisualizerPlugin !== null) {
            this.trafficLightVisualizerPlugin
                .setTrafficLight(TrafficLightVisualizerPlugins.TrafficLightStatus.Green);
        }
        this.trafficLightVisualizerCommunicationPlugins.forEach(function (x) { return x.onPomodoroOver(); });
    };
    TrafficLightVisualizerNodeService.prototype.reachYellow = function () {
        var _this = this;
        if (this.trafficLightVisualizerPlugin !== null) {
            this.trafficLightVisualizerPlugin
                .setTrafficLight(TrafficLightVisualizerPlugins.TrafficLightStatus.Yellow);
        }
        this.trafficLightVisualizerCommunicationPlugins.forEach(function (x) { return x.onPomodoroAlmostOver(); });
        this.notify(this.pomodoroIsAlmostOverMessage);
        this.timers.pomodoroTimer = setTimeout(function () { return _this.onPomodoroIsOver(); }, this.timeoutForReachingGreen);
    };
    TrafficLightVisualizerNodeService.prototype.onPomodoroIsOver = function () {
        this.timers.isSwitchToBreakAllowed = false;
        this.notify(this.pomodoroIsOverMessage);
    };
    TrafficLightVisualizerNodeService.prototype.reachGreen = function () {
        this.stopPomodoro();
        this.startBreak();
    };
    TrafficLightVisualizerNodeService.prototype.startBreak = function () {
        var _this = this;
        if (this.trafficLightVisualizerPlugin !== null) {
            this.trafficLightVisualizerPlugin
                .setBreakTrafficLight(TrafficLightVisualizerPlugins.BreakTrafficLightStatus.Red);
        }
        this.timers.breakTimer = setTimeout(function () { return _this.reachEndOfBreak(); }, this.timeoutForReachingEndOfBreak);
    };
    TrafficLightVisualizerNodeService.prototype.stopBreak = function () {
        if (this.timers.breakTimer !== null) {
            clearTimeout(this.timers.breakTimer);
            this.timers.breakTimer = null;
        }
        if (this.trafficLightVisualizerPlugin !== null) {
            this.trafficLightVisualizerPlugin
                .setBreakTrafficLight(TrafficLightVisualizerPlugins.BreakTrafficLightStatus.Nothing);
        }
        this.trafficLightVisualizerCommunicationPlugins.forEach(function (x) { return x.onBreakOver(); });
    };
    TrafficLightVisualizerNodeService.prototype.reachEndOfBreak = function () {
        var _this = this;
        if (this.trafficLightVisualizerPlugin !== null) {
            this.trafficLightVisualizerPlugin
                .setBreakTrafficLight(TrafficLightVisualizerPlugins.BreakTrafficLightStatus.Green);
        }
        this.notify(this.breakIsOverMessage);
        this.timers.breakTimer = setTimeout(function () { return _this.switchOffBreakTrafficLights(); }, this.timeoutForStayingGreenWhenBreakEnded);
    };
    TrafficLightVisualizerNodeService.prototype.switchOffBreakTrafficLights = function () {
        if (this.trafficLightVisualizerPlugin !== null) {
            this.trafficLightVisualizerPlugin
                .setBreakTrafficLight(TrafficLightVisualizerPlugins.BreakTrafficLightStatus.Nothing);
        }
        this.timers.breakTimer = null;
    };
    TrafficLightVisualizerNodeService.prototype.notify = function (message) {
        NodeNotifier.notify({ title: "Pomodoro Traffic Light", message: message });
    };
    return TrafficLightVisualizerNodeService;
}());
exports.TrafficLightVisualizerNodeService = TrafficLightVisualizerNodeService;
var Timers = /** @class */ (function () {
    function Timers() {
        this.isSwitchToBreakAllowed = true;
        this.pomodoroTimer = null;
        this.breakTimer = null;
    }
    return Timers;
}());
//# sourceMappingURL=TrafficLightVisualizerNodeService.js.map