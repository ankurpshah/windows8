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
                var amount = document.getElementById("amount");
                amount.addEventListener("change", showChart, false);
                var rate = document.getElementById("rate");
                rate.addEventListener("change", showChart, false);
                var tenure = document.getElementById("tenure");
                tenure.addEventListener("change", showChart, false);
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

    function showChart(eventInfo) {
        document.getElementById(eventInfo.target.id + "text").value = eventInfo.target.value;
        var balance = document.getElementById("amount").valueAsNumber;
        var rateVal = document.getElementById("rate").valueAsNumber;
        var periods = document.getElementById("tenure").valueAsNumber;
        var monthlyRate = rateVal / (12 * 100);  // 0.065= APR of 6.5% as decimal
        var monthlyPayment = (monthlyRate / (1 - (Math.pow((1 + monthlyRate), -(periods))))) * balance;
        var resultStr = "Amount: " + balance + "<br/>rate: " + rateVal + "<br/>tenure: " + periods + "<br/>Monthly Installment:" + monthlyPayment.toFixed(2);
        document.getElementById("result").innerHTML = resultStr;
        var tableStr = "<table id='charttable'><tr><td>No.</td><td>Interest</td><td>Principle</td><td>Balance</td></tr>";
        for (var i = 0; i < periods; i++) {
            var interestForMonth = balance * monthlyRate;
            var principalForMonth = monthlyPayment - interestForMonth;
            balance -= principalForMonth; // probably should be -= principalForMonth see comments below
            tableStr += "<tr><td>" + (i + 1) + "</td><td>" + interestForMonth.toFixed(2) + "</td><td>" + principalForMonth.toFixed(2) + "</td><td>" + balance.toFixed(2) + "</td></tr>";
        }
        tableStr += "</table>";
        document.getElementById("chart").innerHTML = tableStr;
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
