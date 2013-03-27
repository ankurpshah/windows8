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
                calculateResistor();
                document.getElementById("band1").addEventListener("change", calculateResistor, false);
                document.getElementById("band2").addEventListener("change", calculateResistor, false);
                document.getElementById("band3").addEventListener("change", calculateResistor, false);
                document.getElementById("multiplier").addEventListener("change", calculateResistor, false);
                document.getElementById("tolerance").addEventListener("change", calculateResistor, false);
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

    function calculateResistor(eventInfo) {
        var band1Ele = document.getElementById("band1");
        displayBackgroundColor(band1Ele, band1Ele.selectedIndex);
        var band1Val = band1Ele.value;
        var band2Ele = document.getElementById("band2");
        displayBackgroundColor(band2Ele, band2Ele.selectedIndex);
        var band2Val = band2Ele.value;
        var band3Ele = document.getElementById("band3");
        displayBackgroundColor(band3Ele, band3Ele.selectedIndex);
        var band3Val = band3Ele.value;
        var multiplierEle = document.getElementById("multiplier");
        displayBackgroundColor(multiplierEle, multiplierEle.selectedIndex);
        var multiplierVal = multiplierEle.value;
        var toleranceEle = document.getElementById("tolerance");
        displayToleranceBackgroundColor(toleranceEle, toleranceEle.selectedIndex);
        var toleranceVal = toleranceEle.value;
        if (band1Val == "none" || band2Val == "none" || multiplierVal == "none" || toleranceVal == "none") {
            document.getElementById("result").innerHTML = "Band 1, Band 2, Multiplier & Tolerance is mandatory field.";
        }
        else {
            var resultString = "";
            var bandVal = 0;
            if (band3Val == "none") {
                bandVal = ((Number(band1Val) * 10) + Number(band2Val));
            }
            else {
                bandVal = ((Number(band1Val) * 100) + (Number(band2Val) * 10) + Number(band3Val));
            }
            var finalVal = (bandVal * Number(multiplierVal));
            resultString = finalVal + " ohm, " + toleranceVal;
            document.getElementById("result").innerHTML = resultString;
        }
    }

    function displayBackgroundColor(element, index) {
                   if(index == 1) {
                       element.style.backgroundColor = "black";
                       element.style.color = "white";
                   }
                   else if(index == 2) {
                       element.style.backgroundColor = "brown";
                       element.style.color = "black";
                   }
                   else if(index == 3) {
                       element.style.backgroundColor = "red";
                       element.style.color = "black";
                   }
                   else if(index == 4) {
                       element.style.backgroundColor = "orange";
                       element.style.color = "black";
                   }
                   else if(index == 5) {
                       element.style.backgroundColor = "yellow";
                       element.style.color = "black";
                   }
                   else if(index == 6) {
                       element.style.backgroundColor = "green";
                       element.style.color = "black";
                   }
                   else if(index == 7) {
                       element.style.backgroundColor = "blue";
                       element.style.color = "black";
                   }
                   else if(index == 8) {
                       element.style.backgroundColor = "violet";
                       element.style.color = "black";
                   }
                   else if(index == 9) {
                       element.style.backgroundColor = "grey";
                       element.style.color = "black";
                   }
                   else if(index == 10) {
                       element.style.backgroundColor = "white";
                       element.style.color = "black";
                   }
        
    }

    function displayToleranceBackgroundColor(element, index) {
        if (index == 1) {
            element.style.backgroundColor = "gold";
            element.style.color = "black";
        }
        else if (index == 2) {
            element.style.backgroundColor = "silver";
            element.style.color = "black";
        }
        else if (index == 3) {
            element.style.backgroundColor = "white";
            element.style.color = "black";
        }
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
