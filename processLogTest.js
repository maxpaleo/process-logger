"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./dist/index");
index_1.ProcessLog.start({ name: "upload", log: true, description: "Uploading files" });
index_1.ProcessLog.upload.log("Uploading file 1");
setTimeout(() => {
    index_1.ProcessLog.upload.log("Uploading file 2");
}, 1000);
setTimeout(() => {
    index_1.ProcessLog.upload.end();
}, 2000);
index_1.ProcessLog.start({
    name: "download",
    log: true,
    description: "Downloading data",
});
index_1.ProcessLog.download.log("Downloading dataset 1");
setTimeout(() => {
    index_1.ProcessLog.download.log("Downloading dataset 2");
}, 1500);
setTimeout(() => {
    index_1.ProcessLog.download.end();
}, 3000);
