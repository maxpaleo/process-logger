import { ProcessLog } from "./dist/index";

ProcessLog.start({ name: "upload", log: true, description: "Uploading files" });
ProcessLog.upload.log("Uploading file 1");
setTimeout(() => {
  ProcessLog.upload.log("Uploading file 2");
}, 1000);

setTimeout(() => {
  ProcessLog.upload.end();
}, 2000);

ProcessLog.start({
  name: "download",
  log: true,
  description: "Downloading data",
});
ProcessLog.download.log("Downloading dataset 1");
setTimeout(() => {
  ProcessLog.download.log("Downloading dataset 2");
}, 1500);

setTimeout(() => {
  ProcessLog.download.end();
}, 3000);
