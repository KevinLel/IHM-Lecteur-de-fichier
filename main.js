const { app, BrowserWindow } = require('electron')

var fileTypes = ['txt'];  //acceptable file types


function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
    }
  })

  win.loadFile('index.html')
  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

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
  document.getElementById('textContainer').innerHTML=contents
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
			dispFile('Mauvais type de fichier. Merci d\'utilisez un .txt')
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