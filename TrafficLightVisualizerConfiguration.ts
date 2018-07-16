import { Services } from "./src/Services/TrafficLightVisualizerNodeService";
import { TestPlugins } from "./src/TestPlugins/TrafficLightVisualizerPrintToCommandLinePlugin";

export class TrafficLightVisualizerConfiguration {
    public serviceOptions = {
        class: Services.TrafficLightVisualizerNodeService,
        timeoutForReachingYellow: 10,
        timeoutForReachingGreen: 100,
    }

    public pluginOptions = {
        class: TestPlugins.TrafficLightVisualizerPrintToCommandLinePlugin,
    }
}