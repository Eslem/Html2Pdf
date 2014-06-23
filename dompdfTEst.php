<?php
	require_once("dompdf/dompdf_config.inc.php");


	$html =file_get_contents("htmlExternal.html");


	$dompdf = new DOMPDF();
	$dompdf->load_html($html);
	$dompdf->render();
	$dompdf->stream("sample.pdf");
?>