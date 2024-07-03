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
    npm install @maxpp/processlogger
  ```

### Import 
  ```typescript
    import { ProcessLog } from "@maxpp/processlogger";
  ```

### Usage

  **Starting a process: - `ProcesslLog.start()`**
  ```typescript
  ProcessLog.start({ name: "processName" }); // Start the process by naming it. You can set the log to false to disable logging the process.
  ```


  **Log messages within a process: - `ProcessLog.yourProcess.log()`**
  ```typescript
  ProcessLog.processName.log("Message to log"); // Start the process by naming it. You can set the log to false to disable logging the process.
  ```

  **Ending a process: - `ProcessLog.yourProcess.end()`**
  ```typescript
  ProcessLog.processName.end(); // Start the process by naming it. You can set the log to false to disable logging the process.
  ```

### Example
  ```typescript
   ProcessLog.start({ name: "datasource", log: true }); // Start the process. Set log to false to disable logging.
   // Your code here
   ProcessLog.datasource.log("Creating data source"); // Log a message
   // Your code here
   ProcessLog.datasource.log("SUCCESS - Fetched data source template");
   // Your code here
   ProcessLog.datasource.log("SUCCESS - Fetched data set template");
    // Your code here
   ProcessLog.datasource.log("Parsed data source template");
   // Your code here
   ProcessLog.datasource.log("Parsed data set template");
   ProcessLog.datasource.end(); // End the process and log the duration
```

### Example log output
 ```sql 
 ----- START DATASOURCE - Process logger. -----
processlog.datasource: Creating data source
processlog.datasource: SUCCESS - Fetched data source template
processlog.datasource: SUCCESS - Fetched data set template
processlog.datasource: Parsed data source template
processlog.datasource: Parsed data set template
----- END DATASOURCE - Process logger. Completed in 1.46 seconds. -----
  ```

### Disable a process log
Set the log property to false to disable logging for a specific process. This way you can leave the logs in your code and enable them as needed.
  ```typescript
  ProcessLog.start({ name: "datasource", log: false }); // Set log to false to disable logging.
  ```


### Dependencies
- chalk - For colored console output.