const path = require('path');
const electron = require('electron');
const TimerTray = require('./app/timer_tray');
const MainWindow = require('./app/main_window');

const { app, BrowserWindow  } = electron;

let mainWindow;

app.on('ready', () => {
  process.platform === 'darwin' ? app.dock.hide() : null;
  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);
  
});

app.on('ready', () => {
  const iconName = process.platform === 'darwin' ? 'iconTemplate.png' : 'windows-icon.png'
  const iconPath = path.join(__dirname, `./src/assets/${iconName}`);
  tray = new TimerTray(iconPath, mainWindow);
  
})
