export class TrafficLightVisualizerConfiguration {
    public serviceOptions = {
        timeoutForReachingYellow: 20 * 1000 * 60,
        timeoutForReachingGreen: 5 * 1000 * 60,
        timeoutForReachingEndOfBreak: 5 * 1000 * 60,
        timeoutForStayingGreenWhenBreakEnded: 10 * 1000,
        port: "COM4",
        baudRate: 115200,
        pomodoroIsAlmostOverMessage: "Pomdoro is almost over",
        pomodoroIsOverMessage: "Pomodoro is over",
        breakIsOverMessage: "Break is over",
    }
}