import { safeLoadAll } from 'js-yaml'
import { readFileSync } from 'fs'
import { join } from 'path'
import * as appPackage from '../package.json'

const config = safeLoadAll(readFileSync(join(__dirname, `${process.env.NODE_ENV}.yaml`), { encoding: 'utf-8', flag: 'r' }))[ 0 ]

export class Env {
  private static instance: Env
  private static config = {
    appVersion: appPackage.version,
    ...config
  }

  private constructor() {}

  public static getInstance() {
    if (!Env.instance) {
      Env.instance = new Env()
    }
    return Env.instance
  }

  public static get(key: string) {
    return Env.config[ key ]
  }
}
