import * as Plugins from "./src/Plugins/PluginsNamespace";
import * as Services from "./src/Services/ServicesNamespace";

import { TrafficLightVisualizerConfiguration } from "./TrafficLightVisualizerConfiguration"

const trafficLightVisualizerConfiguration = new TrafficLightVisualizerConfiguration();

const trafficLightVisualizerService = new Services.TrafficLightVisualizerNodeService<Plugins.TrafficLightVisualizerArduinoPluginOptions>();

const trafficLightVisualizerPlugin = new Plugins.TrafficLightVisualizerArduinoPlugin();

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