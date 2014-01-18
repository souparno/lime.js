<?php
	/*
		This is an extremely basic server-side file for the AJAX test.
		It allows you to specify a duration (in seconds). This will
		cause the server to pause for that many seconds, emulating a
		busy process, such as a complex relational DB lookup.
	*/
	// This prevents IE from caching the page. VERY annoying problem.
	header ( "Pragma: no-cache" );
	header ( "Cache-Control: no-cache" );
        
        $id = $_POST['id'];
	$delay = 2;
	$t = (time() + (abs ( $delay )));
	while ( time() <= $t ) {};	// Real, REAL basic delay
	
        echo $id;
?>
