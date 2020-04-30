
import { Observable } from 'rxjs'
import * as parse from 'csv-parse'

export default <T>(stream: any, config: parse.Options) => {
  return new Observable<T>((subscriber) => {
    parse(stream, config, (err, records) => {
      if (!err) {
        records.forEach(rec => subscriber.next(rec))
      } else {
        subscriber.error(err)
      }
    })
  })
}
