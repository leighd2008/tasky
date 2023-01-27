const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer_tray')

const { app, BrowserWindow, Tray, Menu } = electron;

let mainWindow;
let tray;
let trayMenu;

// process.platform === 'linux' ? trayMenu = Menu.buildFromTemplate([
//     {
//       label: 'Open',
//       click(event, bounds) {
//         //  Click event bounds
//         const { x, y} = electron.screen.getCursorScreenPoint()
        
//         //  Window height and width
//         const { height, width } = mainWindow.getBounds();
//         const yPosition = y;
//         mainWindow.setBounds({
//           x: x -width / 2,
//           y: yPosition,
//           height: height,
//           width: width,
//         })
//         mainWindow.show()}
//     },
//     {
//       label: 'Hide',
//       click() { mainWindow.hide()}
//     }
//   ])
//  : null;

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
      // enableRemote needed for windows
      enableRemoteModule: true,
      backgroundThrottling: false 

    }
  });
  mainWindow.loadURL(`file://${__dirname}/src/index.html`);
  
});

app.on('ready', () => {
  const iconName = process.platform === 'darwin' ? 'iconTemplate.png' : 'windows-icon.png'
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
  
  // process.platform === 'linux' ? tray.setContextMenu(trayMenu) 
    // : null
  
})
