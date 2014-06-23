
function loadReadyRtf(){
	$(".rtfMenu button").click(function(){
		formatRtf($(this).attr("format"), $(this).closest(".editorDiv").children(".editorInput"));
	});
	
	$(".rtfMenu select").on("change", function(){
		var name=$(this).attr("name");
		var value=$(this).val();
		formatRtf(name, $(this).closest(".editorDiv").children(".editorInput"), value);
	});
}

function remplaceTextArea(){
	$(".rtfEditor").each(function(){
		var position=$(this).position();
		var heght=$(this).height();
		var width=$(this).width();
		var parent=$(this).parent();
		//createDiv(position.left,position.top,heght,width, this);
		//$(this).hide();
		createMenu(position.left,position.top,heght,width, $(this).attr("name"))
	});
}
function createMenu(x, y, h, w, name){
	var div='<div class="rtfMenu horizontal" name="Menu_'+name+'" style="width:'+w+'px;">	<ul>';
		div +='<li><button><span class="glyphicon glyphicon-font"></span></button><ul class="b">	<li><button format="bold"><span class="glyphicon glyphicon-bold"></span></button></li><li><button format="italic"><span class="glyphicon glyphicon-italic"></span></button></li><li><button format="underline"><i class="fa fa-underline"></i></button></li><li><button format="strikethrough"><i class="fa fa-strikethrough"></i></button></li></ul></li>';
	div +='<li><button><i class="fa fa-edit"></i></button><ul class="font">';
	div +='<li><i class="fa fa-font"></i><select name="fontname"><option class="heading" selected>- font -</option>	<option>Arial</option><option>Arial Black</option><option>Courier New</option></select></li>';
	div +='<li><i class="fa fa-text-height"></i><select name="fontsize"><option class="heading" selected>- size -</option>					<option value="1">Very small</option>					<option value="2">A bit small</option>					<option value="3">Normal</option>					<option value="4">Medium-large</option>					<option value="5">Big</option>					<option value="6">Very big</option>					<option value="7">Maximum</option>	</select></li>';
	div +='<li><i class="fa fa-tint"></i><select name="forecolor"><option class="heading" selected value="black">- color(default) -</option>					<option value="red">Red</option>					<option value="blue">Blue</option>					<option value="green">Green</option>					<option value="black">Black</option></select></li>';
	div +='<li><i class="fa fa-adjust"></i><select name="backcolor"><option class="heading" value="white" selected>- background(default) -</option>					<option value="red">Red</option>					<option value="green">Green</option>					<option value="black">Black</option></select></li>';

	div+='</ul></li>';
	div +='<li><button  format="justifycenter"><span class="glyphicon glyphicon-align-center"></span></button><ul class="align" ><li><button format="justifyleft"><span class="glyphicon glyphicon-align-left"></span></button></li><li><button format="justifyFull"><span class="glyphicon glyphicon-align-justify"></span></button></li><li><button format="justifyright"><span class="glyphicon glyphicon-align-right"></span></button></li>';
	div +='<li><button format="indent"><i class="fa fa-indent"></i></button></li><li><button format="outdent"><i class="fa fa-outdent"></i></button></li></ul></li>';
	div +='<li><button format="insertUnOrderedList"><span class="glyphicon glyphicon-list"></span></button><ul class="list"><li><button format="insertOrderedList"><i class="fa fa-list-ol"></i></button></li></ul></li>';
	div +='<li><button><span class="glyphicon glyphicon-picture"></span></button><ul class="image"><li><input type="text"><button format="insertImage"><span class="glyphicon glyphicon-paperclip"></span></button></li></ul></li>';
	/*/div +='<li><button id="linkB"><span class="glyphicon glyphicon-link"></span></button><ul class="image link"><li><input type="text" id="link"><button format="createlink"><span class="glyphicon glyphicon-link"></span></button></li></ul></li>';*/
	div +='<li><button format="createlink"><span class="glyphicon glyphicon-link"></span></button></li>';
	div +='<li><button><span class="glyphicon glyphicon-wrench"></span></button><ul class="tools"><li><button format="copy"><i class="fa fa-copy"></i></li><li><button format="paste"><i class="fa fa-paste"></i></li><li><button format="undo"><i class="fa fa-undo"></i></li><li><button format="redo"><i class="fa fa-repeat"></i></li><li><button><i class="fa fa-code"></i></button></li><li><select name="formatblock"><option selected>- formatting -</option>					<option value="h1">Title 1 &lt;h1&gt;</option>					<option value="h2">Title 2 &lt;h2&gt;</option>					<option value="h3">Title 3 &lt;h3&gt;</option>					<option value="h4">Title 4 &lt;h4&gt;</option>					<option value="h5">Title 5 &lt;h5&gt;</option>					<option value="h6">Subtitle &lt;h6&gt;</option>					<option value="p">Paragraph &lt;p&gt;</option>					<option value="pre">Preformatted &lt;pre&gt;</option></select></li></ul></li>';
	div +='</ul></div>';

	var widthB=$("div[name='div_"+name+"'] ul li button").width();
	var parent=$("div[name='div_"+name+"']");
	$(div).appendTo("div[name='div_"+name+"']");
	setPosition(parent, x, y)
}

function setPosition(parent, x, y){
	var menu=parent.children(".rtfMenu");
	parent=parent.children(".editorInput");
	if(menu.hasClass("horizontal")){
		if(y<100){
			y=y+parent.height();
			menu.addClass("down");
		}
		else{
			y=y-menu.height();
		}
	}
	else{
		if(x<95){
			var x=x+parent.width();
			menu.addClass("right");
			var ending_right= $(window).width() - parent.width();

		}else{
			var x=x-menu.width();
		}

	}
	$(menu).css({"left": x, "top": y});
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