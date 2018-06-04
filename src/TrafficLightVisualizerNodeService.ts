import { TrafficLightVisualizerService, StartOrStopPomodoro } from "../api/TrafficLightVisualizerService";
import { TrafficLightVisualizerPlugin, ResetTrafficLights, SetCarTrafficLight, CarTrafficLight } from "../api/TrafficLightVisualizerPlugin";

class TrafficLightVisualizerNodeService implements TrafficLightVisualizerService {
    private interval: number = 10000;
    private trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin;

    private timerId?: number = null;

    constructor(trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin) {
        this.trafficLightVisualizerPlugin = trafficLightVisualizerPlugin;
    }

    public startOrStopPomodoro() {
        if (this.timerId === null)
            this.startPomodoro();
        else
            this.stopPomodoro();
    }

    // TODO @David
    private startPomodoro() {
        this.timerId = setInterval(() => {
        }, this.interval);
    }

    // TODO @David Lösche aus Restservice raus
    private stopPomodoro() {
        clearInterval(this.timerId);
    }
}