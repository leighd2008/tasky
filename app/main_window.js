const electron = require('electron');
const { BrowserWindow } = electron;

class MainWindow extends BrowserWindow {
  constructor(url) {
    super({
      height: 500,
      width: 300,
      frame: false,
      resizable: false,
      show: false,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
        // enableRemote needed for windows
        enableRemoteModule: true,
        backgroundThrottling: false,
        skipTaskBar: true
      }
    });
    
    this.loadURL(url);
    this.on('blur', this.onBlur);
  }
  
  onBlur = () => {
    this.hide();
  }
  
}

module.exports = MainWindow;