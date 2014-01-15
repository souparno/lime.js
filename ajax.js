/************************************************************************************
AJAX 

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
CallbackMethod           : The method to be called on a successful request complete
readystateCallBackMethod : This method gets called back every time there is a statechange in the ajax request
                           The parameter passed to the function is the statevalue of the xmlHttpRequest  
TimeOutCallBackMethod    : The method to be called on TimeOut
TimeOut                  : Timeout in seconds
}
***********************************************************************************/
function AJAX(Arguments) {

    // Variable to hold the object that is referring to the class.
    var PresentInstance = this;

    // Declaring the Instance variables
    this.RequestVerb = '';
    this.RequestUrl = '';
    this.Parameters = '';
    this.CallbackMethod = '';
    this.readystateCallBackMethod = '';
    this.TimeOutCallBackMethod = '';
    this.TimeOut ='';

    // Initialising the Instance Variables with the parameter values passed to the argument
    if (Arguments.RequestVerb !== undefined) {
        this.RequestVerb = Arguments.RequestVerb.toUpperCase();
    } if (Arguments.RequestUrl !== undefined) {
        this.RequestUrl = Arguments.RequestUrl;
    } if (Arguments.Parameters !== undefined) {
        this.Parameters = Arguments.Parameters;
    } if (Arguments.CallbackMethod !== undefined) {
        this.CallbackMethod = Arguments.CallbackMethod;
    } if (Arguments.readystateCallBackMethod !== undefined) {
        this.readystateCallBackMethod = Arguments.readystateCallBackMethod;
    } if (Arguments.TimeOutCallBackMethod !== undefined) {
        this.TimeOutCallBackMethod = Arguments.TimeOutCallBackMethod;
    } if (Arguments.TimeOut !== undefined) {
        this.TimeOut = Arguments.TimeOut;
    } 

    /****************************************************************
    Constructs a new HTTP Request object. IE and the rest of the
    world have different ideas about what constitutes an HTTP
    Request class, so we deal with that here.

    Function Return: A new HTTP request object.
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
    };

    /****************************************************************
    Here is where the actual call is made to the server.
    *****************************************************************/
    this.SendHTTPRequest = function () {

        var XmlHttpRequstObject = this.MakeNewRequestObject();
        XmlHttpRequstObject.open(this.RequestVerb, this.RequestUrl, true);
        switch (this.RequestVerb) {
            case 'POST':
                XmlHttpRequstObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                break;
            default:
                break;
        }
        var AjaxTimeOut = setTimeout(function () {
            XmlHttpRequstObject.abort();
            if (PresentInstance.TimeOutCallBackMethod !=='') {
                PresentInstance.TimeOutCallBackMethod(PresentInstance.Parameters);
            }
        }, this.TimeOut * 1000);
        XmlHttpRequstObject.onreadystatechange = function () { PresentInstance.RequstObjectStateChanged(this, AjaxTimeOut); };
        XmlHttpRequstObject.send(encodeURI(this.Parameters));

    };
    /*********************************************************************************************
    Here is where the onreadystatechange event of the ajaxrequestobject is handled.
    Parameters: 
    XmlHttpRequstObject : The present instance of the XmlHttp object passed to the function
    **********************************************************************************************/
    this.RequstObjectStateChanged = function (XmlHttpRequstObject, AjaxTimeOut) {

        // calling the userdefined function for the readystate change of the request object
        if (PresentInstance.readystateCallBackMethod !== '') {
            PresentInstance.readystateCallBackMethod(XmlHttpRequstObject.readyState);
        }
        
        // Checkinng the state of the httprequest
        switch (XmlHttpRequstObject.readyState) {
            case 0: // UNINITIALIZED
                break;
            case 1: // LOADING
                break;
            case 2: // LOADED
                break;
            case 3: // INTERACTIVE
                break;
            case 4: //COMPLETED
                clearTimeout(AjaxTimeOut); // clearTimeOut the ajax time out so that the counter counting the requst time out stops
                if (XmlHttpRequstObject.status === 200) {
                    if (PresentInstance.CallbackMethod !== '') {
                        PresentInstance.CallbackMethod(XmlHttpRequstObject.responseText);
                    }
                }
                break;
        }
    };
};

/*******************************************************************************
SupportsAjax function
Purpose : can be used to check if the browser supports Ajax or not
******************************************************************************/
if (typeof SupportsAjax === 'undefined') {
    function SupportsAjax() {
        if (new AJAX().MakeNewRequestObject()) {
            return true;
        }
        return false;
    };
}
