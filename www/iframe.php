<?php
	$soundboardUrl = 'http://59e98dcb55.testurl.ws';
	if(isset($_GET["sid"]) && !empty($_GET["sid"])) {
		$params = $_GET["sid"];
	} else {
		$params = "";
	}
?>
<!DOCTYPE html>
<html>
<head>
	<style>
		html, body {
		   width:100%;
		   height:100%;
		   margin:0px;
		   padding:0px;
		}
	</style>
</head>
<body>

<iframe id="soundboard-iframe"
		width="100%"
        height="100%"
        scrolling="auto"
        frameborder="0" 
        src="<?php print $soundboardUrl;?>/#/p/<?php print $params; ?>">
  			<p>Your browser does not support iframes.</p>
</iframe>
</body>
</html>
