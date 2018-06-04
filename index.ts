import { Services } from "./src/Services/TrafficLightVisualizerNodeService";
import { TestPlugins } from "./src/TestPlugins/TrafficLightVisualizerPrintToCommandLinePlugin";

let trafficLightVisualizerNodeService = new Services.TrafficLightVisualizerNodeService(2000, 1000);

let trafficLightVisualizerPrintToCommandLinePlugin = new TestPlugins.TrafficLightVisualizerPrintToCommandLinePlugin();

trafficLightVisualizerNodeService.startsWith(trafficLightVisualizerPrintToCommandLinePlugin);