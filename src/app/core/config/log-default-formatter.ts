import { LogFormatter } from './log-formatter'

/*
The DefaultLogFormatter supplied by the library returns the passed message without any changes
*/
export class LogDefaultFormatter extends LogFormatter {
    public override format(message: string, ...params: (any | undefined)[]): string {
        // console.log(params.length); // n
        params.push(9)
        params[0] = 10
        // console.log(params.length); // n+1
        // console.log(params.sort()); // [...]

        const d = new Date()
        return message.concat(
            '-'
                .concat(d.getFullYear().toString())
                .concat(d.getMonth() + 1 + '')
                .concat(d.getDate().toString())
        )
    }
}
