// For an introduction to the Blank template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232509
(function () {
    "use strict";

    WinJS.Binding.optimizeBindingReferences = true;

    var app = WinJS.Application;
    var activation = Windows.ApplicationModel.Activation;

    app.onactivated = function (args) {
        if (args.detail.kind === activation.ActivationKind.launch) {
            if (args.detail.previousExecutionState !== activation.ApplicationExecutionState.terminated) {
                // TODO: This application has been newly launched. Initialize
                // your application here.
            } else {
                // TODO: This application has been reactivated from suspension.
                // Restore application state here.
            }
            args.setPromise(WinJS.UI.processAll().then(function completed() {
                var unit = document.getElementById("a");
                unit.addEventListener("change", unitChangeHandler, false);
                var submit = document.getElementById("submit");
                submit.addEventListener("click", getValue, false);
                var settingsPane = Windows.UI.ApplicationSettings.SettingsPane.getForCurrentView();
                settingsPane.addEventListener("commandsrequested", onCommandsRequested);
            }));
        }
    };

    app.oncheckpoint = function (args) {
        // TODO: This application is about to be suspended. Save any state
        // that needs to persist across suspensions here. You might use the
        // WinJS.Application.sessionState object, which is automatically
        // saved and restored across suspension. If you need to complete an
        // asynchronous operation before your application is suspended, call
        // args.setPromise().
    };

    function unitChangeHandler(eventInfo) {
        document.getElementById("atext").value = eventInfo.target.value;
    }

    function getValue(eventInfo) {
        document.getElementById("progressdiv").style.visibility = "visible";
        var unitVal = document.getElementById("a").valueAsNumber;
        var fromVal = document.getElementById("from").value;
        var toVal = document.getElementById("to").value;
        var calUrl = "http://www.google.com/ig/calculator?hl=en&q=" + unitVal + fromVal + "=?" + toVal;
        WinJS.xhr({
            type: "GET",
            url: calUrl,
            responseType: "json",
        }).then(function (data) {
            var jsonData = (data.responseText).replace("lhs", "\"lhs\"").replace("rhs", "\"rhs\"").replace("error", "\"error\"").replace("icc", "\"icc\"");
            var obj = JSON.parse(jsonData);
            document.getElementById("result").innerHTML = obj.lhs + "=" + obj.rhs;
            document.getElementById("progressdiv").style.visibility = "hidden";
        },
        function (error) {
            console.log(error);
            document.getElementById("progressdiv").style.visibility = "hidden";
        });
    }

    function onSettingsCommand() {
        window.open("http://blog.ankurpshah.in/2013/03/privacy-policy.html");
    }

    function onCommandsRequested(eventArgs) {
        var settingsCommand = new Windows.UI.ApplicationSettings.SettingsCommand("privacyPref", "Privacy Policy", onSettingsCommand);
        eventArgs.request.applicationCommands.append(settingsCommand);
    }

    app.start();
})();
