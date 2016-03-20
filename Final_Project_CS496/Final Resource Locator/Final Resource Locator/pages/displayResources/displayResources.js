// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/displayResources/displayResources.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.

            var uname = WinJS.Application.sessionState.userName;
            var city = WinJS.Application.sessionState.city;
            var pagetitle = document.getElementById("pagetitle");
            pagetitle.innerHTML = uname + ', displaying results for ' + city;

            var favePage = document.getElementById("favePage");
            favePage.addEventListener("click", goFave);

            var c = new Windows.Web.Http.HttpClient();
            var headers = c.defaultRequestHeaders;
            headers.userAgent.parseAdd("application/json");
            var complete = "http://golden-bonsai-124817.appspot.com/org/" + city;
            

            c.getAsync(new Windows.Foundation.Uri(complete)).done(function (result) {
                var jsonResult = JSON.parse(result.content.toString());
                var names = new Array();
                var phones = new Array();
                var streets = new Array();
                var cities = new Array();
                var states = new Array();
                var descriptions = new Array();
                var x = 0;
                var y = 0;
                jsonResult.forEach(function (cur, i, arr) {
                    names.push(cur.name);
                    phones.push(cur.phone);
                    cities.push(cur.city);
                    streets.push(cur.street);
                    states.push(cur.state);
                    descriptions.push(cur.description);
                    x++;
                });

                document.getElementById("one").innerHTML = names[0];
                document.getElementById("two").innerHTML = phones[0];
                document.getElementById("three").innerHTML = streets[0];
                document.getElementById("four").innerHTML = cities[0];
                document.getElementById("five").innerHTML = states[0];
                document.getElementById("six").innerHTML = descriptions[0];
                document.getElementById("seven").innerHTML = names[1];
                document.getElementById("eight").innerHTML = phones[1];
                document.getElementById("nine").innerHTML = streets[1];
                document.getElementById("ten").innerHTML = cities[1];
                document.getElementById("eleven").innerHTML = states[1];
                document.getElementById("twelve").innerHTML = descriptions[1];
                document.getElementById("thirteen").innerHTML = names[2];
                document.getElementById("fourteen").innerHTML = phones[2];
                document.getElementById("fifteen").innerHTML = streets[2];
                document.getElementById("sixteen").innerHTML = cities[2];
                document.getElementById("seventeen").innerHTML = states[2];
                document.getElementById("eighteen").innerHTML = descriptions[2];
                document.getElementById("nineteen").innerHTML = names[3];
                document.getElementById("twenty").innerHTML = phones[3];
                document.getElementById("twentyone").innerHTML = streets[3];
                document.getElementById("twentytwo").innerHTML = cities[3];
                document.getElementById("twentythree").innerHTML = states[3];
                document.getElementById("twentyfour").innerHTML = descriptions[3];
                document.getElementById("twentyfive").innerHTML = names[4];
                document.getElementById("twentysix").innerHTML = phones[4];
                document.getElementById("twentyseven").innerHTML = streets[4];
                document.getElementById("twentyeight").innerHTML = cities[4];
                document.getElementById("twentynine").innerHTML = states[4];
                document.getElementById("thirty").innerHTML = descriptions[4];

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

                WinJS.Navigation.navigate("/pages/processLogin/processLogin.html");
            };
        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.
            var uname = WinJS.Application.sessionState.userName;
            var city = WinJS.Application.sessionState.city;
            var pagetitle = document.getElementById("pagetitle");
            pagetitle.innerHTML = uname + ', displaying results for ' + city;
            var org1 = document.getElementById("one");
            var org2 = document.getElementById("seven");
            var org3 = document.getElementById("thirteen");
            var org4 = document.getElementById("nineteen");
            var org5 = document.getElementById("twentyfive");

            org1.addEventListener("click", getFave);
            org2.addEventListener("click", getFave);
            org3.addEventListener("click", getFave);
            org4.addEventListener("click", getFave);
            org5.addEventListener("click", getFave);


            displayResources(city);

            var favePage = document.getElementById("favePage");
            favePage.addEventListener("click", goFave);
        }
    });

    var goFave = function (eventInfo){
        eventInfo.preventDefault();
        WinJS.Navigation.navigate("/pages/processLogin/processLogin.html");
    };

    function getFave(eventInfo) {
        var uname = WinJS.Application.sessionState.userName;

        var c = new Windows.Web.Http.HttpClient();
        var payload = 'username=' + uname + '&faves=' + pword;

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
        
    };
})();
