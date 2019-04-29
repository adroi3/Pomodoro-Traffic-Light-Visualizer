export class TrafficLightVisualizerConfiguration {
    public serviceOptions = {
        timeoutForReachingYellowInMinutes: 20,
        timeoutForReachingGreenInMinutes: 5,
        timeoutForReachingEndOfBreakInMinutes: 5,
        timeoutForStayingGreenWhenBreakEndedInSeconds: 10,
        port: "COM4",
        baudRate: 115200,
        pomodoroIsAlmostOverMessage: "Pomdoro is almost over",
        pomodoroIsOverMessage: "Pomodoro is over",
        breakIsOverMessage: "Break is over",
        withTrafficLightPlugin: true,
    }
}