import * as TrafficLightVisualizerPlugins from "./src/Plugins/TrafficLightVisualizerPlugin/TrafficLightVisualizerPluginNamespace";
import * as Services from "./src/Services/ServicesNamespace";
import * as TrafficLightVisualizerCommunicationPlugins from "./src/Plugins/TrafficLightVisualizerCommunicationPlugins/TrafficLightVisualizerCommunicationPluginsNamespace";
import { TrafficLightVisualizerCommunicationPlugin } from "./src/Api/TrafficLightVisualizerCommunicationPlugins/TrafficLightVisualizerCommunicationPluginsNamespace";

import { TrafficLightVisualizerConfiguration } from "./TrafficLightVisualizerConfiguration"

const trafficLightVisualizerConfiguration = new TrafficLightVisualizerConfiguration();

const trafficLightVisualizerService = new Services.TrafficLightVisualizerNodeService<TrafficLightVisualizerPlugins.ArduinoOptions>();

const trafficLightVisualizerPlugin = new TrafficLightVisualizerPlugins.ArduinoPlugin();

const trafficLightVisualizerCommunicationPlugins = createCommunicationPlugins();

trafficLightVisualizerService.startsWith(
    trafficLightVisualizerPlugin,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingYellow * 1000 * 60,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingGreen * 1000 * 60,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingEndOfBreak * 1000 * 60,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForStayingGreenWhenBreakEnded * 1000,
    trafficLightVisualizerConfiguration.serviceOptions.pomodoroIsOverMessage,
    trafficLightVisualizerConfiguration.serviceOptions.pomodoroIsAlmostOverMessage,
    trafficLightVisualizerConfiguration.serviceOptions.breakIsOverMessage,
    {
        port: trafficLightVisualizerConfiguration.serviceOptions.port,
        baudRate: trafficLightVisualizerConfiguration.serviceOptions.baudRate,
    },
    () => console.log("Traffic light visualizer started"),
    trafficLightVisualizerCommunicationPlugins);

function createCommunicationPlugins(): TrafficLightVisualizerCommunicationPlugin[] {
    const trafficLightVisualizerCommunicationPlugins: TrafficLightVisualizerCommunicationPlugin[] = [];

    const slackPlugin = new TrafficLightVisualizerCommunicationPlugins.SlackPlugin();

    const completePomodoroTime = (trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingYellow
                                 + trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingGreen);

    slackPlugin.startsWith({
        token: process.env.SLACK_TOKEN as string,
        snoozeTimeInMinutes: completePomodoroTime,
        statusText: "Pomodoro",
        statusEmoji: ":tomato:",
    });

    trafficLightVisualizerCommunicationPlugins.push(slackPlugin);

    return trafficLightVisualizerCommunicationPlugins;
}