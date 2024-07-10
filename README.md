## ProcessLog

A class function for structured logging of processes from start to finish.
- Useful to log detailed processes in stages during development or debugging.
- You can leave the logs in your code and enable or disable them as needed by setting the log property of each process to true or false.

**Features:**
- Start and end new process logs with a name.
- Easily enable or disable logging for a specific process.
- Clearly logs steps of a process and logs the duration of the process.


### Installation 
  ```bash
    npm i @maxpp/processlogger
  ```

### Import 
  ```typescript
    import { ProcessLog } from "@maxpp/processlogger";
  ```

### Usage

  ```typescript
  ProcessLog.start({ name: "myProcessName" }); // Start the process by naming it.
  ProcessLog.myProcessName.log("Message to log"); // Log a message within the process.
  ProcessLog.myProcessName.end(); // Stop the process and log the duration.
  ```

### Operations
 **`ProcesslLog.start({name: ""})`** Start a new process.
 **`ProcessLog.yourProcess.log()`** Log messages within a process.
 **`ProcessLog.yourProcess.end()`** End a process and log the duration.

### Example
  ```typescript
   ProcessLog.start({ name: "myProcessName", log: true }); // Start the process. Set log to false to disable logging.
   // Your code here
   ProcessLog.myProcessName.log("Creating data source"); // Log a message
   // Your code here
   ProcessLog.myProcessName.log("SUCCESS - Fetched data source template");
   // Your code here
   ProcessLog.myProcessName.log("SUCCESS - Fetched data set template");
    // Your code here
   ProcessLog.myProcessName.log("Parsed data source template");
   // Your code here
   ProcessLog.myProcessName.log("Parsed data set template");
   ProcessLog.myProcessName.end(); // End the process and log the duration
```

### Example output
 ```sql 
 ----- START - MYPROCESSNAME -----
myProcessName: Creating data source
myProcessName: SUCCESS - Fetched data source template
myProcessName: SUCCESS - Fetched data set template
myProcessName: Parsed data source template
myProcessName: Parsed data set template
----- END - MYPROCESSNAME - Completed in 1.46 seconds. -----
  ```

### Example log output
This example shows the process logs of 3 processes that run in sequence. Each process is asigned a random color when it starts which makes it easier to distinguish the logs of each process.
- updated_project_blocks (Blue)
- created_project_validation (Yellow)
- get_content_from_s3 (Pink)
  
<img src="https://github.com/maxpaleo/process-logger/raw/main/media/log-example.png"> 

### Disable a process log
Set the log property to false to disable logging for a specific process. This way you can leave the logs in your code and enable them as needed.
  ```typescript
  ProcessLog.start({ name: "datasource", log: false }); // Set log to false to disable logging.
  ```

### Dependencies
- chalk - For colored console output.