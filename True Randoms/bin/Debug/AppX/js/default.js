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
                document.getElementById("randombutton").addEventListener("click", getValue, false);
                document.getElementById("total").addEventListener("change", changeTotalHandler, false);
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

    function changeTotalHandler(eventInfo) {
        document.getElementById("totaltext").value = eventInfo.target.value;
    }

    function getValue(eventInfo) {
        document.getElementById("progressdiv").style.visibility = "visible";
        var minVal=Number(document.getElementById("min").value);
        var maxVal=Number(document.getElementById("max").value);
        var totalVal=Number(document.getElementById("total").value);
        var randomUrl = "http://www.random.org/integers/?num="+totalVal+"&min="+minVal+"&max="+maxVal+"&col=1&base=10&format=plain&rnd=new";
        WinJS.xhr({
            type: "GET",
            url: randomUrl,
            responseType: "text",
        }).then(function (data) {
            document.getElementById("result").innerHTML = "<pre>" + data.responseText + "</pre>";
            document.getElementById("progressdiv").style.visibility = "hidden";
        },
        function (error) {
            console.log(error);
            document.getElementById("result").innerHTML = "<pre>" + error.responseText + "</pre>";
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
