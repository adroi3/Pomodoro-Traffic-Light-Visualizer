export class TrafficLightVisualizerConfiguration {
    public serviceOptions = {
        timeoutForReachingYellowInMilliseconds: 1200000,
        timeoutForReachingGreenInMilliseconds: 300000,
        port: "COM4",
        baudRate: 115200,
    }
}