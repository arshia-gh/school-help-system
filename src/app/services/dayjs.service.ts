import { Injectable } from "@angular/core";
import * as dayjs from "dayjs";
import * as customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(customParseFormat)

@Injectable({
  providedIn: 'root'
})
export class DayJsService {
  parse(date: string | Date | dayjs.Dayjs, format?: dayjs.OptionType) {
    return dayjs(date, format)
  }
}
