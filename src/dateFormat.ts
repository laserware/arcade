/* eslint-disable max-params */
// noinspection SpellCheckingInspection

/*
 * Date Format 1.2.3
 * (c) 2007-2009 Steven Levithan <stevenlevithan.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * This code was taken from the [node-dateformat](https://github.com/felixge/node-dateformat)
 * repository on GitHub. The code was refactored to add types and rename
 * variables. It also ensures that dates specified using "date-form" format
 * are offset accordingly (and not treated as ISO unless explicitly specified).
 */
import { isNil } from "./isNil.js";

// Cached regular expressions:
// biome-ignore format:
const REG_EXP_TOKEN = /d{1,4}|D{3,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|W{1,2}|[LlopSZN]|"[^"]*"|'[^']*'/g;

// biome-ignore format:
const REG_EXP_TIMEZONE = /\b(?:[A-Z]{1,3}[A-Z][TC])(?:[-+]\d{4})?|((?:Australian )?(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time)\b/g;

const REG_EXP_TIMEZONE_CLIP = /[^-+\dA-Z]/g;

/**
 * We need to handle the "date-only" form differently when a mask is passed in.
 *
 * From MDN:
 * > When the time zone offset is absent, date-only forms are interpreted as
 * > a UTC time and date-time forms are interpreted as a local time. The
 * > interpretation as a UTC time is due to a historical spec error that
 * > was not consistent with ISO 8601 but could not be changed due to web
 * > compatibility.
 * > See [Broken Parser – A Web Reality Issue](http://archive.today/KdrMv).
 */
// biome-ignore format:
const REG_EXP_DATE_ONLY_FORM = /^(\d.*)[-/]?(\d.*)?[-/]?(\d)$/

// biome-ignore format:
const REG_EXP_DATE_TIME_FORM = /^(?<year>\d{4})[-/]?(?<month>\d{1,2})?[-/]?(?<day>\d{0,2})[Tt\s]*(?<hour>\d{1,2})?:?(?<minute>\d{1,2})?:?(?<second>\d{1,2})?[.:]?(?<millis>\d+)?(?<timezone>.*)$/;

const DEFAULT_MASK = "ddd mmm dd yyyy HH:MM:ss";

/**
 * Internationalization strings.
 */
// biome-ignore format:
const i18n = {
  dayNames: [
    "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
    "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
  ],
  monthNames: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    "January", "February", "March", "April", "May", "June", "July",
    "August", "September", "October", "November", "December",
  ],
  timeNames: ["a", "p", "am", "pm", "A", "P", "AM", "PM"],
};

