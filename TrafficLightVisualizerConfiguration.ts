export class TrafficLightVisualizerConfiguration {
    public serviceOptions = {
        timeoutForReachingYellowInMilliseconds: 20 * 1000 * 60,
        timeoutForReachingGreenInMilliseconds: 5 * 1000 * 60,
        port: "COM4",
        baudRate: 115200,
        pomodoroIsOverMessage: "Pomodoro is over",
    }
}