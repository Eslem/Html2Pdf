<?php
	require "fpdf.php";

	function holaMundo(){
		$pdf = new FPDF();
		$pdf->AddPage();
		$pdf->SetFont('Arial','B',16);
		$pdf->Cell(60,10,'¡Hola, Mundo!', 1);
		$pdf->Ln();
		$pdf->Cell(60,10,'Hecho con FPDF.',0,1,'C');
		$pdf->Output();
	}

	class PDF extends Fpdf{
		function Header()
		{
			$this->Image('eye.jpg',30,5,30);
			$this->SetFont('Arial','B',15);
			$this->Cell(60);
			$this->Cell(30,10,'Title',0,0,'C');
			$this->Ln(20);
		}

		function Footer()
		{
			$this->SetY(-15);

			$this->SetFont('Arial','I',8);

			$this->Cell(0,10,'Page '.$this->PageNo().'/{nb}',0,0,'C');
		}
	}
	function test2(){
		$pdf = new PDF();
		$pdf->AliasNbPages();
		$pdf->AddPage();
		$pdf->SetFont('Times','',12);
		for($i=1;$i<=40;$i++)
			$pdf->Cell(0,10,'Imprimiendo línea número '.$i,0,1, 'C');
		$pdf->Output();


	}


	class ChapterPdf extends FPDF
	{
		function Header()
		{
			global $title;

			// Arial bold 15
			$this->SetFont('Arial','B',15);
			// Calculamos ancho y posición del título.
			$w = $this->GetStringWidth($title)+6;
			$this->SetX((210-$w)/2);
			// Colores de los bordes, fondo y texto
			$this->SetDrawColor(0,80,180);
			$this->SetFillColor(230,230,0);
			$this->SetTextColor(220,50,50);
			// Ancho del borde (1 mm)
			$this->SetLineWidth(1);
			// Título
			$this->Cell($w,9,$title,1,1,'C',true);
			// Salto de línea
			$this->Ln(10);
		}

		function Footer()
		{
			// Posición a 1,5 cm del final
			$this->SetY(-15);
			// Arial itálica 8
			$this->SetFont('Arial','I',8);
			// Color del texto en gris
			$this->SetTextColor(128);
			// Número de página
			$this->Cell(0,10,'Página '.$this->PageNo(),0,0,'C');
		}

		function ChapterTitle($num, $label)
		{
			// Arial 12
			$this->SetFont('Arial','',12);
			// Color de fondo
			$this->SetFillColor(200,220,255);
			// Título
			$this->Cell(0,6,"Capítulo $num : $label",0,1,'L',true);
			// Salto de línea
			$this->Ln(4);
		}

		function ChapterBody($file)
		{
			// Leemos el fichero
			$txt = file_get_contents($file);
			// Times 12
			$this->SetFont('Times','',12);
			// Imprimimos el texto justificado
			$this->MultiCell(0,5,$txt);
			// Salto de línea
			$this->Ln();
			// Cita en itálica
			$this->SetFont('','I');
			$this->Cell(0,5,'(fin del extracto)');
		}

		function PrintChapter($num, $title, $file)
		{
			$this->AddPage();
			$this->ChapterTitle($num,$title);
			$this->ChapterBody($file);
		}
	}

	function test3(){
		$pdf = new ChapterPdf();
		$title = '20000 Leguas de Viaje Submarino';
		$pdf->SetTitle($title);
		$pdf->SetAuthor('Julio Verne');
		$pdf->PrintChapter(1,'UN RIZO DE HUIDA','20k_c1.txt');
		$pdf->PrintChapter(2,'LOS PROS Y LOS CONTRAS','20k_c2.txt');
		$pdf->Output();
	}
	test3();
?>
