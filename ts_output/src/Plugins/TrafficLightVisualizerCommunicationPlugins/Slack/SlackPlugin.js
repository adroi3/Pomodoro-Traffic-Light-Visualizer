"use strict";
exports.__esModule = true;
var axios_1 = require("axios");
var QueryString = require("query-string");
var SlackPlugin = /** @class */ (function () {
    function SlackPlugin() {
    }
    SlackPlugin.prototype.onPomodoroStarted = function () {
        this.setStatus(this.options.statusText, this.options.statusEmoji);
        this.startSnooze();
    };
    SlackPlugin.prototype.onPomodoroAlmostOver = function () {
    };
    SlackPlugin.prototype.onPomodoroOver = function () {
        this.setStatus("", "");
        this.endSnooze();
    };
    SlackPlugin.prototype.onBreakOver = function () {
    };
    SlackPlugin.prototype.startsWith = function (options) {
        this.options = options;
    };
    SlackPlugin.prototype.setStatus = function (statusText, statusEmoji) {
        this.callSlackServiceMethod("https://slack.com/api/users.profile.set", {
            token: this.options.token,
            profile: JSON.stringify({
                "status_text": statusText,
                "status_emoji": statusEmoji
            })
        });
    };
    SlackPlugin.prototype.startSnooze = function () {
        this.callSlackServiceMethod("https://slack.com/api/dnd.setSnooze", {
            token: this.options.token,
            num_minutes: this.options.snoozeTimeInMinutes
        });
    };
    SlackPlugin.prototype.endSnooze = function () {
        this.callSlackServiceMethod("https://slack.com/api/dnd.endSnooze", {
            token: this.options.token
        });
    };
    SlackPlugin.prototype.callSlackServiceMethod = function (url, data) {
        axios_1["default"].post(url, QueryString.stringify(data), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        })["catch"](function (error) {
            console.error("Set Slack status error: %s", error);
        });
    };
    return SlackPlugin;
}());
exports.SlackPlugin = SlackPlugin;
//# sourceMappingURL=SlackPlugin.js.map