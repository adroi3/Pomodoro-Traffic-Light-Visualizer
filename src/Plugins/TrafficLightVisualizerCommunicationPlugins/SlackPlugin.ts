import * as TrafficLightVisualizerCommunicationPlugins from "../../Api/TrafficLightVisualizerCommunicationPlugins/TrafficLightVisualizerCommunicationPluginsNamespace";
import { SlackOptions } from "./SlackOptions";
import Axios from "axios";
import * as QueryString from "query-string";

export class SlackPlugin implements TrafficLightVisualizerCommunicationPlugins.TrafficLightVisualizerCommunicationPlugin {
    private options: SlackOptions;

    public onPomodoroStarted(): void {
        this.setStatus(this.options.statusText, this.options.statusEmoji);
        this.startSnooze();
    }

    public onPomodoroAlmostOver(): void {
    }

    public onPomodoroOver(): void {
        this.setStatus("", "");
        this.endSnooze();
    }

    public onBreakOver(): void {
    }

    public startsWith(options: SlackOptions): void {
        this.options = options;
    }

    private setStatus(statusText: string, statusEmoji: string): void {
        this.callSlackServiceMethod(
            "https://slack.com/api/users.profile.set",
            {
                token: this.options.token,
                profile: JSON.stringify({
                    "status_text": statusText,
                    "status_emoji": statusEmoji,
                }),
            }
        );
    }

    private startSnooze(): void {
        this.callSlackServiceMethod(
            "https://slack.com/api/dnd.setSnooze",
            {
                token: this.options.token,
                num_minutes: this.options.snoozeTimeInMinutes,
            }
        );
    }

    private endSnooze(): void {
        this.callSlackServiceMethod(
            "https://slack.com/api/dnd.endSnooze",
            {
                token: this.options.token,
            }
        );
    }

    private callSlackServiceMethod(url: string, data: object): void {
        Axios.post(url,
            QueryString.stringify(data), {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            })
            .catch(function (error) {
                console.error("Set Slack status error: %s", error);
            });
    }
}