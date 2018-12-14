import * as TrafficLightVisualizerPlugins from "../TrafficLightVisualizerPlugins/TrafficLightVisualizerPluginsNamespace";

export interface TrafficLightVisualizerService<TOptions> {
        startsWith(
            trafficLightVisualizerPlugin: TrafficLightVisualizerPlugins.TrafficLightVisualizerPlugin<TOptions>,
            timeoutForReachingYellow: number,
            timeoutForReachingGreen: number,
            timeoutForReachingEndOfBreak: number,
            timeoutForStayingGreenWhenBreakEnded: number,
            pomodoroIsOverMessage: string,
            pomodoroIsAlmostOverMessage: string,
            breakIsOverMessage: string,
            pluginOptions: TOptions,
            onArduinoIsReady: TrafficLightVisualizerPlugins.OnArduinoIsReady): void;

        startOrStopPomodoro(): void;
}