/**
 * | Mask             | Description                                                                                                                                                   |
 * | ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
 * | `d`              | Day of the month as digits; no leading zero for single-digit days.                                                                                            |
 * | `dd`             | Day of the month as digits; leading zero for single-digit days.                                                                                               |
 * | `ddd`            | Day of the week as a three-letter abbreviation.                                                                                                               |
 * | `DDD`            | "Ysd", "Tdy" or "Tmw" if date lies within these three days. Else fall back to `ddd`.                                                                          |
 * | `dddd`           | Day of the week as its full name.                                                                                                                             |
 * | `DDDD`           | "Yesterday", "Today" or "Tomorrow" if date lies within these three days. Else fall back to `dddd`.                                                            |
 * | `m`              | Month as digits; no leading zero for single-digit months.                                                                                                     |
 * | `mm`             | Month as digits; leading zero for single-digit months.                                                                                                        |
 * | `mmm`            | Month as a three-letter abbreviation.                                                                                                                         |
 * | `mmmm`           | Month as its full name.                                                                                                                                       |
 * | `yy`             | Year as last two digits; leading zero for years less than 10.                                                                                                 |
 * | `yyyy`           | Year represented by four digits.                                                                                                                              |
 * | `h`              | Hours; no leading zero for single-digit hours (12-hour clock).                                                                                                |
 * | `hh`             | Hours; leading zero for single-digit hours (12-hour clock).                                                                                                   |
 * | `H`              | Hours; no leading zero for single-digit hours (24-hour clock).                                                                                                |
 * | `HH`             | Hours; leading zero for single-digit hours (24-hour clock).                                                                                                   |
 * | `M`              | Minutes; no leading zero for single-digit minutes.                                                                                                            |
 * | `MM`             | Minutes; leading zero for single-digit minutes.                                                                                                               |
 * | `N`              | ISO 8601 numeric representation of the day of the week.                                                                                                       |
 * | `o`              | GMT/UTC timezone offset, e.g. -0500 or +0230.                                                                                                                 |
 * | `p`              | GMT/UTC timezone offset, e.g. -05:00 or +02:30.                                                                                                               |
 * | `s`              | Seconds; no leading zero for single-digit seconds.                                                                                                            |
 * | `ss`             | Seconds; leading zero for single-digit seconds.                                                                                                               |
 * | `S`              | The date's ordinal suffix (st, nd, rd, or th). Works well with `d`.                                                                                           |
 * | `l`              | Milliseconds; gives 3 digits.                                                                                                                                 |
 * | `L`              | Milliseconds; gives 2 digits.                                                                                                                                 |
 * | `t`              | Lowercase, single-character time marker string: a or p.                                                                                                       |
 * | `tt`             | Lowercase, two-character time marker string: am or pm.                                                                                                        |
 * | `T`              | Uppercase, single-character time marker string: A or P.                                                                                                       |
 * | `TT`             | Uppercase, two-character time marker string: AM or PM.                                                                                                        |
 * | `W`              | ISO 8601 week number of the year, e.g. 4, 42.                                                                                                                 |
 * | `WW`             | ISO 8601 week number of the year, leading zero for single-digit, e.g. 04, 42                                                                                  |
 * | `Z`              | US timezone abbreviation, e.g. EST or MDT. For non-US timezones, the GMT/UTC offset is returned, e.g. GMT-0500.                                               |
 * | `'...'`, `"..."` | Literal character sequence. Surrounding quotes are removed.                                                                                                   |
 *
 * @category Date
 */
// biome-ignore format:
export type DateFormatMaskOption =
  | "d" | "dd" | "ddd" | "DDD" | "dddd" | "DDDD"
  | "m" | "mm" | "mmm" | "mmmm"
  | "yy" | "yyyy"
  | "h" | "hh" | "H" | "HH"
  | "M" | "MM"
  | "N" | "o" | "p"
  | "s" | "ss" | "S"
  | "l" | "L"
  | "t" | "tt" | "T" | "TT"
  | "W" | "WW"
  | "Z"
  | `'` | `"'"`;

/**
 * Formats the specified `date` using the specified format `mask`.
 *
 * @param date Date to format.
 * @param mask Formatting mask string or {@linkcode DateFormatMaskOption} to apply to date.
 * @param [utc] If true, use UTC time.
 *
 * @returns The formatted date.
 *
 * @category Date
 */
export function dateFormat(
  date: Date | DateFormatMaskOption | number | string,
  mask: DateFormatMaskOption | string,
  utc?: boolean,
): string;

/**
 * Formats the current date using the specified format `mask`.
 *
 * @param mask Formatting mask string or {@linkcode DateFormatMaskOption} to apply to date.
 * @param [utc] Use UTC for the current date.
 *
 * @returns The formatted date.
 *
 * @category Date
 */
export function dateFormat(
  mask: DateFormatMaskOption | string,
  utc?: boolean,
): string;

