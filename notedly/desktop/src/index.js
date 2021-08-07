const { app, BrowserWindow } = require('electron')
const { is } = require('electron-util')
// 未免被垃圾回收，把window声明未一个对象
let window;

// 指定浏览器窗口的细节信息
function createWindow() {
    window = new BrowserWindow({
        window: 800,
        height: 600,
        // 网页功能的设置
        webPreferences: {
            // 是否启用node集成
            nodeIntegration: true
        }
    })

    // 加载 HTML 文件
    window.loadFile('index.html');
    if (is.development) {
        window.webContents.openDevTools();
    }

    //关闭窗口后重置 window 对象
    window.on('closed', () => {
        window = null;
    })
}

// 在 Electorn 准备就绪时创建应用窗口
app.on('ready', createWindow);

// 关闭所有窗口后退出应用
app.on('window-all-closed', () => {
    // 在macOS 中仅当用户明确退出应用时才退出
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    // 在macOS中，点击程序坞中的图标后重新创建窗口
    if (window === null) {
        createWindow()
    }
})