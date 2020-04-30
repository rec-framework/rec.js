
import {readFileSync} from "fs"

import {csv, toCsv} from "../index"

import {map, filter} from "rxjs/operators"

type Hello = {
  name: string
  age: string
  dob: string
}

csv<Hello>(readFileSync('hello.csv'), {
  columns: ['name', 'age', 'dob']
})
.pipe(
  filter(({ age }) => parseInt(age) > 18),
  map(({name, age}) => ( { name, age } ))
).subscribe(toCsv('other.csv'))
