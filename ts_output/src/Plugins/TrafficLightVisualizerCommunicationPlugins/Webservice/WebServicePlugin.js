"use strict";
exports.__esModule = true;
var Express = require("express");
var BodyParser = require("body-parser");
var WebServicePlugin = /** @class */ (function () {
    function WebServicePlugin() {
    }
    WebServicePlugin.prototype.startsWith = function (options) {
        this.options = options;
    };
    WebServicePlugin.prototype.startServer = function () {
        var _this = this;
        var server = Express();
        var port = process.env.PORT || 5000;
        server.use(BodyParser.json());
        server.use(BodyParser.urlencoded({ extended: true }));
        server.get('/api/startOrStopPomodoro', function (req, res) {
            _this.options.trafficLightVisualizerService.startOrStopPomodoro();
            res.sendStatus(200);
        });
        server.listen(port, function () { return console.log("Express server listening on port " + port); });
    };
    WebServicePlugin.prototype.onPomodoroStarted = function () {
    };
    WebServicePlugin.prototype.onPomodoroAlmostOver = function () {
    };
    WebServicePlugin.prototype.onPomodoroOver = function () {
    };
    WebServicePlugin.prototype.onBreakOver = function () {
    };
    return WebServicePlugin;
}());
exports.WebServicePlugin = WebServicePlugin;
//# sourceMappingURL=WebServicePlugin.js.map