import { Plugins } from "./support/arduino-plugin/src/Plugins/TrafficLightVisualizerArduinoPlugin"

import { Services } from "./src/Services/TrafficLightVisualizerNodeService";

import { TrafficLightVisualizerConfiguration } from "./TrafficLightVisualizerConfiguration"

const trafficLightVisualizerConfiguration = new TrafficLightVisualizerConfiguration();

const trafficLightVisualizerService = new Services.TrafficLightVisualizerNodeService<Plugins.TrafficLightVisualizerArduinoPluginOptions>();

const trafficLightVisualizerPlugin = new Plugins.TrafficLightVisualizerArduinoPlugin();

trafficLightVisualizerService.startsWith(
    trafficLightVisualizerPlugin,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingYellowInMilliseconds,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingGreenInMilliseconds,
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