export function dateFormat(
  dateOrMask: Date | DateFormatMaskOption | number | string,
  maskOrUtc?: DateFormatMaskOption | string | boolean,
  utc?: boolean,
): string {
  const options = getFormatOptions(dateOrMask, maskOrUtc, utc);

  const date = options.date;
  const mask = options.mask;
  utc = options.utc;

  const wrapped = wrapDate(date, utc);

  const d = wrapped.getDate();
  const D = wrapped.getDay();
  const m = wrapped.getMonth();
  const y = wrapped.getFullYear();
  const H = wrapped.getHours();
  const M = wrapped.getMinutes();
  const s = wrapped.getSeconds();
  const L = wrapped.getMillis();
  const o = utc ? 0 : date.getTimezoneOffset();
  const W = getWeek(date);

  // ISO-8601 numeric representation of the day of the week 1 (for Monday)
  // through 7 (for Sunday):
  const N = D === 0 ? 7 : D;

  const utcOffsetPrefix = o > 0 ? "-" : "+";

  const utcOffsetHours = Math.floor(Math.abs(o) / 60);

  const utcOffsetMinutes = Math.floor(Math.abs(o) % 60);

  // biome-ignore format:
  const flags: Record<string, () => string> = {
    d: () => String(d),
    dd: () => pad(d),
    ddd: () => i18n.dayNames[D],
    DDD: () => getDayName(y, m, d, utc, i18n.dayNames[D], true),
    dddd: () => i18n.dayNames[D + 7],
    DDDD: () => getDayName(y, m, d, utc, i18n.dayNames[D + 7], false),
    m: () => String(m + 1),
    mm: () => pad(m + 1),
    mmm: () => i18n.monthNames[m],
    mmmm: () => i18n.monthNames[m + 12],
    yy: () => String(y).slice(2),
    yyyy: () => pad(y, 4),
    h: () => String(H % 12 || 12),
    hh: () => pad(H % 12 || 12),
    H: () => String(H),
    HH: () => pad(H),
    M: () => String(M),
    MM: () => pad(M),
    s: () => String(s),
    ss: () => pad(s),
    l: () => pad(L, 3),
    L: () => pad(Math.floor(L / 10)),
    t: () => (H < 12 ? i18n.timeNames[0] : i18n.timeNames[1]),
    tt: () => (H < 12 ? i18n.timeNames[2] : i18n.timeNames[3]),
    T: () => (H < 12 ? i18n.timeNames[4] : i18n.timeNames[5]),
    TT: () => (H < 12 ? i18n.timeNames[6] : i18n.timeNames[7]),
    Z: () => (utc ? "UTC" : formatTimeZone(date)),
    o: () => utcOffsetPrefix + pad(utcOffsetHours * 100 + (Math.abs(o) % 60), 4),
    p: () => `${utcOffsetPrefix + pad(utcOffsetHours)}:${pad(utcOffsetMinutes)}`,
    S: () => getDaySuffix(d),
    W: () => String(W),
    WW: () => pad(W),
    N: () => String(N),
  };

  return mask.replace(REG_EXP_TOKEN, (match) => {
    if (match in flags) {
      return flags[match as keyof typeof flags]();
    } else {
      return match.slice(1, match.length - 1);
    }
  });
}

type FormatOptions = {
  date: Date;
  mask: string;
  utc: boolean;
};

function getFormatOptions(
  dateOrMask: Date | DateFormatMaskOption | number | string,
  maskOrUtc?: DateFormatMaskOption | string | boolean,
  utc?: boolean,
): FormatOptions {
  const options: FormatOptions = {
    date: new Date(),
    mask: DEFAULT_MASK,
    utc: String(dateOrMask).endsWith("Z"),
  };

  // noinspection SuspiciousTypeOfGuard
  if (typeof dateOrMask === "number" || dateOrMask instanceof Date) {
    options.date = new Date(dateOrMask);
  }

  if (typeof maskOrUtc === "string") {
    options.mask = maskOrUtc;
  }

  if (typeof utc === "boolean") {
    options.utc = utc;

    if (typeof maskOrUtc === "boolean") {
      throw new TypeError("Mask must be a string");
    }
  }

  // If the second argument is a boolean, it's a UTC flag, which means the first
  // argument _must_ be a mask. Throw an error if the first argument isn't a
  // mask:
  if (typeof maskOrUtc === "boolean") {
    options.utc = maskOrUtc;

    if (typeof dateOrMask === "string" && /\d/.test(dateOrMask)) {
      throw new TypeError("Mask cannot contain numbers, only format strings");
    }

    if (typeof dateOrMask !== "string") {
      throw new TypeError("Mask must be a string");
    }
  }

  if (typeof dateOrMask === "string") {
    // If the first argument is a string that doesn't contain any numbers, it's
    // a mask, so we use the current date:
    if (!/\d/.test(dateOrMask)) {
      options.mask = dateOrMask;

      if (options.utc) {
        const date = options.date;

        options.date = new Date(
          Date.UTC(
            date.getUTCFullYear(),
            date.getUTCMonth(),
            date.getUTCDate(),
            date.getUTCHours(),
            date.getUTCMinutes(),
            date.getUTCSeconds(),
            date.getUTCMilliseconds(),
          ),
        );
      } else {
        options.date = new Date();
      }

      return options;
    }

    // If the first argument is a string and is in the short date form, passing
    // it into the Date constructor will parse it as the ISO date, so
    if (REG_EXP_DATE_ONLY_FORM.test(dateOrMask) && !/[T:]/.test(dateOrMask)) {
      const date = new Date(dateOrMask);

      // Need to add the local timezone offset minutes to the time if a date-only
      // form was specified:
      if (!options.utc) {
        date.setMinutes(date.getMinutes() + new Date().getTimezoneOffset());
      }

      options.date = date;

      return options;
    }

    options.date = parseDate(dateOrMask, options.utc);
  }

  return options;
}

