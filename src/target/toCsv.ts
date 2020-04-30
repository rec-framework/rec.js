import * as stringify from 'csv-stringify'
import { Observer } from 'rxjs'
import { createWriteStream, WriteStream } from 'fs'

class CsvObserver<T> implements Observer<T> {
  filename: string

  stringifier: stringify.Stringifier
  stream: WriteStream

  constructor(filename: string, option?: stringify.Options) {
    this.filename = filename
    this.stringifier = stringify(option)
    this.stream = createWriteStream(this.filename)
    this.stringifier.pipe(this.stream)
  }

  closed?: boolean = false;
  next(value: T) {
    this.stringifier.write(value)
  }

  error(err: any) {
    this.closed = true
    console.error(err)
  }

  complete() {
    this.closed = true
    this.stream.close()
  }
}

export default <T>(filename: string, option?: stringify.Options): Observer<T> => {
  return new CsvObserver<T>(filename, option) as Observer<T>
}
