const electron = require('electron');
const { Tray } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);
    
    this.mainWindow = mainWindow;
    this.on('click', this.onClick.bind(this));
  }
  
  onClick(event, bounds) {
    if (process.platform !== 'linux'){
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
    } 
  }
  
}

module.exports = TimerTray;