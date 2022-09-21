/*
The LogAppender is also a service. It determines how the logger logs the messages.
*/
export abstract class LogAppender {
    public append(type: 'DEBUG' | 'INFO' | 'LOG' | 'TRACE' | 'ERROR', message: string): void {}
}
