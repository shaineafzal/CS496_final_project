// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/newAccount/newAccount.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.

        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
           var dataselect = document.getElementById("submit");

            dataselect.addEventListener("click", signUp);
        }
    });

    var signUp = function (eventInfo) {

        var uname = document.getElementById("username").value;
        var pword = document.getElementById("password").value;

        var c = new Windows.Web.Http.HttpClient();
        var payload = 'username=' + uname + '&password=' + pword;

        c.postAsync(new Windows.Foundation.Uri("http://golden-bonsai-124817.appspot.com/users"), Windows.Web.Http.HttpStringContent(payload, Windows.Storage.Streams.UnicodeEncoding.utf8, 'application/x-www-form-urlencoded')).done(function (result) {
 
            if (result.isSuccessStatusCode == true) {
                WinJS.Application.sessionState.userName = uname;
                WinJS.Navigation.navigate("/pages/resourceListing/resourceListing.html");
            }
            else {
                WinJS.Navigation.navigate("/pages/newAccount/newAccount.html");
                var invalidChoice = document.getElementById("invalidChoice");
                invalidChoice.innerHTML = "Unable to create account";
            }
            
        }, onError);

        function onError(reason) {
            var errorStatus = reason.number;
            if (errorStatus === INET_E_RESOURCE_NOT_FOUND ||
                errorStatus === INET_E_CANNOT_CONNECT) {
                console.log("Cannot connect to the server");
            }
            else {
                console.log("Failed to connect: " + errorStatus);
            };

        };

        eventInfo.preventDefault();
        WinJS.Navigation.navigate("/pages/processLogin/processLogin.html");
    };
})();
