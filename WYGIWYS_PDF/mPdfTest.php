<?php
	require "mpdf/mpdf.php";
	function createPdf($html, $name){
		$pdf= new mPDF();
		$pdf->WriteHTML($html);
		$pdf -> Output("$name.pdf");
	}

	if(isset($_POST['html'])){
		createPdf($_POST['html'], $name);
	}
	
?>
