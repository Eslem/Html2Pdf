var aspectRatio=1;
var lastHeight=0;
var HeightPdf=0;
var aviso=false;

var defaultWidth=595.2756;
var defaultHeight=841.8898;

var aspect=defaultWidth/defaultHeight;
var pageHeight=($("#pdf").width()/aspect);

$(document).ready(function(){
	loadReady();
});

function loadReady(){
	$("#pdf").children("div").click(function(){
		removeEditable();
		$(this).addClass("editable");
		$(this).attr("contenteditable", "true");
		$(this).focus();
		var position=$(this).position();
		var heght=$(this).height();
		var width=$(this).width();
		var parent=$(this).parent();
		var nameDiv=$(this).attr("name");
		setMenu(position.left,position.top,heght,width);
	});

	detectBlur();

	$(".rtfMenu button").click(function(){
		formatRtf($(this).attr("format"), $("#pdf").closest("[contenteditable=true]"));
	});

	$(".rtfMenu select").on("change", function(){
		var name=$(this).attr("name");
		var value=$(this).val();
		formatRtf(name, $("#pdf").closest("[contenteditable=true]"), value);
	});

	WidthPdf=$("#pdf").width();
	var factor=defaultWidth/WidthPdf;

	//setTextSize(factor);
	lastHeight=HeightPdf;
	setInterval(checkForChanges, 500);
}

function checkForChanges()
{
	var actualHeight=$("#pdf").height();
	var currentLineHeight = $('#pdf').css('line-height');
	var currentLineHeightNum = parseFloat(currentLineHeight, 10);
	
	if(actualHeight > (pageHeight+currentLineHeightNum)){
		$(".hr").css({"top": pageHeight+currentLineHeightNum });
		pageHeight=pageHeight*2;
		console.log(pageHeight);
	}
}

function removeEditable(){
	$("#pdf").children(".editable").each(function(){
		$(this).attr("contenteditable", "false");
		$(this).removeClass("editable");
	});	
}
function setMenu(x, y, h, w){
	x=x+($(window).width()*0.08);
	$(".rtfMenu").css({"left": x, "top": y, "width": w});
	if(!$(".rtfMenu").is(":visible")){
		$(".rtfMenu").slideDown(100);
	}
}
function formatRtf(format, editor){
	var link=null;
	if(format=="insertImage"){
		link=$(".rtfMenu button[format='"+format+"']").parent().find("input").val();
		$(editor).focus();
	}
	if(format=="createlink"){
		link=prompt("link:","http://");
	}
	document.execCommand(format, false, link);
	$(editor).focus();

}
function formatRtf(format, editor, value){
	document.execCommand(format, false, value);
	$(editor).focus();
}

function detectBlur(){
	$(document).mouseup(function (e)
		{
			var container = $("#pdf");
			var menu=$(".rtfMenu");

			if ((!container.is(e.target) // if the target of the click isn't the container...
				&& container.has(e.target).length === 0) && (!menu.is(e.target) // if the target of the click isn't the container...
					&& menu.has(e.target).length === 0)) // ... nor a descendant of the container
			{
				removeEditable();
				$(".rtfMenu").fadeOut();

			}
	});
}


function verPdf(){
	Fit();
	var head='<html>\
	<head>\
	<link rel="stylesheet" type="text/css" href="../bootstrap/css/bootstrap.min.css">\
	<link rel="stylesheet" type="text/css" href="../css/gridSystem.css"></head>\
	<body>';

	var body=$("#pdf").html();
	var html=head+body+'</body></html>';
	var name="pdfTest";
	$.ajax({
		url:"php/createPdf.php",
		data:{
			html:html,
			name:name
		},
		type:"post",
		success: function(){
			window.open('pdf/'+name+'.pdf');
		}
	});
}


function ZoomIn (event) {
	Zoom(1.2);
}

function  ZoomOut (event) {
	Zoom(0.8);
}

function Fit(){
	var toFit=1/aspectRatio;
	Zoom(toFit);
}

