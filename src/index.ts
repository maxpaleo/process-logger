import chalk from "chalk";

type ProcessMethods = {
  log: (message: string) => void;
  end: () => void;
};

const lines = `----------`;

/**
 * ## ProcessLog
 * A class function for structured logging of processes from start to finish.
 *
 * Features:
 * - Start and end process logging with visibility into the process duration.
 * - Dynamically enable or disable logging for specific processes.
 * - Use colored console output for better readability and distinction.
 *
 * ### Usage:
 *  - Starting a process:
 *   ```typescript
 *   ProcessLog.start({ name: "processName", log: true }); // Start the process by naming it. You can set the log to false to disable logging the process.
 *   ```
 *
 *  - Logging messages within a process:
 *   ```typescript
 *   ProcessLog.processName.log("Message to log");
 *   ```
 *
 *  - Ending a process:
 *   ```typescript
 *   ProcessLog.processName.end();
 *   ```
 * ---
 * ### Examples:
 *   ```typescript
 *   ProcessLog.start({ name: "datasource", log: true }); // Start the process
 *   ProcessLog.datasource.log("Creating data source"); // Log a message
 *   ProcessLog.datasource.log("SUCCESS - Fetched data source template"); // Log another message
 *   ProcessLog.datasource.log("SUCCESS - Fetched data set template");
 *   ProcessLog.datasource.log("Parsed data source template");
 *   ProcessLog.datasource.log("Parsed data set template");
 *   ProcessLog.datasource.end(); // End the process
 *   ```
 * ---
 * ### Example log output:
 * ``` sql
 * ----- START DATASOURCE - Process logger. -----
 * processlog.datasource: Creating data source
 * processlog.datasource: SUCCESS - Fetched data source template
 * processlog.datasource: SUCCESS - Fetched data set template
 * processlog.datasource: Parsed data source template
 * processlog.datasource: Parsed data set template
 * ----- END DATASOURCE - Process logger. Completed in 1.46 seconds. -----
 * ```
 */
export class ProcessLog {
  private static processes: Record<string, ProcessLog> = {};
  private logs: string[] = [];
  private active: boolean = true;
  private startTime: Date = new Date();

  static [name: string]: ProcessMethods | any;

  private constructor(private processName: string) {
    this.startTime = new Date(); // Initialize the start time when the process is created
  }

  /* ---------------------------------- Start --------------------------------- */
  /**
   * Start a new log process by providing its name.
   *
   * ### Example:
   * ```typescript
   * ProcessLog.start({ name: "datasource" });
   * ```
   * ---
   * - Turn off logging for a process:
   * - Set `log` to false
   * ```typescript
   * ProcessLog.start({ name: "datasource", log: false });
   * ```
   * ---
   * - Add an optional description to the process:
   * ```typescript
   * ProcessLog.start({ name: "datasource", description: "Fetches data source templates." });
   * ```
   */
  public static start({
    name,

    log = true,

    description,
  }: {
    /**
     * @param {string} name - The name of the process to start.
     * - This will be used to reference the process in the logs.
     * @example
     * processLog.start({ name: "datasource" });
     */
    name: string;
    /**
     * @param {boolean} log - Set to false to disable logging for the process
     * - When set to false, the process will not log any messages.
     * @default true
     * @example
     * processLog.start({ name: "datasource", log: false });
     */
    log?: boolean;
    /**
     * @param {string} description - A description of the process.
     * - This will be displayed when the process starts.
     * @example
     * processLog.start({ name: "datasource", description: "Fetches data source templates." });
     */
    description?: string;
  }) {
    const process = new ProcessLog(name);
    this.processes[name] = process;
    process.active = log;
    if (log) {
      console.log(
        chalk.green(
          `${lines} START - ${name.toUpperCase()} ${chalk.grey(
            ` - Process logger.`
          )} ${lines}`
        )
      );
      if (description) {
        console.log(chalk.grey(`Description: ${description}`));
      }
    }

    /* --------------- Dynamically creates a property on the class -------------- */
    this[name] = {
      log: (message: string) => process.log(message),
      end: () => process.end(),
    };
  }

  /* ----------------------------------- Log ---------------------------------- */
  private log(message: string) {
    if (this.active) {
      console.log(chalk.blue(`processlog.${this.processName}:`), message);
    }
  }

  /* ----------------------------------- End ---------------------------------- */
  private end() {
    if (this.active) {
      const endTime = new Date();
      const duration = (endTime.getTime() - this.startTime.getTime()) / 1000; // Duration in seconds
      console.log(
        chalk.green(
          `${lines} END - ${this.processName.toUpperCase()} ${chalk.grey(
            ` - Process logger. Completed in ${duration} seconds.`
          )} ${lines}`
        )
      );
    }
    delete ProcessLog[this.processName];
    delete ProcessLog.processes[this.processName];
  }

  public static toggleLogging(name: string, active: boolean) {
    if (this.processes[name]) {
      this.processes[name].active = active;
    }
  }
}
