import * as TrafficLightVisualizerPlugins from "../TrafficLightVisualizerPlugins/TrafficLightVisualizerPluginsNamespace";
import * as TrafficLightVisualizerCommunicationPlugins from "../TrafficLightVisualizerCommunicationPlugins/TrafficLightVisualizerCommunicationPluginsNamespace";

export interface TrafficLightVisualizerService<TPluginOptions> {
        startsWith(
            trafficLightVisualizerPlugin: TrafficLightVisualizerPlugins.TrafficLightVisualizerPlugin<TPluginOptions>,
            timeoutForReachingYellow: number,
            timeoutForReachingGreen: number,
            timeoutForReachingEndOfBreak: number,
            timeoutForStayingGreenWhenBreakEnded: number,
            pomodoroIsOverMessage: string,
            pomodoroIsAlmostOverMessage: string,
            breakIsOverMessage: string,
            pluginOptions: TPluginOptions,
            onArduinoIsReady: TrafficLightVisualizerPlugins.OnArduinoIsReady,
            trafficLightVisualizerCommunicationPlugins: TrafficLightVisualizerCommunicationPlugins.TrafficLightVisualizerCommunicationPlugin[]): void;

        startOrStopPomodoro(): void;
}