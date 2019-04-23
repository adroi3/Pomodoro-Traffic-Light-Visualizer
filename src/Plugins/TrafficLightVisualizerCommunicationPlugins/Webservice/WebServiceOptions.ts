import * as TrafficLightVisualizerService from "../../../Api/TrafficLightVisualizerServices/TrafficLightVisualizerServicesNamespace";

export interface WebServiceOptions<TPluginOptions> {
    durationInMinutes: number;
    trafficLightVisualizerService: TrafficLightVisualizerService.TrafficLightVisualizerService<TPluginOptions>;
}