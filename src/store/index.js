import { addDays, isSameDay, subDays } from "date-fns";
import Vue from "vue";
import Vuex from "vuex";
import getMachineDate from "../lib/getMachineDate";
import getTodoListData from "../lib/getTodoListData";
import getTodoListDataForDate from "../lib/getTodoListDataForDate";
import getTodoListDataForLastDay from "../lib/getTodoListDataForLastDay";
import saveTodoListData from "../lib/saveTodoListData";

Vue.use(Vuex);

let today = new Date();
let firstDayOfMonth = new Date(
  today.getFullYear(),
  today.getMonth(),
  1,
  0,
  0,
  0,
  0
);

export default new Vuex.Store({
  state: {
    calendarDate: firstDayOfMonth,
    todoListDate: today,
    todoListEntries: [],
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

    /**
     * Add a to do list entry.
     */
    todoListAddEntry(state, entry) {
      state.todoListEntries.push({
        done: false,
        entry: entry,
        idx: state.todoListEntries.length,
        number: 1,
      });

      let data = getTodoListData();
      data[getMachineDate(state.todoListDate)] = state.todoListEntries;
      saveTodoListData(data);
    },

    /**
     * Load the to do list entries from the current date.
     */
    todoListLoadEntries(state) {
      let data = getTodoListDataForDate(getMachineDate(state.todoListDate));

      if (!data.length) {
        let today = new Date();
        if (isSameDay(today, state.todoListDate)) {
          let lastDateData = getTodoListDataForLastDay();
          if (lastDateData.length) {
            for (let d = 0; d < lastDateData.length; d++) {
              if (lastDateData[d].done) {
                continue;
              }

              lastDateData[d].idx = data.length;
              lastDateData[d].number++;
              data.push(lastDateData[d]);
            }

            let allData = getTodoListData();
            allData[getMachineDate(state.todoListDate)] = data;
            saveTodoListData(allData);
          }
        }
      }

      state.todoListEntries = data;
    },

    /**
     * Toggles the done status for a to do list entry.
     */
    todoListToggleDone(state, idx) {
      if ("object" === typeof state.todoListEntries[idx]) {
        state.todoListEntries[idx].done = !state.todoListEntries[idx].done;
      }

      let data = getTodoListData();
      data[getMachineDate(state.todoListDate)] = state.todoListEntries;
      saveTodoListData(data);
    },
  },
  actions: {
    /**
     * Sets the to do list date to the next day.
     */
    todoListSetNextDay(context) {
      context.state.todoListDate = addDays(context.state.todoListDate, 1);
      context.commit("todoListLoadEntries");
    },

    /**
     * Sets the to do list date to the previous day.
     */
    todoListSetPreviousDay(context) {
      context.state.todoListDate = subDays(context.state.todoListDate, 1);
      context.commit("todoListLoadEntries");
    },
  },
  modules: {},
});
