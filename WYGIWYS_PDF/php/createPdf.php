<?php
	require "../mpdf/mpdf.php";
	function createPdf($html, $name){
		$pdf= new mPDF();
		$pdf->WriteHTML($html);
		$pdf -> Output("../pdf/$name.pdf", 'F');
		echo "Succes";
	}

	if(isset($_POST['html'])){
		createPdf($_POST['html'], $_POST['name']);
	}
	
?>
