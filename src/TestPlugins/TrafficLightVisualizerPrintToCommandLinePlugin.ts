import { TrafficLightVisualizerPlugin } from "../../support/api/TrafficLightVisualizerPlugin";
import { TrafficLightVisualizerService } from "../../support/api/TrafficLightVisualizerService";

export namespace TestPlugins {
    export class TrafficLightVisualizerPrintToCommandLinePlugin implements TrafficLightVisualizerPlugin.TrafficLightVisualizerPlugin {
        private trafficLightVisualizerService: TrafficLightVisualizerService.TrafficLightVisualizerService;
        private previousDateNow: number = Date.now();

        public startsWith(trafficLightVisualizerService: TrafficLightVisualizerService.TrafficLightVisualizerService): void {
            this.trafficLightVisualizerService = trafficLightVisualizerService;
            this.trafficLightVisualizerService.startOrStopPomodoroFor(TrafficLightVisualizerPlugin.User.First);
        }
        
        public setTrafficLightFor(user: TrafficLightVisualizerPlugin.User, trafficLightStatus: TrafficLightVisualizerPlugin.TrafficLightStatus): void {
            let currentDateNow = Date.now();

            console.debug(`${TrafficLightVisualizerPlugin.TrafficLightStatus[trafficLightStatus]} ${currentDateNow - this.previousDateNow}`);

            this.previousDateNow = currentDateNow;
        }
    }
}