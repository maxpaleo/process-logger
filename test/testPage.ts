import { Log } from "../dist/index";

// Log.start({ name: "myProcessName" });
// Log.myProcessName.log("Starting the process...");
// Log.myProcessName.end();

Log.start({ name: "myProcessName" });
Log.log.myProcessName("Starting the process...");
Log.log.myProcessName("Starting the process...");
Log.log.myProcessName("Starting the process...");
Log.log.myProcessName("Starting the process...");
Log.log.myProcessName("Starting the process...").end();
// Log.end.myProcessName();
