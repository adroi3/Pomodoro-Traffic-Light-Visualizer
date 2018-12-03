import { TrafficLightVisualizerService } from "../../support/api/TrafficLightVisualizerService";
import { TrafficLightVisualizerPlugin } from "../../support/api/TrafficLightVisualizerPlugin";
import * as NodeNotifier from "node-notifier";

export namespace Services {

    export class TrafficLightVisualizerNodeService<TOptions> implements TrafficLightVisualizerService.TrafficLightVisualizerService<TOptions> {
        private trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin.TrafficLightVisualizerPlugin<TOptions>;
        private timeoutForReachingYellow: number;
        private timeoutForReachingGreen: number;
        private timeoutForReachingEndOfBreak: number;
        private timeoutForStayingGreenWhenBreakEnded: number;

        private pomodoroIsOverMessage: string;
        private pomodoroIsAlmostOverMessage: string;
        private breakIsOverMessage: string;

        private timers: Timers = new Timers();

        public startsWith(
            trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin.TrafficLightVisualizerPlugin<TOptions>,
            timeoutForReachingYellow: number,
            timeoutForReachingGreen: number,
            timeoutForReachingEndOfBreak: number,
            timeoutForStayingGreenWhenBreakEnded: number,
            pomodoroIsOverMessage: string,
            pomodoroIsAlmostOverMessage: string,
            breakIsOverMessage: string,
            pluginOptions: TOptions,
            onArduinoIsReady: TrafficLightVisualizerPlugin.OnArduinoIsReady): void {
            
            this.trafficLightVisualizerPlugin = trafficLightVisualizerPlugin;
            this.timeoutForReachingYellow = timeoutForReachingYellow;
            this.timeoutForReachingGreen = timeoutForReachingGreen;
            this.timeoutForReachingEndOfBreak = timeoutForReachingEndOfBreak;
            this.timeoutForStayingGreenWhenBreakEnded = timeoutForStayingGreenWhenBreakEnded;
            this.pomodoroIsOverMessage = pomodoroIsOverMessage;
            this.pomodoroIsAlmostOverMessage = pomodoroIsAlmostOverMessage;
            this.breakIsOverMessage = breakIsOverMessage;

            this.trafficLightVisualizerPlugin.startsWith(
                this,
                pluginOptions,
                onArduinoIsReady);
        }

        public startOrStopPomodoro(): void {
            if (this.timers.breakTimer !== null)
                return;

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

                NodeNotifier.notify({ title: "Pomodoro Traffic Light", message: this.pomodoroIsAlmostOverMessage });

                this.timers.pomodoroTimer = setTimeout(() => {
                    this.stopPomodoro();

                    NodeNotifier.notify({ title: "Pomodoro Traffic Light", message: this.pomodoroIsOverMessage });

                    this.startBreak();

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

        private startBreak(): void {
            this.trafficLightVisualizerPlugin.setBreakTrafficLight(TrafficLightVisualizerPlugin.BreakTrafficLightStatus.Red);

            this.timers.breakTimer = setTimeout(() => {
            
                this.trafficLightVisualizerPlugin.setBreakTrafficLight(TrafficLightVisualizerPlugin.BreakTrafficLightStatus.Green);

                NodeNotifier.notify({ title: "Pomodoro Traffic Light", message: this.breakIsOverMessage });

                this.timers.breakTimer = setTimeout(() => {
                    
                    this.trafficLightVisualizerPlugin.setBreakTrafficLight(TrafficLightVisualizerPlugin.BreakTrafficLightStatus.Nothing);

                    this.timers.breakTimer = null;

                }, this.timeoutForStayingGreenWhenBreakEnded);
            }, this.timeoutForReachingEndOfBreak);
        }
    }

    class Timers {
        public pomodoroTimer: NodeJS.Timer | null = null;
        public breakTimer: NodeJS.Timer | null = null;
    }
}