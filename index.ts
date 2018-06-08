import { TrafficLightVisualizerService } from "./api/TrafficLightVisualizerService";
import { TrafficLightVisualizerPlugin } from "./api/TrafficLightVisualizerPlugin";

import { TrafficLightVisualizerConfiguration } from "./TrafficLightVisualizerConfiguration"

const trafficLightVisualizerConfiguration = new TrafficLightVisualizerConfiguration();

const trafficLightVisualizerService: TrafficLightVisualizerService.TrafficLightVisualizerService = new trafficLightVisualizerConfiguration.serviceOptions.class();

const trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin.TrafficLightVisualizerPlugin = new trafficLightVisualizerConfiguration.pluginOptions.class();

trafficLightVisualizerService.startsWith(
    trafficLightVisualizerPlugin,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingYellow,
    trafficLightVisualizerConfiguration.serviceOptions.timeoutForReachingGreen);