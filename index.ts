import { TrafficLightVisualizerService } from "./api/TrafficLightVisualizerService";
import { TrafficLightVisualizerPlugin } from "./api/TrafficLightVisualizerPlugin";

import { Services } from "./src/Services/TrafficLightVisualizerNodeService";
import { TestPlugins } from "./src/TestPlugins/TrafficLightVisualizerPrintToCommandLinePlugin";

TODO
import trafficLightVisualizerServiceConfiguration = require('./traffic-light-visualizer-service-config.json');

console.debug(trafficLightVisualizerServiceConfiguration);

let trafficLightVisualizerService: TrafficLightVisualizerService.TrafficLightVisualizerService = new Services.TrafficLightVisualizerNodeService();

let trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin.TrafficLightVisualizerPlugin = new TestPlugins.TrafficLightVisualizerPrintToCommandLinePlugin();

trafficLightVisualizerService.startsWith(trafficLightVisualizerPlugin, 5, 6);