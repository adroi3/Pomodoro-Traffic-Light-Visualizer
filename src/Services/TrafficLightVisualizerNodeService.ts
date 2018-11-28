import { TrafficLightVisualizerService } from "../../support/api/TrafficLightVisualizerService";
import { TrafficLightVisualizerPlugin } from "../../support/api/TrafficLightVisualizerPlugin";
import * as NodeNotifier from "node-notifier";

export namespace Services {

    export class TrafficLightVisualizerNodeService<TOptions> implements TrafficLightVisualizerService.TrafficLightVisualizerService<TOptions> {
        private trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin.TrafficLightVisualizerPlugin<TOptions>;
        private timeoutForReachingYellow: number;
        private timeoutForReachingGreen: number;

        private timers: Timers = new Timers();
        private pomodoroIsOverMessage: string;

        public startsWith(
            trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin.TrafficLightVisualizerPlugin<TOptions>,
            timeoutForReachingYellow: number,
            timeoutForReachingGreen: number,
            pomodoroIsOverMessage: string,
            pluginOptions: TOptions,
            onArduinoIsReady: TrafficLightVisualizerPlugin.OnArduinoIsReady): void {
            
            this.trafficLightVisualizerPlugin = trafficLightVisualizerPlugin;
            this.timeoutForReachingYellow = timeoutForReachingYellow;
            this.timeoutForReachingGreen = timeoutForReachingGreen;
            this.pomodoroIsOverMessage = pomodoroIsOverMessage;

            this.trafficLightVisualizerPlugin.startsWith(
                this,
                pluginOptions,
                onArduinoIsReady);
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
                    NodeNotifier.notify({ title: "Pomodoro Traffic Light", message: this.pomodoroIsOverMessage });
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