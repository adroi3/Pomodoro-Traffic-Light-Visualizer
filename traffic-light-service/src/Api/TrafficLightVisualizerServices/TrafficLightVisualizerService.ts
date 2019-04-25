import * as TrafficLightVisualizerPlugins from "../TrafficLightVisualizerPlugins/TrafficLightVisualizerPluginsNamespace";
import * as TrafficLightVisualizerCommunicationPlugins from "../TrafficLightVisualizerCommunicationPlugins/TrafficLightVisualizerCommunicationPluginsNamespace";

export interface TrafficLightVisualizerService<TPluginOptions> {
        startsWith(
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
        trafficLightVisualizerCommunicationPlugins: TrafficLightVisualizerCommunicationPlugins.TrafficLightVisualizerCommunicationPlugin[]): void;

        startOrStopPomodoro(): void;
}