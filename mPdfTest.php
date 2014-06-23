<?php
	require "mpdf/mpdf.php";

	$pdf= new mPDF();

	$html=file_get_contents("htmlExternal.html");
	$pdf->WriteHTML($html);
	$pdf -> Output();
	exit;
	
	
	
	function createPdf($html){
	
	}
?>
