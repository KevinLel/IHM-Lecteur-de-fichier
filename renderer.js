// file opener with check for type
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




