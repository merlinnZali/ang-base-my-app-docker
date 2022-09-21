import { LogAppender } from './log-appender'

/*
With the default ConsoleAppender, the name says it all: 
 it writes the messages to the JavaScript console found in the browser's developer tools.
*/
export class LogConsoleAppender extends LogAppender {
    public override append(type: 'DEBUG' | 'INFO' | 'LOG' | 'TRACE' | 'ERROR', message: string): void {
        if (type === 'LOG') {
            console.log(message)
        }
        if (type === 'DEBUG') {
            console.debug(message)
        }
        if (type === 'TRACE') {
            console.trace(message)
        }
        if (type === 'ERROR') {
            console.error(message)
        }
        if (type === 'INFO') {
            console.info(message)
        }
    }
}
