export class TrafficLightVisualizerConfiguration {
    public serviceOptions = {
        timeoutForReachingYellowInMilliseconds: 40 * 1000 * 60,
        timeoutForReachingGreenInMilliseconds: 10 * 1000 * 60,
        timeoutForReachingEndOfBreak: 10 * 1000 * 60,
        timeoutForStayingGreenWhenBreakEnded: 10 * 1000,
        port: "COM4",
        baudRate: 115200,
        pomodoroIsAlmostOverMessage: "Pomdoro is almost over",
        pomodoroIsOverMessage: "Pomodoro is over",
        breakIsOverMessage: "Break is over",
    }
}