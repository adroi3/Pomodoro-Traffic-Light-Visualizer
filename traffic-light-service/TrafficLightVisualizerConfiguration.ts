export class TrafficLightVisualizerConfiguration {
    public serviceOptions = {
        timeoutForReachingYellowInMinutes: 0.1,
        timeoutForReachingGreenInMinutes: 0.1,
        timeoutForReachingEndOfBreakInMinutes: 0.1,
        timeoutForStayingGreenWhenBreakEndedInSeconds: 10,
        port: "COM4",
        baudRate: 115200,
        pomodoroIsAlmostOverMessage: "Pomdoro is almost over",
        pomodoroIsOverMessage: "Pomodoro is over",
        breakIsOverMessage: "Break is over",
        withTrafficLightPlugin: false,
    }
}