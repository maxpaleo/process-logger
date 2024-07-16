## Process Log

A logging function for used to log steps of a process.
- The ideal is to leave the logs in your code and enable or disable them as needed by changing the `log` property in your Log.start() call.
- This is useful to quickly log the flow of a process when developing or debugging, and other developers can easily enable or disable the logs to see the process running.

**Features:**
- Start and end new process logs with a name.
- Easily enable or disable logging for a specific process.
- Clearly logs steps of a process and logs the duration of the process.
- Proces logs are colored for easy identification. The colors are randomly assigned per process, or you can set a specific color per process.

### Installation 
  ```bash
    npm i @maxpp/processlogger
  ```

### Import 
  ```typescript
    import { Log } from "@maxpp/processlogger";
  ```

### Usage

  ```typescript
Log.start({ name: "myProcess", log: true }); // Start the process by naming it and decide if it should log.
Log.log.myProcess("Message to log"); // Log a message within the process.
Log.end.myProcess(); // Stop the process and log the duration.
  ```

### Operations
- `Log.start({name: "myProcess", log: boolean})`: Start a new process and decide if it should log.
- `Log.log.myProcess(message: string)`: Log messages within a process.
- `Log.end.myProcess()`: End a process and log the duration.

### Example
  ```typescript
 Log.start({ name: "myProcess", log: true }); // Start the process. Set log to false to disable logging.
 Log.log.myProcess("Creating data source"); // Log a message
 Log.log.myProcess("SUCCESS - Fetched data source template");
 Log.log.myProcess("Parsed data source template");
 Log.end.myProcess(); // End the process and log the duration
```

### Example output
 ```json 
 ----- START - MYPROCESSNAME -----
myProcess: Creating data source
myProcess: SUCCESS - Fetched data source template /process.ts:12
myProcess: SUCCESS - Fetched data set template /process.ts:12
myProcess: Parsed data source template /process.ts:12
myProcess: Parsed data set template /process.ts:12
----- END - MYPROCESSNAME - Completed in 1.46 seconds. -----
  ```

### Example log output
This example shows the process logs of 5 processes that run in sequence. Each process is asigned a random color when it starts which makes it easier to distinguish the logs of each process.
- `updated_project_blocks` (This operation logged in blue and completed in 0.062 seconds.)
- `created_project_validation` (This operation logged in salmon and did not complete.)
- `update_project_queue` (This operation logged in purple and did not complete.)
- `update_project_s3_files` (This operation logged in fushia and completed in 0.954 seconds.)
- `get_content_from_s`3 (This operation logged in green and completed in 0.494 seconds.)
  
<img src="https://github.com/maxpaleo/process-logger/raw/main/media/log-example.png">

#### Disable a process log
Set the log property to false to disable logging for a specific process. This way you can leave the logs in your code and enable them as needed.
  ```typescript
  Log.start({ name: "datasource", log: false }); // Set log to false to disable logging.
  ```

#### Set a specific color for a process
You can set a specific hex color for a process by passing a color property in the start method. 
  ```typescript
  Log.start({ name: "datasource", log: true, color: "#2a9d8f" }); // Set a specific color for the process.
  ```

### Recommended use
- Add clear operation logs for each of your processes and leave them in your code.
- Once implemented, disabled the operation logs by setting the log property to false.
- During development or debugging, other team members can easily enable the logs to immediately see the process runnign and identify any issues.

### Dependencies
- chalk - For colored console output.