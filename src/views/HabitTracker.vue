<template>
  <div class="habit-tracker">
    <CRow>
      <CCol sm="8" lg="9">
        <CCard>
          <CCardHeader>Habit tracker</CCardHeader>
          <CCardBody>
            <CalendarHeader />
            <Calendar
              :day-component="() => import('../components/HabitTrackerDay')"
              :get-day-data="getDayData"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="4" lg="3">
        <CCard>
          <CCardHeader>Streak</CCardHeader>
          <CCardBody>
            <p>
              Current streak: {{ current_streak }} day{{
                1 !== current_streak ? "s" : ""
              }}
            </p>
            <p>
              Best Streak: {{ max_streak }} day{{ 1 !== max_streak ? "s" : "" }}
            </p>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { differenceInCalendarDays, isAfter } from "date-fns";
import Calendar from "../components/Calendar";
import CalendarHeader from "../components/CalendarHeader";
import getMachineDate from "../lib/getMachineDate";

export default {
  components: { Calendar, CalendarHeader },
  data() {
    return {
      current_streak: 0,
      days: this.loadData(),
      max_streak: this.loadMaxStreak(),
    };
  },
  methods: {
    /**
     * Calculates the current days streak.
     */
    calcStreak() {
      let days = Object.keys(this.days)
        .reverse()
        .reduce((obj, key) => {
          obj[key] = this.days[key];

          return obj;
        }, {});

      let streak = null;
      let lastDay = new Date();
      for (let d in days) {
        let date = new Date(d);
        if (isAfter(date, lastDay)) {
          continue;
        }

        if (null === streak && 0 === differenceInCalendarDays(lastDay, date)) {
          streak = 1;
        } else if (streak && 1 === differenceInCalendarDays(lastDay, date)) {
          streak++;
          lastDay = date;
        }
      }

      if (null === streak) {
        streak = 0;
      }

      this.current_streak = streak;
      if (streak > this.max_streak) {
        this.max_streak = streak;
        this.saveMaxStreak();
      }
    },

    /**
     * Returns the data for the calendar day component.
     */
    getDayData(date) {
      if (null === date) {
        return {};
      }

      return {
        marked: this.isMarked(getMachineDate(date)),
        toggleDay: this.toggleDay,
      };
    },

    /**
     * Returns if the given date is marked or not.
     *
     * @param {string} date
     * @return {boolean}
     */
    isMarked(date) {
      return "boolean" === typeof this.days[date] && this.days[date];
    },

    /**
     * Reads the data out from local storage.
     *
     * @return {*}
     */
    loadData() {
      let data = localStorage.getItem("calendar-days");
      if (null === data) {
        data = "";
      }

      try {
        return JSON.parse(data);
      } catch (e) {
        return {};
      }
    },

    /**
     * Loads the maximum streak from local storage.
     *
     * @return {number}
     */
    loadMaxStreak() {
      let data = parseInt(localStorage.getItem("calendar-max-streak"));
      if (isNaN(data)) {
        data = 0;
      }

      return data;
    },

    /**
     * Saves data workout data in local storage and recalculates the streak.
     */
    saveData() {
      localStorage.setItem("calendar-days", JSON.stringify(this.days));
      this.calcStreak();
    },

    /**
     * Saves the maximum streak in local storage.
     */
    saveMaxStreak() {
      localStorage.setItem("calendar-max-streak", this.max_streak);
    },

    /**
     * Toggles the state of one day, saves everything in local storage afterwards.
     */
    toggleDay(date) {
      let newDays = {};
      let dateFormat = getMachineDate(date);

      for (let d in this.days) {
        // noinspection JSUnfilteredForInLoop
        newDays[d] = this.days[d];
      }

      if ("undefined" !== typeof newDays[dateFormat]) {
        newDays[dateFormat] = !newDays[dateFormat];
      } else {
        newDays[dateFormat] = true;
      }

      this.days = Object.keys(newDays)
        .sort()
        .reduce((list, key) => {
          if (newDays[key]) {
            list[key] = newDays[key];
          }

          return list;
        }, {});
      this.saveData();
    },
  },
  mounted() {
    this.calcStreak();
  },
};
</script>
