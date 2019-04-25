import * as TrafficLightVisualizerServices from "../Api/TrafficLightVisualizerServices/TrafficLightVisualizerServicesNamespace";
import * as TrafficLightVisualizerPlugins from "../Api/TrafficLightVisualizerPlugins/TrafficLightVisualizerPluginsNamespace";
import * as TrafficLightVisualizerCommunicationPlugins from "../Api/TrafficLightVisualizerCommunicationPlugins/TrafficLightVisualizerCommunicationPluginsNamespace";

import * as NodeNotifier from "node-notifier";

export class TrafficLightVisualizerNodeService<TPluginOptions> implements TrafficLightVisualizerServices.TrafficLightVisualizerService<TPluginOptions> {
    private trafficLightVisualizerPlugin: TrafficLightVisualizerPlugins.TrafficLightVisualizerPlugin<TPluginOptions> | null;
    private trafficLightVisualizerCommunicationPlugins: TrafficLightVisualizerCommunicationPlugins.TrafficLightVisualizerCommunicationPlugin[];

    private timeoutForReachingYellow: number;
    private timeoutForReachingGreen: number;
    private timeoutForReachingEndOfBreak: number;
    private timeoutForStayingGreenWhenBreakEnded: number;

    private pomodoroIsOverMessage: string;
    private pomodoroIsAlmostOverMessage: string;
    private breakIsOverMessage: string;

    private timers: Timers = new Timers();
    

    public startsWith(
        trafficLightVisualizerPlugin: TrafficLightVisualizerPlugins.TrafficLightVisualizerPlugin<TPluginOptions> | null,
        timeoutForReachingYellow: number,
        timeoutForReachingGreen: number,
        timeoutForReachingEndOfBreak: number,
        timeoutForStayingGreenWhenBreakEnded: number,
        pomodoroIsOverMessage: string,
        pomodoroIsAlmostOverMessage: string,
        breakIsOverMessage: string,
        pluginOptions: TPluginOptions | null,
        onIsReady: TrafficLightVisualizerPlugins.OnIsReady | null,
        trafficLightVisualizerCommunicationPlugins: TrafficLightVisualizerCommunicationPlugins.TrafficLightVisualizerCommunicationPlugin[]): void {

        this.trafficLightVisualizerPlugin = trafficLightVisualizerPlugin;
        this.timeoutForReachingYellow = timeoutForReachingYellow;
        this.timeoutForReachingGreen = timeoutForReachingGreen;
        this.timeoutForReachingEndOfBreak = timeoutForReachingEndOfBreak;
        this.timeoutForStayingGreenWhenBreakEnded = timeoutForStayingGreenWhenBreakEnded;
        this.pomodoroIsOverMessage = pomodoroIsOverMessage;
        this.pomodoroIsAlmostOverMessage = pomodoroIsAlmostOverMessage;
        this.breakIsOverMessage = breakIsOverMessage;
        this.trafficLightVisualizerCommunicationPlugins = trafficLightVisualizerCommunicationPlugins;

        if (pluginOptions !== null && onIsReady !== null) {
            (this.trafficLightVisualizerPlugin as TrafficLightVisualizerPlugins.TrafficLightVisualizerPlugin<TPluginOptions>).startsWith(
                this,
                pluginOptions,
                onIsReady);
        }
    }

    public startOrStopPomodoro(): void {

        if (!this.timers.isSwitchToBreakAllowed) {
            this.timers.isSwitchToBreakAllowed = true;

            this.reachGreen();
        }
        else if (this.timers.pomodoroTimer === null) {
            this.stopBreak();
            this.startPomodoro();
        }
        else {
            this.stopPomodoro();
        }
    }

    private startPomodoro(): void {

        if (this.trafficLightVisualizerPlugin !== null) {
            (this.trafficLightVisualizerPlugin as TrafficLightVisualizerPlugins.TrafficLightVisualizerPlugin<TPluginOptions>)
            .setTrafficLight(TrafficLightVisualizerPlugins.TrafficLightStatus.Red);
        }

        this.trafficLightVisualizerPlugin
        this.trafficLightVisualizerCommunicationPlugins.forEach(x => x.onPomodoroStarted());

        this.timers.pomodoroTimer = setTimeout(() => this.reachYellow(), this.timeoutForReachingYellow);
    }

