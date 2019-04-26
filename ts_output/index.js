"use strict";
exports.__esModule = true;
var TrafficLightVisualizerPlugins = require("./src/Plugins/TrafficLightVisualizerPlugin/TrafficLightVisualizerPluginNamespace");
var Services = require("./src/Services/ServicesNamespace");
var SlackNamespace = require("./src/Plugins/TrafficLightVisualizerCommunicationPlugins/Slack/SlackNamespace");
var WebServicePlugin_1 = require("./src/Plugins/TrafficLightVisualizerCommunicationPlugins/Webservice/WebServicePlugin");
var TrafficLightVisualizerConfiguration_1 = require("./TrafficLightVisualizerConfiguration");
var trafficLightVisualizerConfiguration = new TrafficLightVisualizerConfiguration_1.TrafficLightVisualizerConfiguration();
if (trafficLightVisualizerConfiguration.serviceOptions.withTrafficLightPlugin) {
    initializeWithTrafficLightPlugin();
}
else if (!trafficLightVisualizerConfiguration.serviceOptions.withTrafficLightPlugin) {
    initializeWithoutTrafficLightPlugin();
}
function initializeWithTrafficLightPlugin() {
    var trafficLightVisualizerService = new Services.TrafficLightVisualizerNodeService();
    var trafficLightVisualizerPlugin = new TrafficLightVisualizerPlugins.ArduinoPlugin();
    var trafficLightVisualizerCommunicationPlugins = createCommunicationPlugins(trafficLightVisualizerService);
    trafficLightVisualizerService.startsWith(trafficLightVisualizerPlugin, trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingYellowInMinutes * 1000 * 60, trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingGreenInMinutes * 1000 * 60, trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingEndOfBreakInMinutes * 1000 * 60, trafficLightVisualizerConfiguration.serviceOptions.timeoutForStayingGreenWhenBreakEndedInSeconds * 1000, trafficLightVisualizerConfiguration.serviceOptions.pomodoroIsOverMessage, trafficLightVisualizerConfiguration.serviceOptions.pomodoroIsAlmostOverMessage, trafficLightVisualizerConfiguration.serviceOptions.breakIsOverMessage, {
        port: trafficLightVisualizerConfiguration.serviceOptions.port,
        baudRate: trafficLightVisualizerConfiguration.serviceOptions.baudRate
    }, function () { return console.log("Traffic light visualizer plugin started"); }, trafficLightVisualizerCommunicationPlugins);
}
function initializeWithoutTrafficLightPlugin() {
    var trafficLightVisualizerService = new Services.TrafficLightVisualizerNodeService();
    var trafficLightVisualizerCommunicationPlugins = createCommunicationPlugins(trafficLightVisualizerService);
    trafficLightVisualizerService.startsWith(null, trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingYellowInMinutes * 1000 * 60, trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingGreenInMinutes * 1000 * 60, trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingEndOfBreakInMinutes * 1000 * 60, trafficLightVisualizerConfiguration.serviceOptions.timeoutForStayingGreenWhenBreakEndedInSeconds * 1000, trafficLightVisualizerConfiguration.serviceOptions.pomodoroIsOverMessage, trafficLightVisualizerConfiguration.serviceOptions.pomodoroIsAlmostOverMessage, trafficLightVisualizerConfiguration.serviceOptions.breakIsOverMessage, null, null, trafficLightVisualizerCommunicationPlugins);
}
function createCommunicationPlugins(trafficLightVisualizerService) {
    var trafficLightVisualizerCommunicationPlugins = [];
    var completePomodoroDurationInMinutes = trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingYellowInMinutes
        + trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingGreenInMinutes;
    trafficLightVisualizerCommunicationPlugins.push(createSlackPlugin(completePomodoroDurationInMinutes));
    trafficLightVisualizerCommunicationPlugins.push(createWebservicePlugin(completePomodoroDurationInMinutes, trafficLightVisualizerService));
    return trafficLightVisualizerCommunicationPlugins;
}
function createSlackPlugin(completePomodoroDurationInMinutes) {
    var slackPlugin = new SlackNamespace.SlackPlugin();
    slackPlugin.startsWith({
        token: process.env.SLACK_TOKEN,
        snoozeTimeInMinutes: completePomodoroDurationInMinutes,
        statusText: "Pomodoro",
        statusEmoji: ":tomato:"
    });
    return slackPlugin;
}
function createWebservicePlugin(completePomodoroDurationInMinutes, trafficLightVisualizerService) {
    var webServicePlugin = new WebServicePlugin_1.WebServicePlugin();
    webServicePlugin.startsWith({
        durationInMinutes: completePomodoroDurationInMinutes,
        trafficLightVisualizerService: trafficLightVisualizerService
    });
    webServicePlugin.startServer();
    return webServicePlugin;
}
//# sourceMappingURL=index.js.map