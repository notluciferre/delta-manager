
const suCallbacks = {};

window.onSuResult = function(id, output) {
    if (suCallbacks[id]) {
        suCallbacks[id](output);
        delete suCallbacks[id]; // hapus callback setelah digunakan (opsional)
    } else {
        console.warn("Tidak ada handler untuk ID:", id);
    }
};

function checkUserInfo(placeholder) {
    suCallbacks[placeholder] = function(output) {
        document.getElementById(placeholder).textContent = output;
    };

    if (window.Android && Android.runSuCommand) {
        Android.runSuCommand(placeholder, `delta --${placeholder}`);
    } else {
        document.getElementById(placeholder).textContent = "Delta not installed yet";
    }
}

function checkDeltaInfo(placeholder) {
    suCallbacks[placeholder] = function(output) {
        if (output.includes("true")) {
            document.getElementById(placeholder).textContent = "Running";
        } else {
            document.getElementById(placeholder).textContent = "Not running";
        }
    };

    if (window.Android && Android.runSuCommand) {
        Android.runSuCommand(placeholder, "pidof delta_daemon && echo true || echo false");
    } else {
        document.getElementById(placeholder).textContent = "Missing Delta-CLI";
    }
}

function checkDeltaVer(placeholder) {
    const modPath = "/data/adb/delta/module.prop";

    suCallbacks[placeholder] = function(output) {
        document.getElementById(placeholder).textContent = output;
    };

    if (window.Android && Android.runSuCommand) {
        Android.runSuCommand(placeholder, `grep '^moduleVersion=' ${modPath} | cut -d= -f2`);
    } else {
        document.getElementById(placeholder).textContent = "Missing Delta-CLI";
    }
}

function rgbToArgbInt(rgb) {
    const match = rgb.match(/\d+/g);
    if (!match || match.length < 3) return 0xFFFFFFFF;
    const [r, g, b] = match.map(Number);
    return (0xFF << 24) | (r << 16) | (g << 8) | b;
}

function syncColors() {
    const bgColor = window.getComputedStyle(document.body).backgroundColor;
    const intColor = rgbToArgbInt(bgColor);
    if (window.Android && window.Android.updateSystemColors) {
        window.Android.updateSystemColors(intColor);
    }
}

window.addEventListener("load", syncColors);

checkDeltaVer("deltaVersion");
checkDeltaInfo("deltaDaemon");

checkUserInfo("currentProfile");
checkUserInfo("magiskVersion");
checkUserInfo("thermalState");
checkUserInfo("deviceModel");
checkUserInfo("kernelVersion");

