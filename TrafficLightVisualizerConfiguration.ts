export class TrafficLightVisualizerConfiguration {
    public serviceOptions = {
        timeoutForReachingYellowInMilliseconds: 1200000, // 20 min
        timeoutForReachingGreenInMilliseconds: 300000, // 5 min
        port: "COM4",
        baudRate: 115200,
        pomodoroIsOverMessage: "Pomodoro is over",
    }
}