"use strict";
exports.__esModule = true;
var TrafficLightVisualizerConfiguration = /** @class */ (function () {
    function TrafficLightVisualizerConfiguration() {
        this.serviceOptions = {
            timeoutForReachingYellowInMinutes: 20,
            timeoutForReachingGreenInMinutes: 5,
            timeoutForReachingEndOfBreakInMinutes: 5,
            timeoutForStayingGreenWhenBreakEndedInSeconds: 10,
            port: "COM4",
            baudRate: 115200,
            pomodoroIsAlmostOverMessage: "Pomdoro is almost over",
            pomodoroIsOverMessage: "Pomodoro is over",
            breakIsOverMessage: "Break is over",
            withTrafficLightPlugin: true
        };
    }
    return TrafficLightVisualizerConfiguration;
}());
exports.TrafficLightVisualizerConfiguration = TrafficLightVisualizerConfiguration;
//# sourceMappingURL=TrafficLightVisualizerConfiguration.js.map