import { TrafficLightVisualizerPlugin } from "../../support/api/TrafficLightVisualizerPlugin";
import { TrafficLightVisualizerService } from "../../support/api/TrafficLightVisualizerService";

export namespace TestPlugins {
    export class TrafficLightVisualizerPrintToCommandLinePlugin implements TrafficLightVisualizerPlugin.TrafficLightVisualizerPlugin<null> {
        private trafficLightVisualizerService: TrafficLightVisualizerService.TrafficLightVisualizerService<null>;
        private previousDateNow: number = Date.now();

        public startsWith(
            trafficLightVisualizerService: TrafficLightVisualizerService.TrafficLightVisualizerService<null>,
            options: null,
            onArduinoIsReady: TrafficLightVisualizerPlugin.OnArduinoIsReady): void {
            
            this.trafficLightVisualizerService = trafficLightVisualizerService;

            onArduinoIsReady();

            this.trafficLightVisualizerService.startOrStopPomodoro(TrafficLightVisualizerPlugin.User.First);
        }
        
        public setTrafficLight(user: TrafficLightVisualizerPlugin.User, trafficLightStatus: TrafficLightVisualizerPlugin.TrafficLightStatus): void {
            const currentDateNow = Date.now();

            console.debug(`${TrafficLightVisualizerPlugin.TrafficLightStatus[trafficLightStatus]} ${currentDateNow - this.previousDateNow}`);

            this.previousDateNow = currentDateNow;
        }
    }
}