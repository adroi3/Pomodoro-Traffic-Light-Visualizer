import { TrafficLightVisualizerPlugin } from "./support/api/TrafficLightVisualizerPlugin";

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
    {
        port: trafficLightVisualizerConfiguration.serviceOptions.port,
        baudRate: trafficLightVisualizerConfiguration.serviceOptions.baudRate,
    },
    () => trafficLightVisualizerService.startOrStopPomodoroFor(TrafficLightVisualizerPlugin.User.First));