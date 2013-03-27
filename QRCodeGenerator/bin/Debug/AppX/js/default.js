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
                var submit = document.getElementById("submit");
                submit.addEventListener("click", getImage, false);
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

    function getImage(eventInfo) {
        document.getElementById("progressdiv").style.visibility = "visible";
        var qrTextEle=document.getElementById("qrtext");
        var qrText = qrTextEle.textContent.trim();
        if (qrText.length == 0) {
            qrText = "Generate QR Code by Ankur Shah";
            qrTextEle.textContent = qrText;
        }
        document.getElementById("qrimage").src = "";
        var calUrl = "http://qrickit.com/api/qr?d=" + encodeURIComponent(qrText) + "&addtext=Generate+QRCode+by+Ankur+Shah&txtcolor=442EFF&fgdcolor=76103C&bgdcolor=C0F912&qrsize=400&t=p&e=m";
        document.getElementById("qrimage").src = calUrl;
        document.getElementById("logo_image").style.visibility = "visible";
        document.getElementById("progressdiv").style.visibility = "hidden";
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
