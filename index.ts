import { TrafficLightVisualizerService } from "./api/TrafficLightVisualizerService";
import { TrafficLightVisualizerPlugin } from "./api/TrafficLightVisualizerPlugin";

import { Services } from "./src/Services/TrafficLightVisualizerNodeService";
import { TestPlugins } from "./src/TestPlugins/TrafficLightVisualizerPrintToCommandLinePlugin";

import * as fs from "fs";

const test = JSON.parse(fs.readFileSync("./traffic-light-visualizer-service-config.json", "utf8"));

const trafficLightVisualizerServiceConfiguration = readConfiguration();

const serviceOptions = trafficLightVisualizerServiceConfiguration.serviceOptions;

const trafficLightVisualizerServiceFile = require(serviceOptions.path as string);

const trafficLightVisualizerService: TrafficLightVisualizerService.TrafficLightVisualizerService = <TrafficLightVisualizerService.TrafficLightVisualizerService>(new trafficLightVisualizerServiceFile
    [trafficLightVisualizerServiceConfiguration.serviceOptions.namespace]
    [trafficLightVisualizerServiceConfiguration.serviceOptions.class]());

const trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin.TrafficLightVisualizerPlugin = new TestPlugins.TrafficLightVisualizerPrintToCommandLinePlugin();

trafficLightVisualizerService.startsWith(trafficLightVisualizerPlugin, 5, 6);

function readConfiguration(): any {
    return JSON.parse(fs.readFileSync("./traffic-light-visualizer-service-config.json", "utf8"));
}