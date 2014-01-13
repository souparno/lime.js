/************************************************************************************
                                   AJAX 

   This is a simple ajax class implemented with the OOPS in javascript
   Version      : 1.0
   Developed By : Souparno Majumder 
   Copyright    : Go ahead and use this as you wish.  ©2014-2015
 ************************************************************************************/

// The AjaxBusy variable checks to see if any ajax request is taking place
// 0 denotes the ajax is free,1 represents the ajax is busy
// By default the status of the ajax request is 0
var AjaxBusy=0;
/***********************************************************************************
   The Argument passed to the SimpleAJAX function is JSON encoded(JAVASCRIPT OBJECT NOTATION)
	Parameters: 
                Arguments :JSON object to hold the following OBJECT VARIABLE
		{
                    RequestVerb           : 'POST'/'GET',
                    RequestUrl            : The server side pageurl,
                    Parameters            : The parameters to be supplied to the server,
                    CallbackMethod        : The method to be called on a successful request complete,  
                    TimeOutCallBackMethod : The method to be called on TimeOut
                    TimeOut               : Timeout in seconds
                }
 ***********************************************************************************/
function AJAX(Arguments) {
  
  // Variable to hold the object that is referring to the class.
  var PresentInstance=this;
    
  this.RequestVerb           = Arguments.RequestVerb.toUpperCase();
  this.RequestUrl            = Arguments.RequestUrl;
  this.Parameters            = Arguments.Parameters;
  this.CallbackMethod        = Arguments.CallbackMethod;
  this.TimeOutCallBackMethod = Arguments.TimeOutCallBackMethod;
  this.TimeOut               = Arguments.TimeOut;

  
/****************************************************************
	Constructs a new HTTP Request object. IE and the rest of the
	world have different ideas about what constitutes an HTTP
	Request class, so we deal with that here.

	Function Return: A new HTTP request object.
****************************************************************/
   this.MakeNewRequestObject = function() {
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
    this.SendHTTPRequest = function() {
        AjaxBusy=1;// setting the AjaxBusy to true signifies an ajax request is on process
        var XmlHttpRequstObject = this.MakeNewRequestObject();
        XmlHttpRequstObject.open(this.RequestVerb,this.RequestUrl, true);
        switch(this.RequestVerb){
          case 'POST':
           XmlHttpRequstObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
           break;
         default:
	   break;
                }
        var AjaxTimeOut= setTimeout(function(){
                               AjaxBusy=0;// Freeing the AjaxBusy varible
                               XmlHttpRequstObject.abort();
                               PresentInstance.TimeOutCallBackMethod(PresentInstance.Parameters);
                              },this.TimeOut*1000);
        XmlHttpRequstObject.onreadystatechange=function(){ PresentInstance.RequstObjectStateChanged(this,AjaxTimeOut);};
        XmlHttpRequstObject.send(encodeURI(this.Parameters));

    };
/*********************************************************************************************
  Here is where the onreadystatechange event of the ajaxrequestobject is handled.
  Parameters: 
  XmlHttpRequstObject : The present instance of the XmlHttp object passed to the function
**********************************************************************************************/
   this.RequstObjectStateChanged=function(XmlHttpRequstObject,AjaxTimeOut){
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
                AjaxBusy=0;// Freeing the AjaxBusy varible
                if (XmlHttpRequstObject.status === 200) {
                    clearTimeout(AjaxTimeOut);
                    PresentInstance.CallbackMethod(XmlHttpRequstObject.responseText);
                }
                break;
        }
    };
};

/*******************************************************************************
                  SupportsAjax function
 Purpose : can be used to check if the browser supports Ajax or not
 ******************************************************************************/
if (typeof SupportsAjax === 'undefined'){	
	function SupportsAjax ( ) {
		var test_obj = new AJAX({ 
                                          RequestVerb: '',
                                          RequestUrl: '',
                                          Parameters:'',
                                          CallbackMethod:'',
                                          TimeOutCallBackMethod:'',
                                          TimeOut:''
                                        }).MakeNewRequestObject();
		
		if ( test_obj ) {
			test_obj = null;
			return true;
			}
		
		test_obj = null;
		return false;
	};
}
