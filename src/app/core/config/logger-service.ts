import { Injectable } from '@angular/core'
import { LogAppender } from './log-appender'
import { LogFormatter } from './log-formatter'
import { LoggerConfig } from './logger-config'

@Injectable({
    providedIn: 'root',
})
export class LoggerService {
    constructor(private config: LoggerConfig, private formatter: LogFormatter, private appender: LogAppender) {}

    debug(message: string): void {
        if (!this.config.enableDebug) return
        message = this.formatter.format(message)
        this.appender.append('DEBUG', message)
    }

    log(message: string): void {
        message = this.formatter.format(message)
        this.appender.append('LOG', message)
    }

    logging(message: string, type: 'DEBUG' | 'INFO' | 'LOG' | 'TRACE' | 'ERROR'): void {
        message = this.formatter.format(message)
        this.appender.append(type, message)
    }
}
