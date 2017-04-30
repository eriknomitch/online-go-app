var electron = require('electron') // http://electron.atom.io/docs/api
const { blockWindowAds, adBlocker } = require('electron-ad-blocker'); 

var path = require('path')
  
const url = "https://online-go.com"

var window = null

// Wait until the app is ready
electron.app.once('ready', function () {
  // Create a new window
  window = new electron.BrowserWindow({
    width: 800,
    height: 600,
    // Don't show the window until it ready, this prevents any white flickering
    show: false,
    icon: path.join(__dirname, 'assets/icons/png/64x64.png'),
    webPreferences: {
      // Disable node integration in remote page
      nodeIntegration: false
    }
  })

 blockWindowAds(window)

  window.loadURL(url)

  // Show window when page is ready
  window.once('ready-to-show', function () {
    window.maximize()
    window.show()

    let contents = window.webContents

    contents.insertCSS(`

      .goban-container .Goban .Goban,
body.dark .MainGobanView.zen {
  background-color: #191919 !important;
}
.MainGobanView .play-controls .game-state {
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 100;
  color: #777;
  
  /*height: 40px;*/
}
.Game.MainGobanView.zen .game-action-buttons {
  /*display: none;*/
}

.leave-zen-mode-button.ogs-zen-mode {
  opacity: 0;
}
.leave-zen-mode-button.ogs-zen-mode:hover {
  opacity: 1;
}
      `);

    console.log(window.webContents) //.executeJavaScript("alert('Hello There!');");
  })


})
