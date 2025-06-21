package com.revoluxion.delta;

import android.os.Handler;
import android.os.Looper;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.app.Activity;
import android.view.Window;

import com.topjohnwu.superuser.Shell;

import java.util.List;

public class JSBridge {

    private final Handler mainHandler = new Handler(Looper.getMainLooper());
    private final WebView webView;

    public JSBridge(WebView webView) {
        this.webView = webView;
    }

    @JavascriptInterface
    public void runSuCommand(final String id, final String command) {
        new Thread(() -> {
            try {
                List<String> result = Shell.cmd(command).exec().getOut();

                StringBuilder output = new StringBuilder();
                for (String line : result) {
                    output.append(line).append("\n");
                }

                String finalOutput = output.toString()
                        .replace("\\", "\\\\")
                        .replace("\"", "\\\"")
                        .replace("\n", "\\n");

                mainHandler.post(() -> {
                    webView.evaluateJavascript(
                            "window.onSuResult && window.onSuResult(\"" + id + "\", \"" + finalOutput + "\");",
                            null
                    );
                });

            } catch (Exception e) {
                String err = e.getMessage();
                if (err == null) err = "Unknown error";
                final String escapedError = err
                        .replace("\\", "\\\\")
                        .replace("\"", "\\\"")
                        .replace("\n", "\\n");

                mainHandler.post(() -> {
                    webView.evaluateJavascript(
                            "window.onSuResult && window.onSuResult(\"" + id + "\", \"Error: " + escapedError + "\");",
                            null
                    );
                });
            }
        }).start();
    }

    @JavascriptInterface
    public void updateSystemColors(final int color) {
        mainHandler.post(() -> {
            try {
                Window window = ((Activity) webView.getContext()).getWindow();
                window.setStatusBarColor(color);
                window.setNavigationBarColor(color);
            } catch (Exception e) {
                e.printStackTrace();
            }
        });
    }
}