    private stopPomodoro(): void {
        if (this.timers.pomodoroTimer !== null) {
            clearTimeout(this.timers.pomodoroTimer as NodeJS.Timer);
            this.timers.pomodoroTimer = null;
        }

        if (this.trafficLightVisualizerPlugin !== null) {
            (this.trafficLightVisualizerPlugin as TrafficLightVisualizerPlugins.TrafficLightVisualizerPlugin<TPluginOptions>)
            .setTrafficLight(TrafficLightVisualizerPlugins.TrafficLightStatus.Green);
        }

        this.trafficLightVisualizerCommunicationPlugins.forEach(x => x.onPomodoroOver());
    }

    private reachYellow(): void {
        if (this.trafficLightVisualizerPlugin !== null) {
            (this.trafficLightVisualizerPlugin as TrafficLightVisualizerPlugins.TrafficLightVisualizerPlugin<TPluginOptions>)
            .setTrafficLight(TrafficLightVisualizerPlugins.TrafficLightStatus.Yellow);
        }

        this.trafficLightVisualizerCommunicationPlugins.forEach(x => x.onPomodoroAlmostOver());

        this.notify(this.pomodoroIsAlmostOverMessage);

        this.timers.pomodoroTimer = setTimeout(() => this.onPomodoroIsOver(), this.timeoutForReachingGreen);
    }

    private onPomodoroIsOver(): void {
        this.timers.isSwitchToBreakAllowed = false;

        this.notify(this.pomodoroIsOverMessage);
    }

    private reachGreen(): void {
        this.stopPomodoro();

        this.startBreak();
    }

    private startBreak(): void {
        if (this.trafficLightVisualizerPlugin !== null) {
            (this.trafficLightVisualizerPlugin as TrafficLightVisualizerPlugins.TrafficLightVisualizerPlugin<TPluginOptions>)
            .setBreakTrafficLight(TrafficLightVisualizerPlugins.BreakTrafficLightStatus.Red);
        }

        this.timers.breakTimer = setTimeout(() => this.reachEndOfBreak(), this.timeoutForReachingEndOfBreak);
    }

    private stopBreak(): void {
        if (this.timers.breakTimer !== null) {
            clearTimeout(this.timers.breakTimer as NodeJS.Timer);
            this.timers.breakTimer = null;
        }

        if (this.trafficLightVisualizerPlugin !== null) {
            (this.trafficLightVisualizerPlugin as TrafficLightVisualizerPlugins.TrafficLightVisualizerPlugin<TPluginOptions>)
            .setBreakTrafficLight(TrafficLightVisualizerPlugins.BreakTrafficLightStatus.Nothing);
        }

        this.trafficLightVisualizerCommunicationPlugins.forEach(x => x.onBreakOver());
    }

    private reachEndOfBreak(): void {
        if (this.trafficLightVisualizerPlugin !== null) {
            (this.trafficLightVisualizerPlugin as TrafficLightVisualizerPlugins.TrafficLightVisualizerPlugin<TPluginOptions>)
            .setBreakTrafficLight(TrafficLightVisualizerPlugins.BreakTrafficLightStatus.Green);
        }

        this.notify(this.breakIsOverMessage);

        this.timers.breakTimer = setTimeout(() => this.switchOffBreakTrafficLights(), this.timeoutForStayingGreenWhenBreakEnded);
    }

    private switchOffBreakTrafficLights(): void {
        if (this.trafficLightVisualizerPlugin !== null) {
            (this.trafficLightVisualizerPlugin as TrafficLightVisualizerPlugins.TrafficLightVisualizerPlugin<TPluginOptions>)
            .setBreakTrafficLight(TrafficLightVisualizerPlugins.BreakTrafficLightStatus.Nothing);
        }

        this.timers.breakTimer = null;
    }

    private notify(message: string): void {
        NodeNotifier.notify({ title: "Pomodoro Traffic Light", message: message });
    }
}

class Timers {
    public isSwitchToBreakAllowed: boolean = true;
    public pomodoroTimer: NodeJS.Timer | null = null;
    public breakTimer: NodeJS.Timer | null = null;
}