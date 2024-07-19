import { ProcessLog } from "../dist/index";

// ProcessLog.start({ name: "myProcessName" });
// ProcessLog.myProcessName.log("Starting the process...");
// ProcessLog.myProcessName.end();

ProcessLog.start({ name: "myProcessName" });
ProcessLog.log.myProcessName("Starting the process...");

ProcessLog.log.myProcessName("Starting the process...");

ProcessLog.log.myProcessName("Starting the process...");

ProcessLog.log.myProcessName("Starting the process...");

ProcessLog.log.myProcessName("Starting the process...");
ProcessLog.end.myProcessName();
