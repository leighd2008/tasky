const electron = require('electron');
const { Tray, app, Menu } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    
    this.mainWindow = mainWindow;
    this.setToolTip('Timer App')
    
    if (process.platform === 'darwin' || process.platform === 'win32') {
      this.on('click', this.onClick);
    } else {
      this.showMenu();
    }
    this.on('right-click', this.onRightClick);
  }
  
  onRightClick = () => {
    const menuTemplate = Menu.buildFromTemplate[
      {
        role: 'quit'
      }
    ];
    this.popUpContextMenu(menuTemplate);
  }
  
  onClick = (event, bounds) => {
    // Click event bounds
    const {x, y } = bounds;
    
    //  Window height and width
    const { height, width } = this.mainWindow.getBounds();
    
    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      const yPosition = process.platform === 'win32' ? y - height : y;
      this.mainWindow.setBounds({
        x: x -width / 2,
        y: yPosition,
        height: height,
        width: width,
      })
      this.mainWindow.show();
    }
  } 
  
  showMenu = () => {
    const mainWindow = this.mainWindow
    const { height, width } = mainWindow.getBounds();
    const trayMenu = Menu.buildFromTemplate([
      {
        label: 'Open',
        click(event, bounds) {
          //  Click event bounds
          const { x, y} = electron.screen.getCursorScreenPoint()
          
          //  Window height and width
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
      },
      {
        role: 'quit'
      }
    ]);
    this.setContextMenu(trayMenu)
  }
  
}

module.exports = TimerTray;