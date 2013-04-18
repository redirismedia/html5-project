// Redirect URLs
var TABLET_URL = "tablet/";
var MOBILE_URL = "mobile/";



// Detect device. Relies on mdetect.js
function detectDevice()
{
	if (DetectIpad() || DetectAndroidTablet()) {
		configureForTablet();
	}
	else if (DetectIphoneOrIpod() || DetectAndroidPhone()) {		
		configureForMobile();	
	} 
}


function configureForTablet()
{
	redirectTo(TABLET_URL);	
}

function configureForMobile()
{
	redirectTo(MOBILE_URL);
}


// Redirects the top of the window
function redirectTo(url)
{
	top.location = url;
}