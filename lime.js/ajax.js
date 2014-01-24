/************************************************************************************
This is a simple ajax class implemented with the OOPS in javascript
Version      : 1.0
Developed By : Souparno Majumder 
Copyright    : Go ahead and use this as you wish.  ©2014-2015
************************************************************************************/

/***********************************************************************************
The Argument passed to the SimpleAJAX function is JSON encoded(JAVASCRIPT OBJECT NOTATION)
Parameters: 
Arguments :JSON object to hold the following OBJECT VARIABLE
{
RequestVerb              : 'POST'/'GET'
RequestUrl               : The server side pageurl
Parameters               : The parameters to be supplied to the server
onSuccess                : The method to be called on a successful request complete
onError                  : The method to be called on when the request gets completed with an error
onComplete               : The method to be called when the ajax completes the request
TimeOut                  : Timeout in seconds
}
***********************************************************************************/
function Ajax(Arguments) {


    // Declaring the Instance variables
    var RequestVerb = '';
    var RequestUrl = '';
    var Parameters = '';
    var onSuccess = '';
    var onError = '';
    var onComplete = '';
    var TimeOut = '';
    var RequestState = ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];

    // Initialising the Instance Variables with the parameter values passed to the argument
    if (Arguments.RequestVerb !== undefined) {
        RequestVerb = Arguments.RequestVerb.toUpperCase();
    } if (Arguments.RequestUrl !== undefined) {
        RequestUrl = Arguments.RequestUrl;
    } if (Arguments.Parameters !== undefined) {
        Parameters = Arguments.Parameters;
    } if (Arguments.onSuccess !== undefined) {
        onSuccess = Arguments.onSuccess;
    } if (Arguments.onError !== undefined) {
        onError = Arguments.onError;
    } if (Arguments.onComplete !== undefined) {
        onComplete = Arguments.onComplete;
    }if (Arguments.TimeOut !== undefined) {
        TimeOut = Arguments.TimeOut;
    }

    /****************************************************************
    Constructs a new HTTP Request object.
    ****************************************************************/
    this.MakeNewRequestObject = function () {
        try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {
            try { return new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (e) {
                try { return new XMLHttpRequest(); }
                catch (e) {
                    return null;
                }
            }
        }
    }; //end of the function MakeNewRequestObject

    /****************************************************************
    Here is where the actual call is made to the server.
    *****************************************************************/
    this.SendHTTPRequest = function () {

        var XmlHttpRequestObject = this.MakeNewRequestObject();
        XmlHttpRequestObject.open(RequestVerb, RequestUrl, true);
        XmlHttpRequestObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        XmlHttpRequestObject.setRequestHeader("Pragma", "no-cache");
        XmlHttpRequestObject.setRequestHeader("Cache-Control", "no-cache");

        /****************************************************************
        Assigning The setTimeout function to the  XmlHttpRequestObject
        *****************************************************************/
        var AjaxTimeOut = setTimeout(function () {
            XmlHttpRequestObject.abort();
        }, TimeOut * 1000);

        XmlHttpRequestObject.onreadystatechange = function () { RequestObjectStateChanged(this, AjaxTimeOut); };
        XmlHttpRequestObject.send(encodeURI(Parameters));

    }; // end of the function SendHTTPRequest


    /*********************************************************************************************
    Here is where the onreadystatechange event of the ajaxrequestobject is handled.
    Parameters: 
    XmlHttpRequestObject : The present instance of the XmlHttp object passed to the function
    **********************************************************************************************/
    RequestObjectStateChanged = function (XmlHttpRequestObject, AjaxTimeOut) {
        // Checkinng the state of the httprequest
        switch (RequestState[XmlHttpRequestObject.readyState]) {
            case 'Uninitialized': break;
            case 'Loading'      : break;
            case 'Loaded'       : break;
            case 'Interactive'  : break;
            case 'Complete':
                /*******************************************
                Clears the AjaxTimeOut variable 
                *******************************************/
                clearTimeout(AjaxTimeOut);
                /*******************************************
                Calls the onComplete function if defined 
                *******************************************/
                if (onComplete !== '') { onComplete(); }
                /*******************************************
                Checks if the request status is success and calls the function
                *******************************************/
                if (XmlHttpRequestObject.status === 200) {
                    if (onSuccess !== '') {
                        onSuccess(XmlHttpRequestObject.responseText);
                    }
                } else {
                    if (onError !== '') {
                        onError(XmlHttpRequestObject.status,Parameters);
                    }
                }
                break;
        } // End of the Switch Statement
    }; // End of the function RequstObjectStateChanged

}; // End of the function Ajax()

/*******************************************************************************
SupportsAjax function
Purpose : can be used to check if the browser supports Ajax or not
******************************************************************************/
if (typeof SupportsAjax === 'undefined') {
    function SupportsAjax() {
        if (new AJAX({}).MakeNewRequestObject()) {
            return true;
        }
        return false;
    };
}


