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
                showMetric();
                document.getElementById("method").addEventListener("change", changeMethodHandler, false);
                document.getElementById("weight").addEventListener("change", changeWeightHandler, false);
                document.getElementById("height").addEventListener("change", changeHeightHandler, false);
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

    function changeMethodHandler(eventInfo) {
        var methodVal = document.getElementById("method").value;
        if (methodVal == "english") {
            showEnglish();
        }
        else {
            showMetric();
        }
    }

    function changeWeightHandler(eventInfo) {
        document.getElementById("weighttext").value = eventInfo.target.value;
        var methodVal = document.getElementById("method").value;
        if (methodVal == "english") {
            document.getElementById("result").innerHTML = ("BMI index: " + calcEnglishBMI(document.getElementById("weight").valueAsNumber, document.getElementById("height").valueAsNumber));
        }
        else {
            document.getElementById("result").innerHTML = ("BMI index: " + calcMetricBMI(document.getElementById("weight").valueAsNumber, document.getElementById("height").valueAsNumber));
        }
    }

    function changeHeightHandler(eventInfo) {
        document.getElementById("heighttext").value = eventInfo.target.value;
        var methodVal = document.getElementById("method").value;
        if (methodVal == "english") {
            document.getElementById("result").innerHTML = ("BMI index: " + calcEnglishBMI(document.getElementById("weight").valueAsNumber, document.getElementById("height").valueAsNumber));
        }
        else {
            document.getElementById("result").innerHTML = ("BMI index: " + calcMetricBMI(document.getElementById("weight").valueAsNumber, document.getElementById("height").valueAsNumber));
        }
    }

    function showMetric() {
        document.getElementById("wlabel").innerText = "Weight(kgs):";
        document.getElementById("hlabel").innerText = "Height(centimeters):";
        document.getElementById("height").min = 1;
        document.getElementById("height").max = 300;
        document.getElementById("weight").min = 1;
        document.getElementById("weight").max = 200;
        document.getElementById("height").value = 160;
        document.getElementById("weight").value = 80;
        document.getElementById("result").innerHTML = ("BMI index: " + calcMetricBMI(document.getElementById("weight").valueAsNumber, document.getElementById("height").valueAsNumber));
    }

    function showEnglish() {
        document.getElementById("wlabel").innerText = "Weight(lbs):";
        document.getElementById("hlabel").innerText = "Height(inches):";
        document.getElementById("height").min = 1;
        document.getElementById("height").max = 120;
        document.getElementById("weight").min = 1;
        document.getElementById("weight").max = 400;
        document.getElementById("height").value = 66;
        document.getElementById("weight").value = 180;
        document.getElementById("result").innerHTML = ("BMI index: " + calcEnglishBMI(document.getElementById("weight").valueAsNumber, document.getElementById("height").valueAsNumber));
    }

    function calcMetricBMI(weight, height) {
        return ((weight * 100 * 100) / (height * height)).toFixed(2);
    }

    function calcEnglishBMI(weight, height) {
        return ((weight * 703) / (height * height)).toFixed(2);
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
