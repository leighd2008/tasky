const path = require('path');
const electron = require('electron');

const { app, BrowserWindow, Tray, Menu } = electron;

let mainWindow;
let tray;
let trayMenu;

process.platform === 'linux' ? trayMenu = Menu.buildFromTemplate([
    {
      label: 'Open',
      click(event, bounds) {
        //  Click event bounds
        const { x, y} = electron.screen.getCursorScreenPoint()
        
        //  Window height and width
        const { height, width } = mainWindow.getBounds();
        const yPosition = y;
        mainWindow.setBounds({
          x: x -width / 2,
          y: yPosition,
          height: height,
          width: width,
        })
        mainWindow.show()}
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
    : tray.on('click', (event, bounds) => {
      // Click event bounds
      const {x, y } = bounds;
      
      //  Window height and width
      const { height, width } = mainWindow.getBounds();
      
      if (mainWindow.isVisible()) {
        mainWindow.hide();
      } else {
        const yPosition = process.platform === 'win32' ? y - height : y;
        mainWindow.setBounds({
          x: x -width / 2,
          y: yPosition,
          height: height,
          width: width,
        })
        mainWindow.show();
      }
    });
    
  
  
})
