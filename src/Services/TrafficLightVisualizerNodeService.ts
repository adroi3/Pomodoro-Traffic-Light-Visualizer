import { TrafficLightVisualizerService } from "../../api/TrafficLightVisualizerService";
import { TrafficLightVisualizerPlugin, TrafficLightStatus, User } from "../../api/TrafficLightVisualizerPlugin";

export namespace Services {

    export class TrafficLightVisualizerNodeService implements TrafficLightVisualizerService {
        private trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin;
        private timeoutForReachingYellow: number;
        private timeoutForReachingGreen: number;

        private timerIds: TimerIds = new TimerIds();

        constructor(timeoutForReachingYellow: number, timeoutForReachingGreen: number) {
            this.timeoutForReachingYellow = timeoutForReachingYellow;
            this.timeoutForReachingGreen = timeoutForReachingGreen;
        }

        public startsWith(trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin): void {
            this.trafficLightVisualizerPlugin = trafficLightVisualizerPlugin;

            this.trafficLightVisualizerPlugin.startsWith(this);
        }

        public startOrStopPomodoroFor(user: User): void {
            if (this.timerIds[user] === null)
                this.startPomodoro(user);
            else
                this.stopPomodoro(user);
        }

        private startPomodoro(user: User): void {
            this.trafficLightVisualizerPlugin.setTrafficLightFor(user, TrafficLightStatus.Red);

            this.timerIds[user] = setTimeout(() => {
                this.trafficLightVisualizerPlugin.setTrafficLightFor(user, TrafficLightStatus.Yellow);

                this.timerIds[user] = setTimeout(() => {
                    this.stopPomodoro(user);
                }, this.timeoutForReachingGreen);

            }, this.timeoutForReachingYellow);
        }

        private stopPomodoro(user: User): void {
            clearTimeout(this.timerIds[user] as number);

            this.timerIds[user] = null;

            this.trafficLightVisualizerPlugin.setTrafficLightFor(user, TrafficLightStatus.Green);
        }
    }

    class TimerIds {
        [User.First]: number | null = null;
        [User.Second]: number | null = null;
    }

}