function parseDate(value: string, utc: boolean): Date {
  const wrapped = wrapDate(new Date(), utc);

  const result = REG_EXP_DATE_TIME_FORM.exec(value);

  if (result === null || result.groups === undefined) {
    return wrapped.date;
  }

  type ParsedGroup = {
    year?: string;
    month?: string;
    day?: string;
    hour?: string;
    minute?: string;
    second?: string;
    millis?: string;
  };

  const group = result.groups as ParsedGroup;

  let millis = group.millis;
  if (typeof millis === "string") {
    millis = millis.substring(0, 3);
  }

  // We add 1 to the return value of the get month method to ensure we have
  // the month _number_ and not the month _index_.
  const thisMonth = wrapped.getMonth() + 1;

  // Since the date passed in as a string is almost certainly using the month
  // number and not the index, we convert back to an index:
  const monthIndex = (toDatePartField(group.month) ?? thisMonth) - 1;

  // Technically, we should never need to fall back to `getFullYear` here,
  // because the result of the `exec` function from the RegExp above would
  // be `null` if the year was invalid, but we're including this here to catch
  // any weird edge cases I haven't thought of.
  /* istanbul ignore next -- @preserve: We'll probably never have an undefined `group.year` here. */
  const year = toDatePartField(group.year) ?? wrapped.getFullYear();

  type DateParts = [
    /* Year   */ number,
    /* Month  */ number,
    /* Day    */ number | undefined,
    /* Hour   */ number | undefined,
    /* Minute */ number | undefined,
    /* Second */ number | undefined,
    /* Millis */ number | undefined,
  ];

  const parts: DateParts = [
    year,
    monthIndex,
    toDatePartField(group.day),
    toDatePartField(group.hour),
    toDatePartField(group.minute),
    toDatePartField(group.second),
    toDatePartField(millis),
  ];

  return utc ? new Date(Date.UTC(...parts)) : new Date(...parts);
}

function toDatePartField(value?: string): number | undefined {
  if (isNil(value)) {
    return undefined;
  }

  const numeric = Number(value);

  if (Number.isNaN(numeric)) {
    return undefined;
  } else {
    return numeric;
  }
}

function pad(value: unknown, length = 2): string {
  return String(value).padStart(length, "0");
}

/**
 * Gets the suffix of the day based on the date number in the month.
 *
 * @param day Day of month for which to get suffix.
 *
 * @example
 * getDaySuffix(4);
 * // "th" (for 4th)
 *
 * getDaySuffix(3);
 * // "rd" (for 3rd)
 *
 * getDaySuffix(2);
 * // "nd" (for 2nd)
 *
 * getDaySuffix(1);
 * // "st" (for 1st)
 *
 * @internal
 */
function getDaySuffix(day: number): string {
  const suffixes = ["th", "st", "nd", "rd"];

  // Ensure we don't exceed the bounds of the suffixes array:
  if (day % 10 > 3) {
    return suffixes[0];
  }

  const multiplier = (day % 100) - (day % 10) !== 10 ? 1 : 0;

  const index = (multiplier * day) % 10;

  return suffixes[index];
}

/**
 * Gets the day display name in the form of Yesterday, Today, Tomorrow if the
 * date lies within, else falls back to Monday - Sunday.
 */
