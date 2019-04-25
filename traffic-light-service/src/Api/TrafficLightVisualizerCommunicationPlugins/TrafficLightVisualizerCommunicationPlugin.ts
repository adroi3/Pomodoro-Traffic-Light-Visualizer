export interface TrafficLightVisualizerCommunicationPlugin {
    onPomodoroStarted(): void;
    onPomodoroAlmostOver(): void;
    onPomodoroOver(): void;
    onBreakOver(): void;
}