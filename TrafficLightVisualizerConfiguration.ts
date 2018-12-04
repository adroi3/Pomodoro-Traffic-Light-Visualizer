export class TrafficLightVisualizerConfiguration {
    public serviceOptions = {
        timeoutForReachingYellowInMilliseconds: 10000, // 20 * 1000 * 60,
        timeoutForReachingGreenInMilliseconds: 10000, // 5 * 1000 * 60,
        timeoutForReachingEndOfBreak: 10000, // 5 * 1000 * 60,
        timeoutForStayingGreenWhenBreakEnded: 5 * 1000,
        port: "COM4",
        baudRate: 115200,
        pomodoroIsAlmostOverMessage: "Pomdoro is almost over",
        pomodoroIsOverMessage: "Pomodoro is over",
        breakIsOverMessage: "Break is over",
    }
}