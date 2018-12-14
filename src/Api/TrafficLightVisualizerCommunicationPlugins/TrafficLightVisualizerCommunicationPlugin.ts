export interface TrafficLightVisualizerCommunicationPlugin<TOptions> {
    onPomodoroStarted(): void;
    onPomodoroAlmostOver(): void;
    onPomodoroOver(): void;
    startsWith(options: TOptions): void;
}