import { TrafficLightVisualizerPlugin, User, TrafficLightStatus } from "../../api/TrafficLightVisualizerPlugin";
import { TrafficLightVisualizerService } from "../../api/TrafficLightVisualizerService";

export namespace TestPlugins {
    export class TrafficLightVisualizerPrintToCommandLinePlugin implements TrafficLightVisualizerPlugin {
        private trafficLightVisualizerService: TrafficLightVisualizerService
        private previousDateNow: number = Date.now();

        public startsWith(trafficLightVisualizerService: TrafficLightVisualizerService): void {
            this.trafficLightVisualizerService = trafficLightVisualizerService;
            this.trafficLightVisualizerService.startOrStopPomodoroFor(User.First);
        }
        
        public setTrafficLightFor(user: User, trafficLightStatus: TrafficLightStatus): void {
            let currentDateNow = Date.now();

            console.debug(`${TrafficLightStatus[trafficLightStatus]} ${currentDateNow - this.previousDateNow}`);

            this.previousDateNow = currentDateNow;

            if (trafficLightStatus === 1) {
                this.trafficLightVisualizerService.startOrStopPomodoroFor(user);
            }
        }
    }
}