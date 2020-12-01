const { app, BrowserWindow } = require('electron')
var fs = require('fs');

function createWindow () {
  const win = new BrowserWindow({
    width: 720,
    height: 480,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.on('ready', function(){
    createWindow()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

function dispFile(contents) {
  document.getElementById('textContainer').innerHTML=contents
  countMotParagraphe();
  readLast5Search()
  readLast5File()
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
		reader.readAsText(file)
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
  var nombreMot = Mytext.split(' ').length;
  var nombreParagraphe = Mytext.split('\n').length;
  document.getElementById("nbMot").innerHTML = nombreParagraphe + " paragraphe, " + nombreMot + "mots";
}

function closeApp(){
  const remote = require('electron').remote
  let w = remote.getCurrentWindow()
  w.close()
}

function displayMessageBox(){
  const remote = require('electron').remote
  remote.dialog.showMessageBox({
    title: 'Informations',
    message: 'Raccourcis clavier : \n Ctrl + O : ouvrir un fichier \n Ctrl + Q : quitter l\'application',
    buttons: ['Compris']
});
}
function saveFileLast(fileName, path){
  fs.writeFile('MemoryFiles.txt',filename + ":" + path + '\n')
  readLast5File()
}
function saveLastSearch(search){
  fs.writeFile('MemorySearch.txt',search + '\n')
  readLast5Search();
}

function readLast5File(){
  var file = fs.readFile('./MemoryFiles.txt','utf8', function read(err, data){
    if(err){
      throw err;
    }
    content = data;
    search = content.split("\n");
    var listElement = [];
    for(var i=0;i<5;i++){
      listElement.push(search[i]);
    }
    fichierDropDown = document.getElementById('fichierDropdown')
    for(var i=0;i<5;i++){
      if(listElement[i] != null){
        console.log(listElement[i])
        tab = listElement[i].split(":")
        var element = document.createElement("a")
        fichierDropDown.appendChild(element)
        element.className = "dropdown-item";
        element.innerHTML = tab[0];
        elementInner = tab[0]; 
        element.setAttribute('onclick','addValueToInput("' + tab[1] + '")')
      }
    }
  });
  /*file = file.split('\n'); 
  var listElement = "";
  for(var i=0;i<5;i++){
    listElement = listElement + file[i];
  }*/
}
function readLast5Search(){
  var file = fs.readFile('./MemorySearch.txt','utf8', function read(err, data){
    if(err){
      throw err;
    }
    content = data;
    console.log(content); 

    search = content.split("\n");
    var listElement = [];
    for(var i=0;i<5;i++){
      listElement.push(search[i]);
    }
    fichierDropDown = document.getElementById('RechercheDropdown')
    console.log(fichierDropDown)
    for(var i=0;i<5;i++){
      if(listElement[i] != null){
        var element = document.createElement("a")
        fichierDropDown.appendChild(element)
        element.className = "dropdown-item";
        element.innerHTML = listElement[i];
        elementInner = listElement[i]; 
        console.log(listElement[i]);
        element.setAttribute('onclick','highlight_text("' + elementInner + '")')
      }
    }
    //<a class="dropdown-item" href="#">Another action</a>
  });
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
