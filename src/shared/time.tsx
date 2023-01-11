/*
  let time = new Time()
  time.format('YYYY-MM-DD')
  time.firstDayOfMonth()
  time.lastDayOfMonth()
  time.firstDayOfYear()
  time.lastDayOfYear()
  time.add(1, 'day')
*/
export class Time {
  readonly date: Date
  constructor(date?: Date | string) {
    if(date === undefined){
      this.date = new Date()
    }else if(typeof date === 'string'){
      this.date = new Date(date)
    }else{
      this.date = date
    }
  }
  getRaw() {
    return this.date
  }
  format(pattern = 'YYYY-MM-DD') {
    // 目前支持的格式有 YYYY MM DD HH mm ss SSS
    const year = this.date.getFullYear()
    const month = this.date.getMonth() + 1
    const day = this.date.getDate()
    const hour = this.date.getHours()
    const minute = this.date.getMinutes()
    const second = this.date.getSeconds()
    const msecond = this.date.getMilliseconds()
    return pattern
      .replace(/YYYY/g, year.toString())
      .replace(/MM/, month.toString().padStart(2, '0'))
      .replace(/DD/, day.toString().padStart(2, '0'))
      .replace(/HH/, hour.toString().padStart(2, '0'))
      .replace(/mm/, minute.toString().padStart(2, '0'))
      .replace(/ss/, second.toString().padStart(2, '0'))
      .replace(/SSS/, msecond.toString().padStart(3, '0'))
  }
  firstDayOfMonth() {
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0))
  }
  lastDayOfMonth() {
    return new Time(new Date(this.date.getFullYear(), this.date.getMonth() + 1, 0, 0, 0))
  }
  firstDayOfYear() {
    return new Time(new Date(this.date.getFullYear(), 0, 1, 0, 0, 0))
  }
  lastDayOfYear() {
    return new Time(new Date(this.date.getFullYear() + 1, 0, 0, 0, 0, 0))
  }
  add(num: number, unit: 'day' | 'month' | 'year' | 'hour' | 'minute' | 'second' | 'millisecond') {
    const date = new Date(this.date.getTime())
    switch (unit) {
      case 'day':
        date.setDate(date.getDate() + num)
        break
      case 'month':
        let d = date.getDate()
        date.setDate(1)
        date.setMonth(date.getMonth() + num)
        let d2 = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
        date.setDate(Math.min(d, d2))
        break
      case 'year':
        date.setFullYear(date.getFullYear() + num)
        break
      case 'hour':
        date.setHours(date.getHours() + num)
        break
      case 'minute':
        date.setMinutes(date.getMinutes() + num)
        break
      case 'second':
        date.setSeconds(date.getSeconds() + num)
        break
      case 'millisecond':
        date.setMilliseconds(date.getMilliseconds() + num)
        break
      default:
        throw new Error('Time.add: unknown unit')
    }
    return new Time(date)
  }
  getTimestamp(){
    return this.date.getTime()
  }
}
