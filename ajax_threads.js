/************************************************************************************
                                 AJAX THREADS

   This is a simple ajax class implemented with the OOPS in javascript
   Acknowledment: Chris Marshall
   Developed By : Souparno Majumder 
   Copyright    : Go ahead and use this as you wish.  ©2014-2015


*************************************************************************************/


function SimpleAJAX() {

   this.MakeNewRequestObject = function MakeNewRequestObject() {
       try { return new ActiveXObject("Msxml2.XMLHTTP"); }
        catch (e) {
            try { return new ActiveXObject("Microsoft.XMLHTTP"); }
            catch (e) {
                try { return new XMLHttpRequest(); }
                catch (e) {
                    return false;
                }
            }
        }
    };


    this.post = function post(Url,Parameter,CallBack,TimeOutCallBack,TimeOut) {
        var XmlHttpRequstObject = this.MakeNewRequestObject();
        XmlHttpRequstObject.open("POST", Url, true);
        XmlHttpRequstObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        XmlHttpRequstObject.onreadystatechange=function(){  new SimpleAJAX().statechanged(this,CallBack);/* The 'this' key refers to the XmlHttpRequstObject */ };
        setTimeout(function(){
                               XmlHttpRequstObject.abort();
                               TimeOutCallBack(Parameter);
                              },TimeOut*1000);
        XmlHttpRequstObject.send(encodeURI(Parameter));

    };

   this.statechanged=function statechanged(XmlHttpRequstObject,CallBack){
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
                if (XmlHttpRequstObject.status === 200) {
                   CallBack(XmlHttpRequstObject.responseText);
                }
                break;
        }
    };
};


