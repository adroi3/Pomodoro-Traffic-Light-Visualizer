export class TrafficLightVisualizerConfiguration {
    public serviceOptions = {
        timeoutForReachingYellowInMilliseconds: 5000,
        timeoutForReachingGreenInMilliseconds: 10000,
        port: "COM4",
        baudRate: 115200,
    }
}