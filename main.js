const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer_tray')

const { app, BrowserWindow  } = electron;

let mainWindow;

app.on('ready', () => {
  process.platform === 'darwin' ? app.dock.hide() : null;
  mainWindow = new BrowserWindow({
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
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  mainWindow.on('blur', () => {
    mainWindow.hide();
  });
  
});

app.on('ready', () => {
  const iconName = process.platform === 'darwin' ? 'iconTemplate.png' : 'windows-icon.png'
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
  
})