function Zoom(percent){

	var newWidth=$('#pdf').width()*percent;
	$('#pdf').width(newWidth);

	var newHeight=$('#pdf').height()*percent;
	$('#pdf').height(newHeight);

	var currentfontsize = $('#pdf').css('font-size');
	var incfontsize = parseFloat(currentfontsize, 10);
	var newsize = incfontsize*percent;
	$("#pdf").css({fontSize : newsize});


	/*$('#pdf :header').each(function(){
	var HeaderSize = $(this).css('font-size');
	var HeaderSizeNum = parseFloat(HeaderSize, 10);
	var newHeaderSize = HeaderSizeNum * percent;
	$(this).css('font-size', newHeaderSize);

	var currentLineHeight = $(this).css('line-height');
	var currentLineHeightNum = parseFloat(currentLineHeight, 10);
	var newLineHeight = currentLineHeightNum* percent;
	$(this).css({"line-height" : newLineHeight+"px"});

	var currentMarginTop = $(this).css('margin-top');
	var currentMarginTopNum = parseFloat(currentMarginTop, 10);
	var newMarginTop = currentMarginTopNum* percent;
	$(this).css({marginTop : newMarginTop+"px"});

	var currentMarginBottom = $(this).css('margin-bottom');
	var currentMarginBottomNum = parseFloat(currentMarginBottom, 10);
	var newMarginBottom = currentMarginBottomNum* percent;
	$(this).css({marginBottom : newMarginBottom+"px"});
	});
	$('#pdf p').each(function(){
	var currentMarginTop = $(this).css('margin-top');
	var currentMarginTopNum = parseFloat(currentMarginTop, 10);
	var newMarginTop = currentMarginTopNum* percent;
	$(this).css({marginTop : newMarginTop+"px"});

	var currentLineHeight = $(this).css('line-height');
	var currentLineHeightNum = parseFloat(currentLineHeight, 10);
	var newLineHeight = currentLineHeightNum* percent;

	var currentMarginBottom = $(this).css('margin-bottom');
	var currentMarginBottomNum = parseFloat(currentMarginBottom, 10);
	var newMarginBottom = currentMarginBottomNum* percent;
	$(this).css({marginBottom : newMarginBottom+"px"});
	});*/

	aspectRatio=aspectRatio*percent;
}


function setTextSize(percent){
	var currentfontsize = $('#pdf').css('font-size');
	var incfontsize = parseFloat(currentfontsize, 10);
	var newsize = incfontsize*percent;
	$("#pdf").css({fontSize : newsize});


	$('#pdf :header').each(function(){
		var HeaderSize = $(this).css('font-size');
		var HeaderSizeNum = parseFloat(HeaderSize, 10);
		var newHeaderSize = HeaderSizeNum * percent;
		$(this).css('font-size', newHeaderSize);

		var currentLineHeight = $(this).css('line-height');
		var currentLineHeightNum = parseFloat(currentLineHeight, 10);
		var newLineHeight = currentLineHeightNum* percent;
		$(this).css({"line-height" : newLineHeight+"px"});

		var currentMarginTop = $(this).css('margin-top');
		var currentMarginTopNum = parseFloat(currentMarginTop, 10);
		var newMarginTop = currentMarginTopNum* percent;
		$(this).css({marginTop : newMarginTop+"px"});

		var currentMarginBottom = $(this).css('margin-bottom');
		var currentMarginBottomNum = parseFloat(currentMarginBottom, 10);
		var newMarginBottom = currentMarginBottomNum* percent;
		$(this).css({marginBottom : newMarginBottom+"px"});
	});
	$('#pdf p').each(function(){
		var currentMarginTop = $(this).css('margin-top');
		var currentMarginTopNum = parseFloat(currentMarginTop, 10);
		var newMarginTop = currentMarginTopNum* percent;
		$(this).css({marginTop : newMarginTop+"px"});

		var currentLineHeight = $(this).css('line-height');
		var currentLineHeightNum = parseFloat(currentLineHeight, 10);
		var newLineHeight = currentLineHeightNum* percent;

		var currentMarginBottom = $(this).css('margin-bottom');
		var currentMarginBottomNum = parseFloat(currentMarginBottom, 10);
		var newMarginBottom = currentMarginBottomNum* percent;
		$(this).css({marginBottom : newMarginBottom+"px"});
	});
}