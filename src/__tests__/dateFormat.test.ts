import { dateFormat } from "../dateFormat.js";

const dates = {
  monday: new Date(2024, 11, 16),
  tuesday: new Date(2024, 11, 17),
  wednesday: new Date(2024, 11, 18),
  thursday: new Date(2024, 11, 19),
  friday: new Date(2024, 11, 20),
  saturday: new Date(2024, 11, 21),
  sunday: new Date(2024, 11, 22),
};

// noinspection SpellCheckingInspection
const ALPHABET = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

describe("the dateFormat function", () => {
  it.each([
    { dayOfWeek: 1, date: dates.monday },
    { dayOfWeek: 2, date: dates.tuesday },
    { dayOfWeek: 3, date: dates.wednesday },
    { dayOfWeek: 4, date: dates.thursday },
    { dayOfWeek: 5, date: dates.friday },
    { dayOfWeek: 6, date: dates.saturday },
    { dayOfWeek: 7, date: dates.sunday },
  ])("correctly formats the timezone for day of week $dayOfWeek", ({ date, dayOfWeek }) => {
    const result = dateFormat(date, "N");

    expect(result).toBe(dayOfWeek.toString());
  });

  // prettier-ignore
  it.each([
    { date: "1993-03-12",              mask: "d",    expected: "12" },
    { date: "2020-11-1",               mask: "d",    expected: "1" },
    { date: "1830-01-20",              mask: "d",    expected: "20" },
    { date: "9-11-2003",               mask: "dd",   expected: "11" },
    { date: "1992-02-2",               mask: "dd",   expected: "02" },
    { date: "1032-12-08",              mask: "dd",   expected: "08" },
    { date: "2023-01-07",              mask: "ddd",  expected: "Sat" },
    { date: "1873-12-17",              mask: "ddd",  expected: "Wed" },
    { date: "2112-10-25",              mask: "ddd",  expected: "Tue" },
    { date: "1934-11-13",              mask: "dddd", expected: "Tuesday" },
    { date: "1834-01-2",               mask: "dddd", expected: "Thursday" },
    { date: "2077-7-22",               mask: "dddd", expected: "Thursday" },
    { date: "2020-10-22T22:10:59.736", mask: "h",    expected: "10" },
    { date: "2020-10-13T13:30:41.278", mask: "h",    expected: "1" },
    { date: "1993-02-19T03:18:18.711", mask: "h",    expected: "3" },
    { date: "2134-01-25T02:20:42.816", mask: "h",    expected: "2" },
    { date: "1987-02-11T11:03:16.637", mask: "hh",   expected: "11" },
    { date: "2014-09-28T04:29:52.509", mask: "hh",   expected: "04" },
    { date: "2001-08-02T19:14:19.263", mask: "hh",   expected: "07" },
    { date: "1872-01-22T19:26:01.744", mask: "hh",   expected: "07" },
    { date: "1883-03-22T07:35:26.419", mask: "H",    expected: "7" },
    { date: "2012-11-07T14:39:48.988", mask: "H",    expected: "14" },
    { date: "1882-01-16T19:37:45.965", mask: "H",    expected: "19" },
    { date: "2020-08-29T11:20:47.128", mask: "H",    expected: "11" },
    { date: "1872-02-01T15:55:16.524", mask: "HH",   expected: "15" },
    { date: "2020-10-08T14:32:24.438", mask: "HH",   expected: "14" },
    { date: "2077-12-24T04:20:55.795", mask: "HH",   expected: "04" },
    { date: "1782-02-11T01:09:41.403", mask: "HH",   expected: "01" },
    { date: "2020-10-10T08:48:02.436", mask: "l",    expected: "436" },
    { date: "1993-02-16T14:22:12.654", mask: "l",    expected: "654" },
    { date: "2076-01-03T18:23:30.064", mask: "l",    expected: "064" },
    { date: "2002-12-25T19:35:55.655", mask: "l",    expected: "655" },
    { date: "2020-10-10T08:48:02.436", mask: "L",    expected: "43" },
    { date: "1993-02-16T14:22:12.654", mask: "L",    expected: "65" },
    { date: "2076-01-03T18:23:30.064", mask: "L",    expected: "06" },
    { date: "2002-12-25T19:35:55.655", mask: "L",    expected: "65" },
    { date: "2126-07-23T03:15:25.999", mask: "L",    expected: "99" },
    { date: "1974-02-7",               mask: "m",    expected: "2" },
    { date: "1992-09-03",              mask: "m",    expected: "9" },
    { date: "2043-12-22",              mask: "m",    expected: "12" },
    { date: "1800-01-01",              mask: "m",    expected: "1" },
    { date: "1993-02-12T17:36:01.128", mask: "M",    expected: "36" },
    { date: "2013-11-02T07:00:54.270", mask: "M",    expected: "0" },
    { date: "1873-01-04T11:11:34.700", mask: "M",    expected: "11" },
    { date: "1734-12-07T09:05:07.972", mask: "M",    expected: "5" },
    { date: "2014-11-17",              mask: "mm",   expected: "11" },
    { date: "1992-02-11",              mask: "mm",   expected: "02" },
    { date: "2077-01-25",              mask: "mm",   expected: "01" },
    { date: "1876-07-11T13:19:36.341", mask: "MM",   expected: "19" },
    { date: "2013-01-23T07:08:07.942", mask: "MM",   expected: "08" },
    { date: "1982-12-03T08:04:07.203", mask: "MM",   expected: "04" },
    { date: "2063-09-03T02:38:08.815", mask: "MM",   expected: "38" },
    { date: "2099-1-11",               mask: "mmm",  expected: "Jan" },
    { date: "1982-10-01",              mask: "mmm",  expected: "Oct" },
    { date: "1871-03-22",              mask: "mmm",  expected: "Mar" },
    { date: "1993-02-11",              mask: "mmmm", expected: "February" },
    { date: "2023-11-13",              mask: "mmmm", expected: "November" },
    { date: "2077-10-01",              mask: "mmmm", expected: "October" },
    { date: "1984-02-7",               mask: "N",    expected: "2" },
    { date: "2013-01-17",              mask: "N",    expected: "4" },
    { date: "2034-11-24",              mask: "N",    expected: "5" },
    { date: "2002-02-3",               mask: "N",    expected: "7" },
    { date: "2002-02-4",               mask: "N",    expected: "1" },
    { date: "1993-10-08T10:31:40.811", mask: "s",    expected: "40" },
    { date: "2020-10-25T01:29:02.327", mask: "s",    expected: "2" },
    { date: "2003-07-02T01:29:00.327", mask: "s",    expected: "0" },
    { date: "1984-02-7",               mask: "S",    expected: "th" },
    { date: "2013-01-3",               mask: "S",    expected: "rd" },
    { date: "2034-11-22",              mask: "S",    expected: "nd" },
    { date: "2002-02-1",               mask: "S",    expected: "st" },
    { date: "1876-03-22T23:08:02.429", mask: "ss",   expected: "02" },
    { date: "2013-12-11T05:34:35.350", mask: "ss",   expected: "35" },
    { date: "2020-08-29T00:32:00.101", mask: "ss",   expected: "00" },
    { date: "2020-09-22T07:04:09.358", mask: "ss",   expected: "09" },
    { date: "1876-03-22T23:08:02.429", mask: "t",    expected: "p" },
    { date: "2013-12-11T05:34:35.350", mask: "t",    expected: "a" },
    { date: "2020-08-29T00:32:00.101", mask: "t",    expected: "a" },
    { date: "2020-09-22T23:04:09.358", mask: "t",    expected: "p" },
    { date: "1876-03-22T23:08:02.429", mask: "T",    expected: "P" },
    { date: "2013-12-11T05:34:35.350", mask: "T",    expected: "A" },
    { date: "2020-08-29T00:32:00.101", mask: "T",    expected: "A" },
    { date: "2020-09-22T23:04:09.358", mask: "T",    expected: "P" },
    { date: "1876-03-22T23:08:02.429", mask: "tt",   expected: "pm" },
    { date: "2013-12-11T05:34:35.350", mask: "tt",   expected: "am" },
    { date: "2020-08-29T00:32:00.101", mask: "tt",   expected: "am" },
    { date: "2020-09-22T23:04:09.358", mask: "tt",   expected: "pm" },
    { date: "1876-03-22T23:08:02.429", mask: "TT",   expected: "PM" },
    { date: "2013-12-11T05:34:35.350", mask: "TT",   expected: "AM" },
    { date: "2020-08-29T00:32:00.101", mask: "TT",   expected: "AM" },
    { date: "2020-09-22T23:04:09.358", mask: "TT",   expected: "PM" },
    { date: "1876-03-22",              mask: "W",    expected: "12" },
    { date: "2013-12-11",              mask: "W",    expected: "50" },
    { date: "2020-08-29",              mask: "W",    expected: "35" },
    { date: "2020-09-22",              mask: "W",    expected: "39" },
    { date: "1876-01-12",              mask: "WW",   expected: "02" },
    { date: "2013-12-11",              mask: "WW",   expected: "50" },
    { date: "2020-03-04",              mask: "WW",   expected: "10" },
    { date: "2020-02-01",              mask: "WW",   expected: "05" },
    { date: "1789-11-12",              mask: "yy",   expected: "89" },
    { date: "2089-10-2",               mask: "yy",   expected: "89" },
    { date: "2000-02-7",               mask: "yy",   expected: "00" },
    { date: "1999-11-27",              mask: "yy",   expected: "99" },
    { date: "1992-10-6",               mask: "yyyy", expected: "1992" },
    { date: "2078-02-11",              mask: "yyyy", expected: "2078" },
    { date: "1763-12-02",              mask: "yyyy", expected: "1763" },
    { date: "0999-01-01",              mask: "yyyy", expected: "0999" },
    { date: "0002-12-11",              mask: "yyyy", expected: "0002" },
  ])("returns $expected for the $mask mask in $date", ({ date, expected, mask }) => {
    const result = dateFormat(date, mask);

    expect(result).toBe(expected);
  });

  it("gets timezone for any date matching [+-]XXXX when using o mask", () => {
    const date = new Date();

    const result = dateFormat(date, "o");

    expect(result).toMatch(/^[+-]\d{4}$/);
  });

  it("gets timezone for any date matching [+-]XX:XX when using p mask", () => {
    const date = new Date();

    const result = dateFormat(date, "p");

    expect(result).toMatch(/^[+-]\d{2}:\d{2}$/);
  });

  // prettier-ignore
  it.each([
    { offset: -1, mask: "DDDD", expected: "Yesterday" },
    { offset: -1, mask: "DDD",  expected: "Ysd" },
    { offset: 0,  mask: "DDDD", expected: "Today" },
    { offset: 0,  mask: "DDD",  expected: "Tdy" },
    { offset: 1,  mask: "DDDD", expected: "Tomorrow" },
    { offset: 1,  mask: "DDD",  expected: "Tmw" },
  ])("returns $expected for relative day using mask $mask", ({ offset, mask, expected }) => {
    const date = getOffsetDate(offset);

    const result = dateFormat(date, mask);

    expect(result).toBe(expected);
  });

  it("returns the day name for relative format if not today, tomorrow, or yesterday", () => {
    const date = getOffsetDate(2);

    const result = dateFormat(date, "DDD");

    expect(result).not.toMatch(/Tdy|Ysd|Tmw/);
  });

  it("does not format single quoted substrings removing quotes", () => {
    const result = dateFormat("'" + ALPHABET + "'");

    expect(result).toBe(result);
  });

  it("does not format double quoted substrings removing quotes", () => {
    const result = dateFormat('"' + ALPHABET + '"');

    expect(result).toBe(result);
  });

  // prettier-ignore
  it.each([
    { date: "1984-02-7",  mask: "W",  expected: "6" },
    { date: "2013-01-3",  mask: "W",  expected: "1" },
    { date: "2034-11-22", mask: "W",  expected: "47" },
    { date: "2002-02-1",  mask: "W",  expected: "5" },
    { date: "1876-03-22", mask: "WW", expected: "12" },
    { date: "2013-12-11", mask: "WW", expected: "50" },
    { date: "2020-08-29", mask: "WW", expected: "35" },
    { date: "2020-09-22", mask: "WW", expected: "39" },
  ])("returns the week of year $expected for $date", ({ date, mask, expected }) => {
    const result = dateFormat(date, mask);

    expect(result).toBe(expected);
  });

  describe("when UTC is specified", () => {
    // prettier-ignore
    it.each([
      { date: "1993-03-12",              mask: "d",    expected: "12" },
      { date: "2020-11-1",               mask: "d",    expected: "1" },
      { date: "1830-01-20",              mask: "d",    expected: "20" },
      { date: "9-11-2003",               mask: "dd",   expected: "11" },
      { date: "1992-02-2",               mask: "dd",   expected: "02" },
      { date: "1032-12-08",              mask: "dd",   expected: "08" },
      { date: "2023-01-07",              mask: "ddd",  expected: "Sat" },
      { date: "1873-12-17",              mask: "ddd",  expected: "Wed" },
      { date: "2112-10-25",              mask: "ddd",  expected: "Tue" },
      { date: "1934-11-13",              mask: "dddd", expected: "Tuesday" },
      { date: "1834-01-2",               mask: "dddd", expected: "Thursday" },
      { date: "2077-7-22",               mask: "dddd", expected: "Thursday" },
      { date: "2020-10-22T22:10:59.736", mask: "h",    expected: "10" },
      { date: "2020-10-13T13:30:41.278", mask: "h",    expected: "1" },
      { date: "1993-02-19T03:18:18.711", mask: "h",    expected: "3" },
      { date: "2134-01-25T02:20:42.816", mask: "h",    expected: "2" },
      { date: "1987-02-11T11:03:16.637", mask: "hh",   expected: "11" },
      { date: "2014-09-28T04:29:52.509", mask: "hh",   expected: "04" },
      { date: "2001-08-02T19:14:19.263", mask: "hh",   expected: "07" },
      { date: "1872-01-22T19:26:01.744", mask: "hh",   expected: "07" },
      { date: "1883-03-22T07:35:26.419", mask: "H",    expected: "7" },
      { date: "2012-11-07T14:39:48.988", mask: "H",    expected: "14" },
      { date: "1882-01-16T19:37:45.965", mask: "H",    expected: "19" },
      { date: "2020-08-29T11:20:47.128", mask: "H",    expected: "11" },
      { date: "1872-02-01T15:55:16.524", mask: "HH",   expected: "15" },
      { date: "2020-10-08T14:32:24.438", mask: "HH",   expected: "14" },
      { date: "2077-12-24T04:20:55.795", mask: "HH",   expected: "04" },
      { date: "1782-02-11T01:09:41.403", mask: "HH",   expected: "01" },
      { date: "2020-10-10T08:48:02.436", mask: "l",    expected: "436" },
      { date: "1993-02-16T14:22:12.654", mask: "l",    expected: "654" },
      { date: "2076-01-03T18:23:30.064", mask: "l",    expected: "064" },
      { date: "2002-12-25T19:35:55.655", mask: "l",    expected: "655" },
      { date: "2020-10-10T08:48:02.436", mask: "L",    expected: "43" },
      { date: "1993-02-16T14:22:12.654", mask: "L",    expected: "65" },
      { date: "2076-01-03T18:23:30.064", mask: "L",    expected: "06" },
      { date: "2002-12-25T19:35:55.655", mask: "L",    expected: "65" },
      { date: "2126-07-23T03:15:25.999", mask: "L",    expected: "99" },
      { date: "1974-02-7",               mask: "m",    expected: "2" },
      { date: "1992-09-03",              mask: "m",    expected: "9" },
      { date: "2043-12-22",              mask: "m",    expected: "12" },
      { date: "1800-01-01",              mask: "m",    expected: "1" },
      { date: "1993-02-12T17:36:01.128", mask: "M",    expected: "36" },
      { date: "2013-11-02T07:00:54.270", mask: "M",    expected: "0" },
      { date: "1873-01-04T11:11:34.700", mask: "M",    expected: "11" },
      { date: "1734-12-07T09:05:07.972", mask: "M",    expected: "5" },
      { date: "2014-11-17",              mask: "mm",   expected: "11" },
      { date: "1992-02-11",              mask: "mm",   expected: "02" },
      { date: "2077-01-25",              mask: "mm",   expected: "01" },
      { date: "1876-07-11T13:19:36.341", mask: "MM",   expected: "19" },
      { date: "2013-01-23T07:08:07.942", mask: "MM",   expected: "08" },
      { date: "1982-12-03T08:04:07.203", mask: "MM",   expected: "04" },
      { date: "2063-09-03T02:38:08.815", mask: "MM",   expected: "38" },
      { date: "2099-1-11",               mask: "mmm",  expected: "Jan" },
      { date: "1982-10-01",              mask: "mmm",  expected: "Oct" },
      { date: "1871-03-22",              mask: "mmm",  expected: "Mar" },
      { date: "1993-02-11",              mask: "mmmm", expected: "February" },
      { date: "2023-11-13",              mask: "mmmm", expected: "November" },
      { date: "2077-10-01",              mask: "mmmm", expected: "October" },
      { date: "1984-02-7",               mask: "N",    expected: "2" },
      { date: "2013-01-17",              mask: "N",    expected: "4" },
      { date: "2034-11-24",              mask: "N",    expected: "5" },
      { date: "2002-02-3",               mask: "N",    expected: "7" },
      { date: "2002-02-4",               mask: "N",    expected: "1" },
      { date: "1993-10-08T10:31:40.811", mask: "s",    expected: "40" },
      { date: "2020-10-25T01:29:02.327", mask: "s",    expected: "2" },
      { date: "2003-07-02T01:29:00.327", mask: "s",    expected: "0" },
      { date: "1984-02-7",               mask: "S",    expected: "th" },
      { date: "2013-01-3",               mask: "S",    expected: "rd" },
      { date: "2034-11-22",              mask: "S",    expected: "nd" },
      { date: "2002-02-1",               mask: "S",    expected: "st" },
      { date: "1876-03-22T23:08:02.429", mask: "ss",   expected: "02" },
      { date: "2013-12-11T05:34:35.350", mask: "ss",   expected: "35" },
      { date: "2020-08-29T00:32:00.101", mask: "ss",   expected: "00" },
      { date: "2020-09-22T07:04:09.358", mask: "ss",   expected: "09" },
      { date: "1876-03-22T23:08:02.429", mask: "t",    expected: "p" },
      { date: "2013-12-11T05:34:35.350", mask: "t",    expected: "a" },
      { date: "2020-08-29T00:32:00.101", mask: "t",    expected: "a" },
      { date: "2020-09-22T23:04:09.358", mask: "t",    expected: "p" },
      { date: "1876-03-22T23:08:02.429", mask: "T",    expected: "P" },
      { date: "2013-12-11T05:34:35.350", mask: "T",    expected: "A" },
      { date: "2020-08-29T00:32:00.101", mask: "T",    expected: "A" },
      { date: "2020-09-22T23:04:09.358", mask: "T",    expected: "P" },
      { date: "1876-03-22T23:08:02.429", mask: "tt",   expected: "pm" },
      { date: "2013-12-11T05:34:35.350", mask: "tt",   expected: "am" },
      { date: "2020-08-29T00:32:00.101", mask: "tt",   expected: "am" },
      { date: "2020-09-22T23:04:09.358", mask: "tt",   expected: "pm" },
      { date: "1876-03-22T23:08:02.429", mask: "TT",   expected: "PM" },
      { date: "2013-12-11T05:34:35.350", mask: "TT",   expected: "AM" },
      { date: "2020-08-29T00:32:00.101", mask: "TT",   expected: "AM" },
      { date: "2020-09-22T23:04:09",     mask: "TT",   expected: "PM" },
      { date: "1876-03-22",              mask: "W",    expected: "12" },
      { date: "2013-12-11",              mask: "W",    expected: "50" },
      { date: "2020-08-29",              mask: "W",    expected: "35" },
      { date: "2020-09-22",              mask: "W",    expected: "39" },
      { date: "1876-01-12",              mask: "WW",   expected: "02" },
      { date: "2013-12-11",              mask: "WW",   expected: "50" },
      { date: "2020-03-04",              mask: "WW",   expected: "10" },
      { date: "2020-02-01",              mask: "WW",   expected: "05" },
      { date: "1789-11-12",              mask: "yy",   expected: "89" },
      { date: "2089-10-2",               mask: "yy",   expected: "89" },
      { date: "2000-02-7",               mask: "yy",   expected: "00" },
      { date: "1999-11-27",              mask: "yy",   expected: "99" },
      { date: "1992-10-6",               mask: "yyyy", expected: "1992" },
      { date: "2078-02-11",              mask: "yyyy", expected: "2078" },
      { date: "1763-12-02",              mask: "yyyy", expected: "1763" },
      { date: "0999-01-01",              mask: "yyyy", expected: "0999" },
      { date: "0002-12-11",              mask: "yyyy", expected: "0002" },
    ])("returns $expected for the $mask mask in $date", ({ date, expected, mask }) => {
      const result = dateFormat(date, mask, true);

      expect(result).toBe(expected);
    });
  });

  it("handles only passing in a mask", () => {
    expect(dateFormat("M")).toBe(dateFormat(new Date(), "M"));

    expect(dateFormat("M", true)).toBe(dateFormat(new Date(), "M", true));
  });

  it("throws an error if you specify two boolean args", () => {
    expect(() => {
      // @ts-ignore
      dateFormat("2024-01-01", false, true);
    }).toThrow();
  });

  it("throws an error if them mask contains a number", () => {
    expect(() => {
      // @ts-ignore
      dateFormat("2024-01-01", true);
    }).toThrow();
  });

  it("throws an error if the first argument is invalid", () => {
    expect(() => {
      // @ts-ignore
      dateFormat(null, true);
    }).toThrow();
  });
});

function getOffsetDate(offset: number): Date {
  const date = new Date();

  date.setDate(date.getDate() + offset);

  return date;
}
