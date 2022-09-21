/*
The LogFormatter is a service that formats the messages before they are output. 
For example, it could add current context information such as the time
*/
export abstract class LogFormatter {
    public format(message: string, ...params: (any | undefined)[]): string {
        const d = new Date()
        return message.concat(
            '-'
                .concat(d.getFullYear().toLocaleString())
                .concat(d.getMonth().toLocaleString())
                .concat(d.getDay().toLocaleString())
        )
    }
}
