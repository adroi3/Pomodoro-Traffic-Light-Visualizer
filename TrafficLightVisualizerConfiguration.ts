export class TrafficLightVisualizerConfiguration {
    public serviceOptions = {
        timeoutForReachingYellow: 20,
        timeoutForReachingGreen: 5,
        timeoutForReachingEndOfBreak: 5,
        timeoutForStayingGreenWhenBreakEnded: 10,
        port: "COM4",
        baudRate: 115200,
        pomodoroIsAlmostOverMessage: "Pomdoro is almost over",
        pomodoroIsOverMessage: "Pomodoro is over",
        breakIsOverMessage: "Break is over",
    }
}