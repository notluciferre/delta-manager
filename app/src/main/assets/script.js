function runCommand() {
    const cmd = document.getElementById('command').value;
    if (!cmd) {
        alert("Please enter a command");
        return;
    }
    const result = window.Android.runSuCommand(cmd);
    document.getElementById('output').textContent = result;
}
