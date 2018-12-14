import * as TrafficLightVisualizerCommunicationPlugins from "../../Api/TrafficLightVisualizerCommunicationPlugins/TrafficLightVisualizerCommunicationPluginsNamespace";
import { SlackOptions } from "./SlackOptions";
import Axios from "axios";
import * as QueryString from "query-string";

export class SlackPlugin implements TrafficLightVisualizerCommunicationPlugins.TrafficLightVisualizerCommunicationPlugin<SlackOptions> {
    private options: SlackOptions;

    onPomodoroStarted(): void {
        throw new Error("Method not implemented.");
    }
    
    onPomodoroAlmostOver(): void {
        throw new Error("Method not implemented.");
    }

    onPomodoroOver(): void {
        throw new Error("Method not implemented.");
    }

    startsWith(options: SlackOptions): void {
        this.options = options;

        Axios.post("https://slack.com/api/users.profile.set",
        QueryString.stringify({
            token: this.options.token,
            profile: JSON.stringify({
                "status_text": "Pomodoro",
                "status_emoji": ":tomato:"
            })
        }), {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }).then(function(response) {
            console.log("Set Slack status API response: %j", response.data);
        })
        .catch(function(error) {
            console.error("Set Slack status error: %s", error);
});
    }


}