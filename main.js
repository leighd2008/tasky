const path = require('path');
const electron = require('electron');

const { app, BrowserWindow, Tray, Menu } = electron;

let mainWindow;
let tray;
let trayMenu;

process.platform === 'linux' ? trayMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click() { mainWindow.show()}
    },
    {
      label: 'Hide',
      click() { mainWindow.hide()}
    }
  ])
 : null;

app.on('ready', () => {
  mainWindow = new BrowserWindow({
    height: 500,
    width: 300,
    frame: false,
    resizable: false,
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  
});

app.on('ready', () => {
  const iconName = process.platform === 'darwin' ? 'iconTemplate.png' : 'windows-icon.png'
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new Tray(iconPath);
  process.platform === 'linux' ? tray.setContextMenu(trayMenu) 
    : tray.on('click', () => {
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        mainWindow.show();
      }
    });
    
  
  
})
