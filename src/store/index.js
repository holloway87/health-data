import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

let firstDayOfMonth = new Date();
firstDayOfMonth = new Date(
  firstDayOfMonth.getFullYear(),
  firstDayOfMonth.getMonth(),
  1,
  0,
  0,
  0,
  0
);

export default new Vuex.Store({
  state: {
    calendarDate: firstDayOfMonth,
  },
  mutations: {
    /**
     * Set the next month for the calendar.
     */
    setCalendarNextMonth(state) {
      let year = state.calendarDate.getFullYear();
      let month = state.calendarDate.getMonth();
      month++;
      if (12 === month) {
        month = 0;
        year++;
      }
      state.calendarDate = new Date(year, month, 1, 0, 0, 0, 0);
    },

    /**
     * Set the previous month for the calendar.
     */
    setCalendarPreviousMonth(state) {
      let year = state.calendarDate.getFullYear();
      let month = state.calendarDate.getMonth();
      month--;
      if (-1 === month) {
        month = 11;
        year--;
      }

      state.calendarDate = new Date(year, month, 1, 0, 0, 0, 0);
    },
  },
  actions: {},
  modules: {},
});
