import * as TrafficLightVisualizerPlugins from "./src/Plugins/TrafficLightVisualizerPlugin/TrafficLightVisualizerPluginNamespace";
import * as Services from "./src/Services/ServicesNamespace";
import * as TrafficLightVisualizerCommunicationPlugins from "./src/Plugins/TrafficLightVisualizerCommunicationPlugins/TrafficLightVisualizerCommunicationPluginsNamespace";

import { TrafficLightVisualizerConfiguration } from "./TrafficLightVisualizerConfiguration"

const trafficLightVisualizerConfiguration = new TrafficLightVisualizerConfiguration();

const trafficLightVisualizerService = new Services.TrafficLightVisualizerNodeService<TrafficLightVisualizerPlugins.ArduinoOptions>();

const trafficLightVisualizerPlugin = new TrafficLightVisualizerPlugins.ArduinoPlugin();

trafficLightVisualizerService.startsWith(
    trafficLightVisualizerPlugin,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingYellow,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingGreen,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingEndOfBreak,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForStayingGreenWhenBreakEnded,
    trafficLightVisualizerConfiguration.serviceOptions.pomodoroIsOverMessage,
    trafficLightVisualizerConfiguration.serviceOptions.pomodoroIsAlmostOverMessage,
    trafficLightVisualizerConfiguration.serviceOptions.breakIsOverMessage,
    {
        port: trafficLightVisualizerConfiguration.serviceOptions.port,
        baudRate: trafficLightVisualizerConfiguration.serviceOptions.baudRate,
    },
    () => console.log("Traffic light visualizer started"));

// Testcode

const slackPlugin = new TrafficLightVisualizerCommunicationPlugins.SlackPlugin();

slackPlugin.startsWith({
    token: process.env.SLACK_TOKEN as string,
});