<?php
	require "mpdf/mpdf.php";
	function createPdf($html, $name){
		$pdf= new mPDF();
		$pdf->WriteHTML($html);
		$pdf -> Output("$name.pdf");
	}

	if(isset($_GET['html'])){
		createPdf($_GET['html'], $_GET['name']);
	}
	
?>
