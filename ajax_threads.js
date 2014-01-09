
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


    this.post = function post(Url,Parameter,CallBack) {
        var XmlHttpRequstObject = this.MakeNewRequestObject();
        XmlHttpRequstObject.open("POST", Url, true);
        XmlHttpRequstObject.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        XmlHttpRequstObject.onreadystatechange=function(){  new SimpleAJAX().statechanged(this,CallBack);/* The 'this' key refers to the XmlHttpRequstObject */   };
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



/*var abcd=new SimpleAJAX();
abcd.post('server.php','',hello);


function hello(responsetxt){
 alert(responsetxt);
};*/