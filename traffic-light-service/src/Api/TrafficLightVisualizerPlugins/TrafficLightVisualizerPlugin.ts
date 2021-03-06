import { BreakTrafficLightStatus } from "./BreakTrafficLightStatus";
import { TrafficLightStatus } from "./TrafficLightStatus";
import { OnIsReady } from "./OnIsReady";
import * as TrafficLightVisualizerService from "../TrafficLightVisualizerServices/TrafficLightVisualizerServicesNamespace";

export interface TrafficLightVisualizerPlugin<TOptions> {
    setBreakTrafficLight(
        breakTrafficLightStatus: BreakTrafficLightStatus): void;
    setTrafficLight(
        trafficLightStatus: TrafficLightStatus): void;
    startsWith(
        trafficLightVisualizerService: TrafficLightVisualizerService.TrafficLightVisualizerService<TOptions>,
        options: TOptions,
        onIsReady: OnIsReady): void;
}