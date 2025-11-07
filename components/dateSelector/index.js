import dayjs from "dayjs";
import { React, useState } from "react";
import styles from "./dateSelector.module.css";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const yearRange = (startYear, endYear) => {
  const array = [];
  for (let i = startYear; i <= endYear; i += 1) {
    array.push(i);
  }
  return array;
};
const DateSelector = (props) => {
  const [month, setMonth] = useState("")
  console.log('month',month)
  const [day, setDay] = useState("")
console.log(day,'day')
  const [year, setYear] = useState("")
  console.log('year',year)

  console.log('date :',`${day}/${month}/${year}`)
 const newDate= dayjs(`${day}/${month}/${year}`).format('DD-MMM-YYYY')
 console.log({newDate})
 props.setDate(newDate)
//  props.setTodate(newDate)
  // month ,day ,year
  return (
    <div className={styles.container}>
      <div className={styles.daySelectorWrap}>
        <select
          className={styles.daySelector}
          name="day"
          onChange={(e) => {
            setDay(e.target.value);
          }}
        >
          <option value="" disabled selected>
            DD
          </option>
          {Array.from({ length: 31 }, (_, i) => {
            return i + 1;
          }).map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.monthSelectorWrap}>
        <select className={styles.monthSelector} name='month' onChange={(e) => {
            setMonth(e.target.value);
          }}>
			 <option value="" disabled selected>
            MM
          </option>
          {months.map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
      <div className={styles.yearSelectorWrap}>
        <select className={styles.yearSelector} name='year'onChange={(e) => {
            setYear(e.target.value)}}>
				 <option value="" disabled selected>
            YYYY
          </option>
          {yearRange(
            new Date().getFullYear(),
            new Date().getFullYear() + 100
          ).map((item) => {
            return (
              <option value={item} key={item}>
                {item}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default DateSelector
