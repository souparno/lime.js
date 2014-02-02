/************************************************************************************
This is a simple ajax class implemented with the OOPS in javascript
Version      : 1.0
Developed By : Souparno Majumder 
Copyright    : Go ahead and use this as you wish.  ©2014-2015
************************************************************************************/

/***********************************************************************************
The Argument passed to the constructor of the Ajax Class is JSON encoded(JAVASCRIPT OBJECT NOTATION)
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

(function(){
    this.Class=function(){};
    Class.Create=function(property){
        var _property={};
        for(var p in property)
        { 
            if(p === "init") this.Class=property[p]; 
            else _property[p]=property[p];
        };
        this.Class.prototype=_property;
        return this.Class;
    };
}());


var Ajax=Class.Create({
    
    init:function(Arguments){
    
            // Declaring the Instance variables
            this.RequestVerb = '';
            this.RequestUrl = '';
            this.Parameters = '';
            this.onSuccess = '';
            this.onError = '';
            this.onComplete = '';
            this.TimeOut = '7';
            this.RequestState = ['Uninitialized', 'Loading', 'Loaded', 'Interactive', 'Complete'];
            this.XmlHttpRequestObject=null;
    
            // Initialising the Instance Variables with the parameter values passed to the argument
            if (Arguments.RequestVerb !== undefined) {
                this.RequestVerb = Arguments.RequestVerb.toUpperCase();
            } if (Arguments.RequestUrl !== undefined) {
                this.RequestUrl = Arguments.RequestUrl;
            } if (Arguments.Parameters !== undefined) {
                this.Parameters = Arguments.Parameters;
            } if (Arguments.onSuccess !== undefined) {
                this.onSuccess = Arguments.onSuccess;
            } if (Arguments.onError !== undefined) {
                this.onError = Arguments.onError;
            } if (Arguments.onComplete !== undefined) {
                this.onComplete = Arguments.onComplete;
            }if (Arguments.TimeOut !== undefined) {
                this.TimeOut = Arguments.TimeOut;
            }
            
    },
    
    /****************************************************************
     Creates a new HTTP Request object.
    ****************************************************************/    
    MakeNewRequestObject: function(){
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
    },//end of the function MakeNewRequestObject
    
    
    /****************************************************************
     Here is where the actual call is made to the server.
    *****************************************************************/
    SendHTTPRequest: function () {
       
        var XmlHttpRequestObject = this.MakeNewRequestObject();
        XmlHttpRequestObject.open(this.RequestVerb, this.RequestUrl, true);
        XmlHttpRequestObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        XmlHttpRequestObject.setRequestHeader("Pragma", "no-cache");
        XmlHttpRequestObject.setRequestHeader("Cache-Control", "no-cache");
        
        /****************************************************************
        Assigning The setTimeout function to the  XmlHttpRequestObject
        *****************************************************************/
        var AjaxTimeOut = setTimeout(function () {
            XmlHttpRequestObject.abort();
        }, this.TimeOut * 1000);
        
        var _instance=this;
        XmlHttpRequestObject.onreadystatechange = function () { _instance.RequestObjectStateChanged(this, AjaxTimeOut); };
        XmlHttpRequestObject.send(encodeURI(this.Parameters));

    },// end of the function SendHTTPRequest
     
    /*********************************************************************************************
     Here is where the onreadystatechange event of the ajaxrequestobject is handled.
     Parameters: 
     XmlHttpRequestObject : The present instance of the XmlHttp object passed to the function
    **********************************************************************************************/       
     RequestObjectStateChanged : function (XmlHttpRequestObject, AjaxTimeOut) {
        // Checkinng the state of the httprequest
        switch (this.RequestState[XmlHttpRequestObject.readyState]) {
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
                if (this.onComplete !== '') { this.onComplete(); }
                /*******************************************
                Checks if the request status is success and calls the function
                *******************************************/
                if (XmlHttpRequestObject.status === 200) {
                    if (this.onSuccess !== '') {
                        this.onSuccess(XmlHttpRequestObject.responseText);
                    }
                } else {
                    if (this.onError !== '') {
                        this.onError(XmlHttpRequestObject.status,this.Parameters);
                    }
                }
                break;
        } // End of the Switch Statement
    } // End of the function RequstObjectStateChanged          

});

