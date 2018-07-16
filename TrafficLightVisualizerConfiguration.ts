export class TrafficLightVisualizerConfiguration {
    public serviceOptions = {
        timeoutForReachingYellowInMilliseconds: 10000,
        timeoutForReachingGreenInMilliseconds: 20000,
        port: "COM4",
        baudRate: 115200,
    }
}