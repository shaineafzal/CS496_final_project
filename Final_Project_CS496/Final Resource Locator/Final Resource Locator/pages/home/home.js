(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/home/home.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.

        ready: function (element, options) {
            var s = Windows.UI.ViewManagement.StatusBar.getForCurrentView();
            s.showAsync(); // shows the statusbar
            var dataselect = document.getElementById("submit");
            var newUser = document.getElementById("newUser");
            var roamingSettings = Windows.Storage.ApplicationData.current.roamingSettings;

            dataselect.addEventListener("click", getem);
            newUser.addEventListener("click", createNew);
        }



    });
    var getem = function (eventInfo) {
        var userName = document.getElementById("username").value;
        var passWord = document.getElementById("password").value;

        // Save the session data. 
        WinJS.Application.sessionState.userName = userName;
        WinJS.Application.sessionState.passWord = passWord;
        
        var c = new Windows.Web.Http.HttpClient();
        var headers = c.defaultRequestHeaders;
        headers.userAgent.parseAdd("application/json");
        var complete = "http://golden-bonsai-124817.appspot.com/users/" +userName + "/" + passWord;

        c.getAsync(new Windows.Foundation.Uri(complete)).done(function (result) {
            var jsonResult = JSON.parse(result.content.toString());
            var key = jsonResult.key[0];

            if (key == 1) {
                
                WinJS.Navigation.navigate("/pages/resourceListing/resourceListing.html");
            };
            if (key != 1) {
                WinJS.Navigation.navigate("/pages/home/home.html");
                var incorrectPass = document.getElementById("incorrectPass");
                incorrectPass.innerHTML = "Incorrect Password. Please try again, or create an account";
            };
            
        }, onError);

            function onError(reason) {
                var errorStatus = reason.number;
                if (errorStatus === INET_E_RESOURCE_NOT_FOUND ||
                    errorStatus === INET_E_CANNOT_CONNECT) {
                    console.log("Cannot connect to the server");
                }
                else {
                    console.log("Failed to connect: " + errorStatus);
                }
            };

        eventInfo.preventDefault();
        WinJS.Navigation.navigate("/pages/processLogin/processLogin.html");
    };

    var createNew = function (eventInfo) {
        eventInfo.preventDefault();
        WinJS.Navigation.navigate("/pages/newAccount/newAccount.html");
    };


})();
