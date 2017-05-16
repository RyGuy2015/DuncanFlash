document.addEventListener("deviceready", onDeviceReady, false); 
function onDeviceReady() {
    // Now safe to use the Codova API
 // window.location="http://servertest1.duncansupply.com";
 window.open = cordova.InAppBrowser.open;
 cordova.InAppBrowser.open('https://servertest1.duncansupply.com', '_self', 'location=yes');

}
