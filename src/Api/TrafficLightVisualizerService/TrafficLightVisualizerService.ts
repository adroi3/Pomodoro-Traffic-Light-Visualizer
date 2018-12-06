import * as TrafficLightVisualizerPlugin from "../TrafficLightVisualizerPlugin/TrafficLightVisualizerPluginNamespace";

export interface TrafficLightVisualizerService<TOptions> {
        startsWith(
            trafficLightVisualizerPlugin: TrafficLightVisualizerPlugin.TrafficLightVisualizerPlugin<TOptions>,
            timeoutForReachingYellow: number,
            timeoutForReachingGreen: number,
            timeoutForReachingEndOfBreak: number,
            timeoutForStayingGreenWhenBreakEnded: number,
            pomodoroIsOverMessage: string,
            pomodoroIsAlmostOverMessage: string,
            breakIsOverMessage: string,
            pluginOptions: TOptions,
            onArduinoIsReady: TrafficLightVisualizerPlugin.OnArduinoIsReady): void;

        startOrStopPomodoro(): void;
}
