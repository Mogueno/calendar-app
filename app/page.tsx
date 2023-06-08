"use client";
import React, {
  useState,
  type ChangeEvent,
  useEffect,
  useCallback,
} from "react";
import dayjs from "dayjs";
import {
  type PublicHoliday,
  countryCodes,
  type CountryCodes,
} from "./data/data";

const format = (date: Date, format: string): string => {
  return dayjs(date).format(format);
};

const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6;
};

const CalendarPage = (): JSX.Element => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [location, setLocation] = useState<string>("US");
  const [publicHolidays, setPlublicHoliday] = useState<PublicHoliday[]>([]);
  const [error, setError] = useState(false);

  const handleYearChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setYear(Number(e.target.value));
  };

  const handleLocationChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ): void => {
    setLocation(e.target.value);
  };

  const extractDate = (date: string): Date => {
    const [year, month, day] = date.split("-");
    return new Date(Number(year), Number(month) - 1, Number(day));
  };

  function fromPublicHolidaysToMap(
    publicHolidays: PublicHoliday[]
  ): Map<string, PublicHoliday> {
    const publicHolidaysMap = new Map<string, PublicHoliday>();
    publicHolidays.forEach((holiday) => {
      const extractedDate = extractDate(holiday.date);
      const date = format(extractedDate, "YYYY/MM/DD");
      publicHolidaysMap.set(date, holiday);
    });
    return publicHolidaysMap;
  }

  const generateCalendar = (): JSX.Element[] => {
    // Replace this dummy data with an API call to fetch actual public holidays based on the location and year
    const publicHolidaysMap = fromPublicHolidaysToMap(publicHolidays);

    const calendarMonths: JSX.Element[] = [];
    for (let month = 0; month < 12; month++) {
      const monthName = format(new Date(year, month, 1), "MMMM");
      const calendarDays: JSX.Element[] = [];
      for (let day = 1; day <= 31; day++) {
        const currentDate = new Date(year, month, day);
        if (currentDate.getMonth() !== month) {
          break;
        }
        const today = format(currentDate, "YYYY/MM/DD");
        const publicHoliday = publicHolidaysMap.get(today);
        const isHoliday = publicHoliday !== undefined ? true : false;

        calendarDays.push(
          <div
            key={currentDate.getTime()}
            className={
              `${isWeekend(currentDate) ? "weekend" : "workday"}` +
              `${isHoliday ? " bg-green-200 " : ""}` +
              ` rounded p-2 text-center`
            }
            data-tooltip-target={isHoliday ? publicHoliday?.name : ""}
          >
            <div className="flex flex-col">
              <span>
                {currentDate.getDate() <= 7 ? format(currentDate, "dd") : ""}
              </span>
              <span>{currentDate.getDate()}</span>
            </div>
            {isHoliday && (
              <div
                id={publicHoliday?.name}
                role="tooltip"
                className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700"
              >
                {publicHoliday?.name}

                <div className="tooltip-arrow"></div>
              </div>
            )}
          </div>
        );
      }
      calendarMonths.push(
        <div key={month} className={`${monthName} `}>
          <h2 className="mb-2 text-xl font-semibold">{monthName}</h2>
          <div className="grid grid-cols-7 gap-4">{calendarDays}</div>
        </div>
      );
    }

    return calendarMonths;
  };

  const handleGetCalendar = useCallback(async () => {
    const res = await fetch(
      `https://date.nager.at/api/v2/publicholidays/${year}/${location}`
    );
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    if (res.status !== 200) {
      setError(true);
    } else {
      setError(false);
    }

    return res.json();
  }, [location, year]);

  useEffect(() => {
    handleGetCalendar()
      .then((data: PublicHoliday[]) => setPlublicHoliday(data))
      .catch((err) => console.log(err));
  }, [year, location, handleGetCalendar]);

  const calendarOrError = error ? (
    <div className="pflex mx-8 min-h-min flex-col bg-slate-400 p-4 px-3 ">
      <div className="mb-2 grid grid-cols-2 rounded bg-slate-300 text-left">
        <div>Failed to fetch data</div>
      </div>
    </div>
  ) : (
    <div className="  pflex mx-8 min-h-min flex-col  bg-slate-400 p-4 px-3">
      <div className="mb-4 grid grid-cols-2 bg-slate-400 px-2">
        <span className="">Date</span>
        <span className="">Description</span>
      </div>
      {publicHolidays.map((holiday, i) => {
        return (
          <div
            key={`${holiday.name} + ${i}`}
            className="mb-2 grid grid-cols-2 rounded bg-slate-300 text-left"
          >
            <div>{holiday.date}</div>
            <div>{holiday.name}</div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-800 py-10 text-black w-full justify-center align-center">
      <div className="mx-auto max-w-5xl rounded bg-slate-400 p-6 shadow w-full">
        <h1 className="mb-6 text-2xl font-bold">Public Holiday Calendar</h1>
        <div className="mb-4">
          <label htmlFor="year" className="mb-1 block font-medium">
            Year:
          </label>
          <input
            type="number"
            id="year"
            value={year}
            onChange={handleYearChange}
            className="w-full rounded border border-gray-300 bg-slate-200 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div className="mb-8">
          <label htmlFor="location" className="mb-1 block font-medium">
            Location:
          </label>
          <select
            id="location"
            value={location}
            onChange={handleLocationChange}
            className="w-full rounded border border-gray-300 bg-slate-200 px-3 py-2 focus:border-blue-500 focus:outline-none"
          >
            {countryCodes.map((country: CountryCodes) => {
              return (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              );
            })}
          </select>
        </div>
        {error ? (
          <div className="w-full">Failed to fetch data</div>
        ) : (
          <div className="mt-8 grid grid-cols-3 gap-5 w-full">
            {generateCalendar()}
          </div>
        )}
      </div>
      {calendarOrError}
    </div>
  );
};

export default CalendarPage;
