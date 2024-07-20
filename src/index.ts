import chalk from "chalk";

type ProcessMethods = {
  log: (message: string) => ProcessMethods;
  end: () => void;
};

const lines = `----------`;

/**
 * ### ProcessLog
 * A logging function used to log steps of a process.
 * - The idea is to leave the logs in your code and enable or disable them as needed by enabling or disabling the `log` property in your Log.start() call.
 * - This is useful to quickly log the flow of a process when developing or debugging, and other developers can easily enable or disable the logs to see the process running.
 * ---
 *  Usage
 *   ```typescript
 *   // Start
 *   Log.start({ name: "processName", log: true }); // Start the process by naming it.
 *   ```
 *
 *   ```typescript
 *  // Start
 *   Log.log.processName("Message to log"); // Log a message
 *   ```
 *
 *   ```typescript
 *  // End
 *   Log.end.processName(); // End the process
 *   ```
 * ---
 *  Examples
 *   ```typescript
 *   Log.start({ name: "datasource", log: true }); // Start the process
 *   Log.log.datasource("Creating data source"); // Log a message
 *   Log.log.datasource("SUCCESS - Fetched data source"); // Log another message
 *   Log.log.datasource("Parsed data source template");
 *   Log.end.datasource(); // End the process
 *   ```
 * ---
 *  Example log output
 * ``` json
 * ----- START DATASOURCE - Process logger. -----
 * datasource: Creating data source
 * datasource: SUCCESS - Fetched data source /page.tsx:12
 * datasource: Parsed data source template /page.tsx:12
 * ----- END DATASOURCE - Process logger. Completed in 1.46 seconds. -----
 * ```
 *  ---
 * Options for Log.start()
 * - `name`: The name of the process to start.
 * - `description`: A description of the process.
 * - `log`: Set to false to disable logging for the process.
 * - `color`: A custom color for the process.
 *
 */
export class Log {
  private static processes: Record<string, Log> = {};
  private logs: string[] = [];
  private active: boolean = true;
  private startTime: Date = new Date();
  private color: chalk.Chalk;

  private static colors = [
    chalk.magenta,
    chalk.cyan,
    chalk.hex("#FC814A"),
    chalk.hex("#072AC8"),
    chalk.hex("#FCF300"),
    chalk.hex("#8367C7"),
    chalk.hex("#36827F"),
    chalk.hex("#D6A99A"),
  ];

  // static log: Record<string, (message: any) => void> = {};
  static log: Record<string, (message: any) => ProcessMethods> = {};
  static end: Record<string, () => void> = {};

  private constructor(private processName: string, color: chalk.Chalk) {
    this.startTime = new Date();
    this.color = color;
  }

  /**
   * Start a new process log.
   * - `name` Add a name to the process. This will be used to reference the logs in the process.
   * - `log` You can enable or disable logging for the process by setting the `log` property to true or false.
   * - `description` You can add a description to the process.
   * - `color` You can set a specific color for the process.
   * ---
   * Example
   * ```typescript
   * Log.start({ name: "myProcess"});
   * ```
   *  ---
   * Additional options: `log`, `description`, `color`
   * Example
   * ```typescript
   * Log.start({ name: "myProcess", log: true, description: "Fetches data source templates.", color: "#2a9d8f" });
   * ```
   */
  public static start({
    name = "process",
    log = true,
    description,
    color,
  }: {
    name: string;
    log?: boolean;
    description?: string;
    color?: string;
  }) {
    let processColor: chalk.Chalk;

    if (color) {
      // Determine if the color is a string (hex code) or already a chalk color instance
      if (typeof color === "string") {
        processColor = chalk.hex(color);
      } else {
        processColor = color;
      }
    } else {
      // Select a random color if no custom color is provided
      const colorIndex = Math.floor(Math.random() * this.colors.length);
      processColor = this.colors[colorIndex];
    }

    const process = new Log(name, processColor);
    this.processes[name] = process;
    process.active = log;

    if (log) {
      console.log(
        processColor(
          chalk.green.bold(`${lines} START -`),
          name,
          chalk.green.bold(`${lines}`),
          chalk.grey(`- Process logger.`)
        )
      );
      if (description) {
        console.log(chalk.grey(`Description: ${description}`));
      }
    }

    this.log[name] = (message: string) => process.log(message);
    this.end[name] = () => process.end();
  }

  private log(message: any): ProcessMethods {
    if (this.active) {
      const stack = new Error().stack || "";
      const callerLine = stack.split("\n")[3];
      const fileLineMatch = callerLine.match(
        /at (?:.* \()?([^ ]+):(\d+):\d+\)?$/
      );
      const pathSegments = fileLineMatch
        ? fileLineMatch[1].split("/")
        : ["unknown file"];
      const fileName = pathSegments.pop();
      const lineNumber = fileLineMatch ? fileLineMatch[2] : "unknown line";
      console.log(
        this.color(`• ${this.processName} - `),
        message,
        chalk.grey(`/${fileName}:${lineNumber}`)
      );
    }

    return {
      log: this.log.bind(this),
      end: this.end.bind(this),
    };
  }

  /**
   * End the process and log the duration.
   * @example
   * Log.end.myProcess();
   */
  private end() {
    if (this.active) {
      const endTime = new Date();
      const duration = (endTime.getTime() - this.startTime.getTime()) / 1000;

      console.log(
        chalk.green.bold(`${lines} END -`),
        this.color(this.processName),
        chalk.green.bold(`${lines}`),
        chalk.grey(`- Completed in ${duration} seconds.`)
      );
    }
    delete Log.log[this.processName];
    delete Log.end[this.processName];
    delete Log.processes[this.processName];
  }
}
