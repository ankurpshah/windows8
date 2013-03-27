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
                var basic = document.getElementById("basic");
                basic.addEventListener("change", basicChangeHandler, false);
                var da = document.getElementById("da");
                da.addEventListener("change", daChangeHandler, false);
                var month = document.getElementById("months");
                month.addEventListener("change", monthChangeHandler, false);
                displayDetails();
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

    function basicChangeHandler(eventInfo) {
        var basicText = document.getElementById("basictext");
        basicText.value = eventInfo.target.value;
        displayDetails();
    }

    function daChangeHandler(eventInfo) {
        var daText = document.getElementById("datext");
        daText.value = eventInfo.target.value;
        displayDetails();
    }

    function monthChangeHandler(eventInfo) {
        var monthText = document.getElementById("monthstext");
        monthText.value = eventInfo.target.value;
        displayDetails();
    }

    function displayDetails() {
        var basic = document.getElementById("basic").valueAsNumber;
        var da = document.getElementById("da").valueAsNumber;
        var months = document.getElementById("months").valueAsNumber;
        var numberOfYears = toInteger((months / 12));
        var gratuityVal = (((basic + da) * 15 * numberOfYears) / 26).toFixed(2);
        var resultStr = "Basic Pay : " + basic + " Rs.<br/>Dearness Allowance : " + da + " Rs.<br/>number of years : " + numberOfYears + " years<br/>Gratuity Amount : " + gratuityVal + " Rs.";
        var result = document.getElementById("result");
        result.innerHTML = resultStr;
    }

    function toInteger(number) {
        return Math.round(  // round to nearest integer
			Number(number)    // type cast your input
		);
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
