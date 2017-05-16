document.addEventListener("deviceready", onDeviceReady, false); 
function onDeviceReady() {
    // Now safe to use the Codova API
 // window.location="http://servertest1.duncansupply.com";
 window.open = cordova.InAppBrowser.open;
 cordova.InAppBrowser.open('https://servertest1.duncansupply.com', '_self', 'location=yes');

    function openAllLinksWithBlankTargetInSystemBrowser() {
        if ( typeof cordova === "undefined" || !cordova.InAppBrowser ) {
            throw new Error("You are trying to run this code for a non-cordova project, " +
                            "or did not install the cordova InAppBrowser plugin");
        }
        
        // Currently (for retrocompatibility reasons) the plugin automagically wrap window.open
        // We don't want the plugin to always be run: we want to call it explicitly when needed
        // See https://issues.apache.org/jira/browse/CB-9573
        delete window.open; // scary, but it just sets back to the default window.open behavior
        var windowOpen = window.open; // Yes it is not deleted !
        
        // Note it does not take a target!
        var systemOpen = function(url, options) {
            // Do not use window.open becaus the InAppBrowser open will not proxy window.open
            // in the future versions of the plugin (see doc) so it is safer to call InAppBrowser.open directly
            cordova.InAppBrowser.open(url,"_system",options);
        };
        
        
        // Handle direct calls like window.open("url","_blank")
        window.open = function(url,target,options) {
            if ( target == "_blank" ) systemOpen(url,options);
            else windowOpen(url,target,options);
        };
        
        // Handle html links like <a href="url" target="_blank">
        // See https://issues.apache.org/jira/browse/CB-6747
        $(document).on('click', 'a[target=_blank]', function(event) {
                       event.preventDefault();
                       systemOpen($(this).attr('href'));
                       });
    }
}