function getDayName(
  year: number,
  month: number,
  day: number,
  utc: boolean,
  dayName: string,
  short: boolean,
): string {
  const today = wrapDate(new Date(), utc);

  const yesterday = wrapDate(new Date(), utc);
  yesterday.setDate(yesterday.getDate() - 1);

  const tomorrow = wrapDate(new Date(), utc);
  tomorrow.setDate(tomorrow.getDate() + 1);

  if (
    today.getFullYear() === year &&
    today.getMonth() === month &&
    today.getDate() === day
  ) {
    return short ? "Tdy" : "Today";
  }

  if (
    yesterday.getFullYear() === year &&
    yesterday.getMonth() === month &&
    yesterday.getDate() === day
  ) {
    return short ? "Ysd" : "Yesterday";
  }

  if (
    tomorrow.getFullYear() === year &&
    tomorrow.getMonth() === month &&
    tomorrow.getDate() === day
  ) {
    return short ? "Tmw" : "Tomorrow";
  }

  return dayName;
}

/**
 * Calculates the ISO 8601 week number. See [this site](https://weeknumber.com/how-to/javascript)
 * for reference.
 */
function getWeek(date: Date): number {
  // Remove time components of date
  const targetThursday = new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  );

  targetThursday.setHours(0, 0, 0, 0);

  const dayOffset = (targetThursday.getDay() + 6) % 7;

  // Change date to Thursday same week:
  targetThursday.setDate(targetThursday.getDate() - dayOffset + 3);

  // Take January 4th as it is always in week 1 (see ISO 8601):
  const firstThursday = new Date(targetThursday.getFullYear(), 0, 4);

  // Change date to Thursday same week:
  // biome-ignore format:
  firstThursday.setDate(firstThursday.getDate() - ((firstThursday.getDay() + 6) % 7) + 3);

  // Check if daylight-saving-time-switch occurred and correct for it:
  // biome-ignore format:
  const isDST = targetThursday.getTimezoneOffset() - firstThursday.getTimezoneOffset();

  targetThursday.setHours(targetThursday.getHours() - isDST);

  // Number of weeks between target Thursday and first Thursday:
  // biome-ignore format:
  const weekDiff = (targetThursday.getTime() - firstThursday.getTime()) / (86400000 * 7);

  return 1 + Math.floor(weekDiff);
}

/**
 * Get proper timezone abbreviation or timezone offset.
 *
 * This will fall back to `GMT+xxxx` if it does not recognize the
 * timezone within the `timezone` RegEx above. Currently only common
 * American and Australian timezone abbreviations are supported.
 */
function formatTimeZone(date: Date): string {
  const matches = String(date).match(REG_EXP_TIMEZONE) ?? [""];

  const lastElement = matches.pop() ?? "";

  return lastElement
    .replace(REG_EXP_TIMEZONE_CLIP, "")
    .replace(/GMT\+0000/g, "UTC");
}

interface DateWrapper {
  date: Date;
  getDate(): number;
  getDay(): number;
  getMonth(): number;
  getFullYear(): number;
  getHours(): number;
  getMinutes(): number;
  getSeconds(): number;
  getMillis(): number;
  setDate(value: number): number;
}

function wrapDate(date: Date, utc: boolean): DateWrapper {
  if (utc) {
    return {
      date,
      getDate: () => date.getUTCDate(),
      getDay: () => date.getUTCDay(),
      getMonth: () => date.getUTCMonth(),
      getFullYear: () => date.getUTCFullYear(),
      getHours: () => date.getUTCHours(),
      getMinutes: () => date.getUTCMinutes(),
      getSeconds: () => date.getUTCSeconds(),
      getMillis: () => date.getUTCMilliseconds(),
      setDate: (value: number) => date.setUTCDate(value),
    };
  } else {
    return {
      date,
      getDate: () => date.getDate(),
      getDay: () => date.getDay(),
      getMonth: () => date.getMonth(),
      getFullYear: () => date.getFullYear(),
      getHours: () => date.getHours(),
      getMinutes: () => date.getMinutes(),
      getSeconds: () => date.getSeconds(),
      getMillis: () => date.getMilliseconds(),
      setDate: (value: number) => date.setDate(value),
    };
  }
}
