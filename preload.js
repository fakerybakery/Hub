const {
    ipcRenderer,
    shell,
    app
} = require("electron");
const unzipper = require("unzipper");
const exec = require("child_process").exec;
var sudo = require("sudo-prompt");

function execute(command, callback) {
    exec(command, (error, stdout, stderr) => {
        callback(stdout);
    });
}

var request = require("request");
var fs = require("fs");

function downloadFile(file_url, targetPath, percentageInd, done) {
    // Save variable to know progress
    var received_bytes = 0;
    var total_bytes = 0;

    var req = request({
        method: "GET",
        uri: file_url,
    });

    var out = fs.createWriteStream(targetPath);
    req.pipe(out);

    req.on("response", function (data) {
        // Change the total bytes value to get progress later.
        total_bytes = parseInt(data.headers["content-length"]);
    });

    req.on("data", function (chunk) {
        // Update the received bytes
        received_bytes += chunk.length;

        showProgress(received_bytes, total_bytes, percentageInd);
    });

    req.on("end", function () {
        document.getElementById(percentageInd).style.display = "none";
        done();
    });
}

function showProgress(received, total, percentageInd) {
    document.getElementById(percentageInd).style.display = "";
    var percentage = (received * 100) / total;
    document.getElementById(percentageInd).value = percentage;
    console.log(percentage + "% | " + received + " bytes out of " + total + " bytes.");
}

window.addEventListener("DOMContentLoaded", () => {
    // APP VERSION
    document.getElementById('version').innerHTML = ipcRenderer.sendSync('synchronous-message');

    // SLEEPYPIG
    if (fs.existsSync("/Applications/SleepyPig.app")) {
        document.getElementById("sleepypiginstall").innerHTML = "Installed!";
        document.getElementById("sleepypiginstall").disabled = true;
    }
    document.getElementById("sleepypiginstall").addEventListener(
        "click",
        function () {
            document.getElementById("sleepypiginstall").disabled = true;
            document.getElementById("sleepypiginstall").innerHTML = "Installing...";
            downloadFile("https://www.mrfake.name/sleepypig/sleepypig.zip", "/Applications/hub-sleepypig.zip", "spigprog", function () {
                fs.createReadStream("/Applications/hub-sleepypig.zip").pipe(
                    unzipper.Extract({
                        path: "/Applications",
                    })
                );
                setTimeout(function () {
                    console.log("Deleting TMP_FILE");
                    fs.unlinkSync("/Applications/hub-sleepypig.zip");
                    execute("chmod +x /Applications/SleepyPig.app/Contents/MacOS/SleepyPig", (output) => {
                        console.log("Fixing file permissions...");
                        console.log(output);
                    });
                    console.log("Fixing Gatekeeper...");
                    sudo.exec("spctl --add /Applications/SleepyPig.app");
                    document.getElementById("sleepypiginstall").innerHTML = "Installed!";
                }, 2000);
            });
        },
        true
    );
    // SPLASH PRO
    if (fs.existsSync("/Applications/Splash Pro.app")) {
        document.getElementById("splashinstall").innerHTML = "Installed!";
        document.getElementById("splashinstall").disabled = true;
    }
    document.getElementById("splashinstall").addEventListener(
        "click",
        function () {
            document.getElementById("splashinstall").disabled = true;
            document.getElementById("splashinstall").innerHTML = "Installing...";
            downloadFile("https://cdn.lottamo.com/splashpro/splashpro.zip", "/Applications/hub-splashpro.zip", "splashprog", function () {
                fs.createReadStream("/Applications/hub-splashpro.zip").pipe(
                    unzipper.Extract({
                        path: "/Applications",
                    })
                );
                setTimeout(function () {
                    console.log("Deleting TMP_FILE");
                    fs.unlinkSync("/Applications/hub-splashpro.zip");
                    execute('chmod +x "/Applications/Splash Pro.app/Contents/MacOS/Splash Pro"', (output) => {
                        console.log("Fixing file permissions...");
                        console.log(output);
                    });
                    console.log("Fixing Gatekeeper...");
                    sudo.exec('spctl --add "/Applications/Splash Pro.app"');
                    document.getElementById("splashinstall").innerHTML = "Installed!";
                }, 2000);
            });
        },
        true
    );
    // Openr
    document.getElementById("openr").addEventListener("click", function () {
        alert("Installation instructions for Openr will open in your default browser.");
        shell.openExternal("https://www.lottamo.com/openr/");
    });
    // FAST Browser
    if (fs.existsSync("/Applications/FAST Browser.app")) {
        document.getElementById("fastinstall").innerHTML = "Installed!";
        document.getElementById("fastinstall").disabled = true;
    }
    document.getElementById("fastinstall").addEventListener(
        "click",
        function () {
            document.getElementById("fastinstall").disabled = true;
            document.getElementById("fastinstall").innerHTML = "Installing...";
            downloadFile("https://www.mrfake.name/fastbrowse/FAST_Browser_beta-darwin-x64-0.2.1.zip", "/Applications/hub-fast.zip", "fastprog", function () {
                fs.createReadStream("/Applications/hub-fast.zip").pipe(
                    unzipper.Extract({
                        path: "/Applications",
                    })
                );
                setTimeout(function () {
                    console.log("Deleting TMP_FILE");
                    fs.unlinkSync("/Applications/hub-fast.zip");
                    execute('chmod +x "/Applications/FAST Browser.app/Contents/MacOS/FAST Browser"', (output) => {
                        console.log("Fixing file permissions...");
                        console.log(output);
                    });
                    console.log("Fixing Gatekeeper...");
                    sudo.exec('spctl --add "/Applications/FAST Browser.app"');
                    document.getElementById("fastinstall").innerHTML = "Installed!";
                }, 2000);
            });
        },
        true
    );
    // Wikimenu Lite 2.0
    if (fs.existsSync("/Applications/Wikimenu Lite.app")) {
        document.getElementById("wikiinstall").innerHTML = "Installed!";
        document.getElementById("wikiinstall").disabled = true;
    }
    document.getElementById("wikiinstall").addEventListener(
        "click",
        function () {
            document.getElementById("wikiinstall").disabled = true;
            document.getElementById("wikiinstall").innerHTML = "Installing...";
            downloadFile("https://cdn.lottamo.com/wikimenu/wikimenu.zip", "/Applications/hub-wiki.zip", "wikiprog", function () {
                fs.createReadStream("/Applications/hub-wiki.zip").pipe(
                    unzipper.Extract({
                        path: "/Applications",
                    })
                );
                setTimeout(function () {
                    console.log("Deleting TMP_FILE");
                    fs.unlinkSync("/Applications/hub-wiki.zip");
                    execute('chmod +x "/Applications/Wikimenu Lite.app/Contents/MacOS/Wikimenu Lite"', (output) => {
                        console.log("Fixing file permissions...");
                        console.log(output);
                    });
                    console.log("Fixing Gatekeeper...");
                    sudo.exec('spctl --add "/Applications/Wikimenu Lite.app"');
                    document.getElementById("wikiinstall").innerHTML = "Installed!";
                }, 2000);
            });
        },
        true
    );
});
