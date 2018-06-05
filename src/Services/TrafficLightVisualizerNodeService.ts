import { TrafficLightVisualizerService } from "../../api/TrafficLightVisualizerService";
import { TrafficLightVisualizerPlugin, TrafficLightStatus, User } from "../../api/TrafficLightVisualizerPlugin";

export namespace Services {

    export class TrafficLightVisualizerNodeService implements TrafficLightVisualizerService {
        private trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin;
        private timeoutForReachingYellow: number;
        private timeoutForReachingGreen: number;

        private timers: Timers = new Timers();

        constructor(timeoutForReachingYellow: number, timeoutForReachingGreen: number) {
            this.timeoutForReachingYellow = timeoutForReachingYellow;
            this.timeoutForReachingGreen = timeoutForReachingGreen;
        }

        public startsWith(trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin): void {
            this.trafficLightVisualizerPlugin = trafficLightVisualizerPlugin;

            this.trafficLightVisualizerPlugin.startsWith(this);
        }

        public startOrStopPomodoroFor(user: User): void {
            if (this.timers[user] === null)
                this.startPomodoro(user);
            else
                this.stopPomodoro(user);
        }

        private startPomodoro(user: User): void {
            this.trafficLightVisualizerPlugin.setTrafficLightFor(user, TrafficLightStatus.Red);

            this.timers[user] = setTimeout(() => {
                this.trafficLightVisualizerPlugin.setTrafficLightFor(user, TrafficLightStatus.Yellow);

                if (this.timers[user] === null)
                    return;

                this.timers[user] = setTimeout(() => {
                    this.stopPomodoro(user);
                }, this.timeoutForReachingGreen);
            }, this.timeoutForReachingYellow);
        }

        private stopPomodoro(user: User): void {
            clearTimeout(this.timers[user]);

            this.timers[user] = null;
            this.trafficLightVisualizerPlugin.setTrafficLightFor(user, TrafficLightStatus.Green);
        }
    }

    class Timers {
        [User.First]: any | null = null;
        [User.Second]: any | null = null;
    }

}