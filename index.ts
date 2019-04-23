import * as TrafficLightVisualizerPlugins from "./src/Plugins/TrafficLightVisualizerPlugin/TrafficLightVisualizerPluginNamespace";
import * as Services from "./src/Services/ServicesNamespace";
import * as SlackNamespace from "./src/Plugins/TrafficLightVisualizerCommunicationPlugins/Slack/SlackNamespace";
import { TrafficLightVisualizerCommunicationPlugin } from "./src/Api/TrafficLightVisualizerCommunicationPlugins/TrafficLightVisualizerCommunicationPluginsNamespace";
import { WebServicePlugin } from "./src/Plugins/TrafficLightVisualizerCommunicationPlugins/Webservice/WebServicePlugin";
import { WebServiceOptions } from "./src/Plugins/TrafficLightVisualizerCommunicationPlugins/Webservice/WebServiceOptions";

import { TrafficLightVisualizerConfiguration } from "./TrafficLightVisualizerConfiguration"

const trafficLightVisualizerConfiguration = new TrafficLightVisualizerConfiguration();

const trafficLightVisualizerService = new Services.TrafficLightVisualizerNodeService<TrafficLightVisualizerPlugins.ArduinoOptions>();

const trafficLightVisualizerPlugin = new TrafficLightVisualizerPlugins.ArduinoPlugin();

const trafficLightVisualizerCommunicationPlugins = createCommunicationPlugins(trafficLightVisualizerService);

trafficLightVisualizerService.startsWith(
    trafficLightVisualizerPlugin,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingYellowInMinutes * 1000 * 60,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingGreenInMinutes * 1000 * 60,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingEndOfBreakInMinutes * 1000 * 60,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForStayingGreenWhenBreakEndedInSeconds * 1000,
    trafficLightVisualizerConfiguration.serviceOptions.pomodoroIsOverMessage,
    trafficLightVisualizerConfiguration.serviceOptions.pomodoroIsAlmostOverMessage,
    trafficLightVisualizerConfiguration.serviceOptions.breakIsOverMessage,
    {
        port: trafficLightVisualizerConfiguration.serviceOptions.port,
        baudRate: trafficLightVisualizerConfiguration.serviceOptions.baudRate,
    },
    () => console.log("Traffic light visualizer started"),
    trafficLightVisualizerCommunicationPlugins);

function createCommunicationPlugins(
    trafficLightVisualizerService: Services.TrafficLightVisualizerNodeService<TrafficLightVisualizerPlugins.ArduinoOptions>)
    : TrafficLightVisualizerCommunicationPlugin[] {
    const trafficLightVisualizerCommunicationPlugins: TrafficLightVisualizerCommunicationPlugin[] = [];

    const completePomodoroDurationInMinutes = trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingYellowInMinutes
                                 + trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingGreenInMinutes;

    trafficLightVisualizerCommunicationPlugins.push(createSlackPlugin(completePomodoroDurationInMinutes));
    trafficLightVisualizerCommunicationPlugins.push(createWebservicePlugin(completePomodoroDurationInMinutes, trafficLightVisualizerService))

    return trafficLightVisualizerCommunicationPlugins;
}

function createSlackPlugin(completePomodoroDurationInMinutes: number)
: TrafficLightVisualizerCommunicationPlugin {
    const slackPlugin = new SlackNamespace.SlackPlugin();

    slackPlugin.startsWith({
        token: process.env.SLACK_TOKEN as string,
        snoozeTimeInMinutes: completePomodoroDurationInMinutes,
        statusText: "Pomodoro",
        statusEmoji: ":tomato:",
    });

    return slackPlugin;
}

function createWebservicePlugin(
    completePomodoroDurationInMinutes: number,
    trafficLightVisualizerService: Services.TrafficLightVisualizerNodeService<TrafficLightVisualizerPlugins.ArduinoOptions>)
    : TrafficLightVisualizerCommunicationPlugin {
    const webServicePlugin = new WebServicePlugin();

    webServicePlugin.startsWith({
        durationInMinutes: completePomodoroDurationInMinutes,
        trafficLightVisualizerService: trafficLightVisualizerService,
    });

    webServicePlugin.startServer();

    return webServicePlugin;
}