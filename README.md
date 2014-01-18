lime.js
==============

lime.js is a simple ajax class structure designed in javascript.

Ajax options - The Ajax classe constitutes some set of options and callbacks
-----------------------------------------------------------------------------------------------------

Common options
-----------------------------------------------------------------------------------------------------
<ul>
<li>RequestVerb (String): The HTTP method to use for the request(get/post).</li>
<li>RequestUrl  (String): The server page url.</li>
<li>Parameters  (String): The parameters for the request.</li>
<li>TimeOut     (String): The timeout for the request.</li>
</ul>

Common callbacks
----------------------------------------------------------------------------------------------------
<ul>
<li>onSuccess             : Invoked when a request completes and its status code is defined (200).</li>
<li>onComplete            : Triggered at the very end of a request's life-cycle.</li>
<li>TimeOutCallBackMethod : Invoked when a request gets timed out before its lifecycle is complete.</li>
</ul>

Examples:
<b>The folder includes an example of Ajax Queuing/Ajax Threading</b>

