import * as TrafficLightVisualizerCommunicationPlugins from "../../../Api/TrafficLightVisualizerCommunicationPlugins/TrafficLightVisualizerCommunicationPluginsNamespace";
import { WebServiceOptions } from "./WebServiceOptions";
import * as Express from "express";
import * as BodyParser from "body-parser";

export class WebServicePlugin<TPluginOptions> implements TrafficLightVisualizerCommunicationPlugins.TrafficLightVisualizerCommunicationPlugin {
    
    private options: WebServiceOptions<TPluginOptions>;

    public startsWith(options: WebServiceOptions<TPluginOptions>): void {
        this.options = options;
    }

    public startServer(): void {
        const server = Express();

        const port = process.env.PORT || 5000;

        server.use(BodyParser.json());
        server.use(BodyParser.urlencoded({ extended: true }));

        server.get('/api/startOrStopPomodoro', (req, res) => {

            this.options.trafficLightVisualizerService.startOrStopPomodoro();

            res.sendStatus(200);
        });

        server.listen(port, () => console.log(`Express server listening on port ${port}`));
    }

    public onPomodoroStarted(): void {
    }

    public onPomodoroAlmostOver(): void {
    }

    public onPomodoroOver(): void {
    }

    public onBreakOver(): void {
    }
}