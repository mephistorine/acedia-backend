import chalk from 'chalk'

export class AceConsole {
  public static error(output: any) {
    console.log(chalk.bold.red(output))
  }

  public static log(output: any) {
    console.log(chalk.bold.bgMagenta.white(output))
  }
}
