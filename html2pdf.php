<?php
	$pdf;
	require "fpdf/fpdf.php";
	error_reporting(E_ERROR | E_PARSE);
	session_start();


	if(isset($_SESSION['pdfobj'])){
		echo "serialize";
		$pdf= unserialize($_SESSION['pdfobj']);
		/*$pdf=new FPDF();
		$pdf->AddPage();
		$pdf->SetFont('Arial','B',16);
		$pdf->Cell(60,20,"Header", 0);*/
	}
	else{
		$pdf=new FPDF();
		$pdf->AddPage();
		$pdf->SetFont('Arial','B',16);
		$pdf->Cell(60,20,"Header", 0);

	}

	function html2pdf($pdf){
		$pdf->Output("pdf.pdf");
		echo "Output";
	}


	function addElem($pdf){
		$txt=$_POST['txt'];
		$h=$_POST['h'];
		$w=$_POST['w'];
		$border=$_POST['border'];
		$pdf->Cell(60,20,$txt, 0, 1);

		$_SESSION['pdfobj']=serialize($pdf);
	}

	if(isset($_POST['wth'])){
		$wth=$_POST['wth'];
		if($wth == "makePdf"){
			echo "Make Pdf";
			html2pdf($pdf);
		}
		else if($wth=="addElem"){
			echo "addELem";
			addElem($pdf);
		}
	}




?>

