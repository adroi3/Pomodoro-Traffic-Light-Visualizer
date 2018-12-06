import * as TrafficLightVisualizerService from "../Api/TrafficLightVisualizerService/TrafficLightVisualizerServiceNamespace";
import * as TrafficLightVisualizerPlugin from "../Api/TrafficLightVisualizerPlugin/TrafficLightVisualizerPluginNamespace";

import * as NodeNotifier from "node-notifier";

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

        if (this.timers.pomodoroTimer === null) {
            this.stopBreak();
            this.startPomodoro();
        }
        else {
            this.stopPomodoro();
        }
    }

    private startPomodoro(): void {
        this.trafficLightVisualizerPlugin.setTrafficLight(TrafficLightVisualizerPlugin.TrafficLightStatus.Red);

        this.timers.pomodoroTimer = setTimeout(() => this.ReachYellow(), this.timeoutForReachingYellow);
    }

    private stopPomodoro(): void {
        if (this.timers.pomodoroTimer !== null) {
            clearTimeout(this.timers.pomodoroTimer as NodeJS.Timer);
            this.timers.pomodoroTimer = null;
        }

        this.trafficLightVisualizerPlugin.setTrafficLight(TrafficLightVisualizerPlugin.TrafficLightStatus.Green);
    }

    private ReachYellow(): void {
        this.trafficLightVisualizerPlugin.setTrafficLight(TrafficLightVisualizerPlugin.TrafficLightStatus.Yellow);

        this.notify(this.pomodoroIsAlmostOverMessage);

        this.timers.pomodoroTimer = setTimeout(() => this.ReachGreen(), this.timeoutForReachingGreen);
    }

    private ReachGreen(): void {
        this.stopPomodoro();

        this.notify(this.pomodoroIsOverMessage);

        this.startBreak();
    }

    private startBreak(): void {
        this.trafficLightVisualizerPlugin.setBreakTrafficLight(TrafficLightVisualizerPlugin.BreakTrafficLightStatus.Red);

        this.timers.breakTimer = setTimeout(() => this.reachEndOfBreak(), this.timeoutForReachingEndOfBreak);
    }

    private stopBreak(): void {
        if (this.timers.breakTimer !== null) {
            clearTimeout(this.timers.breakTimer as NodeJS.Timer);
            this.timers.breakTimer = null;
        }

        this.trafficLightVisualizerPlugin.setBreakTrafficLight(TrafficLightVisualizerPlugin.BreakTrafficLightStatus.Nothing);
    }

    private reachEndOfBreak(): void {
        this.trafficLightVisualizerPlugin.setBreakTrafficLight(TrafficLightVisualizerPlugin.BreakTrafficLightStatus.Green);

        this.notify(this.breakIsOverMessage);

        this.timers.breakTimer = setTimeout(() => this.switchOffBreakTrafficLights(), this.timeoutForStayingGreenWhenBreakEnded);
    }

    private switchOffBreakTrafficLights(): void {
        this.trafficLightVisualizerPlugin.setBreakTrafficLight(TrafficLightVisualizerPlugin.BreakTrafficLightStatus.Nothing);

        this.timers.breakTimer = null;
    }

    private notify(message: string): void {
        NodeNotifier.notify({ title: "Pomodoro Traffic Light", message: message });
    }
}

class Timers {
    public pomodoroTimer: NodeJS.Timer | null = null;
    public breakTimer: NodeJS.Timer | null = null;
}