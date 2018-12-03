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

        public startOrStopPomodoro(): void {
            if (this.timers.pomodoroTimer === null)
                this.startPomodoro();
            else
                this.stopPomodoro();
        }

        private startPomodoro(): void {
            this.trafficLightVisualizerPlugin.setTrafficLight(TrafficLightVisualizerPlugin.TrafficLightStatus.Red);

            this.timers.pomodoroTimer = setTimeout(() => {
                this.trafficLightVisualizerPlugin.setTrafficLight(TrafficLightVisualizerPlugin.TrafficLightStatus.Yellow);

                if (this.timers.pomodoroTimer === null)
                    return;

                this.timers.pomodoroTimer = setTimeout(() => {
                    this.stopPomodoro();
                    NodeNotifier.notify({ title: "Pomodoro Traffic Light", message: this.pomodoroIsOverMessage });
                }, this.timeoutForReachingGreen);
            }, this.timeoutForReachingYellow);
        }

        private stopPomodoro(): void {
            if (this.timers.pomodoroTimer !== null) {
                clearTimeout(this.timers.pomodoroTimer as NodeJS.Timer);
                this.timers.pomodoroTimer = null;
            }

            this.trafficLightVisualizerPlugin.setTrafficLight(TrafficLightVisualizerPlugin.TrafficLightStatus.Green);
        }
    }

    class Timers {
        public pomodoroTimer: NodeJS.Timer | null = null;
    }
}