// For an introduction to the Page Control template, see the following documentation:
// http://go.microsoft.com/fwlink/?LinkId=232511
(function () {
    "use strict";

    WinJS.UI.Pages.define("/pages/resourceListing/resourceListing.html", {
        // This function is called whenever a user navigates to this page. It
        // populates the page elements with the app's data.
        ready: function (element, options) {
            // TODO: Initialize the page here.
            var citySelect = document.getElementById("submit2");
            var idLocation = document.getElementById("idLocation");
            var pagetitle = document.getElementById("pagetitle");
            var uname = WinJS.Application.sessionState.userName;
            pagetitle.innerHTML = uname + " please enter your city";


            citySelect.addEventListener("click", setCity);
            idLocation.addEventListener("click", idLoc);
           

        },

        unload: function () {
            // TODO: Respond to navigations away from this page.
        },

        updateLayout: function (element) {
            /// <param name="element" domElement="true" />

            // TODO: Respond to changes in layout.

            var citySelect = document.getElementById("submit2");
            citySelect.addEventListener("click", setCity);

            var idLocation = document.getElementById("idLocation");
            idLocation.addEventListener("click", idLoc);
        }
    });

    var setCity = function (eventInfo) {
        var city = document.getElementById("city").value;
        WinJS.Application.sessionState.city = city;

        eventInfo.preventDefault();
        WinJS.Navigation.navigate("/pages/displayResources/displayResources.html");
    };

    var idLoc = function (eventInfo) {
        
        var geoLoc = new Windows.Devices.Geolocation.Geolocator();

        geoLoc.getGeopositionAsync().then(function (position) {
            var latitude = position.coordinate.point.position.latitude;
            var longitude = position.coordinate.point.position.longitude;

            getZip(latitude, longitude);
            
        });

        eventInfo.preventDefault();
        WinJS.Navigation.navigate("/pages/processLogin/processLogin.html");
    };

    function getZip(latitude, longitude){

        var c = new Windows.Web.Http.HttpClient();
        var headers = c.defaultRequestHeaders;
        headers.userAgent.parseAdd("application/json");

        var theLocation = 'http://dev.virtualearth.net/REST/v1/Locations/' + latitude + ',' + longitude + '?includeEntityTypes=Postcode1&key=AnBRw6yE09lwYWBzdlYhbfo_EF6T8Qpfk7oc7v9nXRwXBCAChmG3ThaFRJeGh83G';

        c.getAsync(new Windows.Foundation.Uri(theLocation)).done(function (result) {
            var jsonString = JSON.parse(result.content.toString());
            var city = jsonString.resourceSets[0].resources[0].address.locality;

            WinJS.Application.sessionState.city = city;

            WinJS.Navigation.navigate("/pages/displayResources/displayResources.html");

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
            eventInfo.preventDefault();
            WinJS.Navigation.navigate("/pages/processLogin/processLogin.html");
    };

        
    };

})();
