import { TrafficLightVisualizerService } from "../../api/TrafficLightVisualizerService";
import { TrafficLightVisualizerPlugin } from "../../api/TrafficLightVisualizerPlugin";

export namespace Services {

    export class TrafficLightVisualizerNodeService implements TrafficLightVisualizerService.TrafficLightVisualizerService {
        private trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin.TrafficLightVisualizerPlugin;
        private timeoutForReachingYellow: number;
        private timeoutForReachingGreen: number;

        private timers: Timers = new Timers();

        public startsWith(trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin.TrafficLightVisualizerPlugin, timeoutForReachingYellow: number, timeoutForReachingGreen: number): void {
            
            this.trafficLightVisualizerPlugin = trafficLightVisualizerPlugin;
            this.timeoutForReachingYellow = timeoutForReachingYellow;
            this.timeoutForReachingGreen = timeoutForReachingGreen;

            this.trafficLightVisualizerPlugin.startsWith(this);
        }

        public startOrStopPomodoroFor(user: TrafficLightVisualizerPlugin.User): void {
            if (this.timers[user] === null)
                this.startPomodoro(user);
            else
                this.stopPomodoro(user);
        }

        private startPomodoro(user: TrafficLightVisualizerPlugin.User): void {
            this.trafficLightVisualizerPlugin.setTrafficLightFor(user, TrafficLightVisualizerPlugin.TrafficLightStatus.Red);

            this.timers[user] = setTimeout(() => {
                this.trafficLightVisualizerPlugin.setTrafficLightFor(user, TrafficLightVisualizerPlugin.TrafficLightStatus.Yellow);

                if (this.timers[user] === null)
                    return;

                this.timers[user] = setTimeout(() => {
                    this.stopPomodoro(user);
                }, this.timeoutForReachingGreen);
            }, this.timeoutForReachingYellow);
        }

        private stopPomodoro(user: TrafficLightVisualizerPlugin.User): void {
            if (this.timers[user] !== null) {
                clearTimeout(this.timers[user] as NodeJS.Timer);
                this.timers[user] = null;
            }

            this.trafficLightVisualizerPlugin.setTrafficLightFor(user, TrafficLightVisualizerPlugin.TrafficLightStatus.Green);
        }
    }

    class Timers {
        [TrafficLightVisualizerPlugin.User.First]: NodeJS.Timer | null = null;
        [TrafficLightVisualizerPlugin.User.Second]: NodeJS.Timer | null = null;
    }
}