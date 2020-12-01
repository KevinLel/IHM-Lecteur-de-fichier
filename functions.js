
function OpenCloseHeader(){
    headerClass = document.getElementById('header').className
    mainClass = document.getElementById("main").className

    if(headerClass == "headerClosed"){
        document.getElementById('header').className = "headerOpened";
    }
    else{
        document.getElementById('header').className = "headerClosed"; 
    }
}

function dispFile(contents) {
  document.getElementById('textContainer').innerHTML=contents.replace(/\r\n/g, '\n')
  countMotParagraphe()
}

function clickElem(elem) {
	var eventMouse = document.createEvent("MouseEvents")
	eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
	elem.dispatchEvent(eventMouse)
}


function openFile(func) {
	readFile = function(e) {
		var file = e.target.files[0];
		if (!file) {
			return;
		}
		var reader = new FileReader();
		reader.onload = function(e) {
			var contents = e.target.result;
			fileInput.func(contents)
			document.body.removeChild(fileInput)
		}
        if (file.type == "text/plain"){
			reader.readAsText(file);
		}else{
			dispFile('Mauvais type de fichier. Merci d\'utilisez un fichier txt.')
		}
		
	}
	fileInput = document.createElement("input")
	fileInput.type='file'
	fileInput.style.display='none'
	fileInput.onchange=readFile
	fileInput.func=func
	document.body.appendChild(fileInput)
	clickElem(fileInput)
}
function countMotParagraphe(){
	var Mytext = document.getElementById("textContainer").innerHTML;
	var nombreMot = getWordCount(Mytext);
	var nombreParagraphe = getLineCount(Mytext);
	document.getElementById("nbMot").innerHTML = " " + nombreParagraphe + " paragraphe, " + nombreMot + " mots";
}
function getWordCount(sentence) {
    return (sentence.match(/\b\S+\b/g) || []).length;
}
function getLineCount(sentence) {
	return (sentence.match(/\n/g) || '').length + 1;
}

function search_text(){
	var element_researched = document.getElementById("SearchedElement").value
	highlight_text(element_researched)
}
function highlight_text(element){
	var text = remove_span(document.getElementById("textContainer").innerHTML);
	if (element != '') {
		var exist = text.split(element).length - 1;
		//document.getElementById("numberWord").innerHTML = exist + " mots trouvé";
		document.getElementById('textContainer').innerHTML=text.replaceAll(element, '<span class="highlight">'+element+'</span>');
	}
}

function remove_span(text){
	var result = text.replaceAll('<span class="highlight">','')
	return result.replaceAll('</span>','');
}
function closeApp(){
    const remote = require('electron').remote
    let w = remote.getCurrentWindow()
    w.close()
}

var Mousetrap = require('mousetrap');
 Mousetrap.bind(['command+o', 'ctrl+o'], function() {
        openFile(dispFile)	
});
var Mousetrap = require('mousetrap');
 Mousetrap.bind(['command+q', 'ctrl+q'], function() {
        closeApp()	
});