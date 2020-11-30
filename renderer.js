// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.
const { dialog } = require('electron').remote
dialog.showOpenDialog({ properties: ['openFile', 'openFile'] ,
                        filters: [
                            { name: 'Text', extensions: ['txt'] },
                            { name: 'All Files', extensions: ['*'] }
                          ]
                }).then(result => {
                    if(!result.canceled){
                        module.exports = result.filePaths
                    }                 
                }).catch(err => {
                    console.log(err)
                })




