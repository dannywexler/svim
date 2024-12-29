import { Webview } from "webview-nodejs";

const w = new Webview(true);
w.navigate("http://localhost:4000");
w.show();
