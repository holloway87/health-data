<template>
  <div class="calendar">
    <div class="calendar-days">
      <div class="calendar-weekdays">
        <CRow>
          <CCol><div class="calendar-weekday">Mo</div></CCol>
          <CCol><div class="calendar-weekday">Tu</div></CCol>
          <CCol><div class="calendar-weekday">We</div></CCol>
          <CCol><div class="calendar-weekday">Th</div></CCol>
          <CCol><div class="calendar-weekday">Fr</div></CCol>
          <CCol><div class="calendar-weekday">Sa</div></CCol>
          <CCol><div class="calendar-weekday">Su</div></CCol>
        </CRow>
      </div>
      <div v-for="row in calculateRows()" :key="row.idx" class="calendar-row">
        <CRow>
          <CCol v-for="day in row.days" :key="day.idx">
            <component
              v-bind:is="dayComponent"
              :day="day.day"
              :calendar-date="day.calendarDate"
              :component-data="day.componentData"
            />
          </CCol>
        </CRow>
      </div>
    </div>
  </div>
</template>

<script>
import { addMonths, subDays } from "date-fns";
import { mapState } from "vuex";

export default {
  computed: mapState({
    calendarDate: (state) => state.calendarDate,
  }),
  methods: {
    calculateRows() {
      let rows = [];
      let day = 1;
      let days = [];
      let rowIdx = 1;

      let lastDay = subDays(addMonths(this.calendarDate, 1), 1);
      let firstDayOffset = this.calendarDate.getDay() - 1;
      if (-1 === firstDayOffset) {
        firstDayOffset = 6;
      }

      while (day <= lastDay.getDate()) {
        for (let c = 0; c < 7; c++) {
          if (firstDayOffset || day > lastDay.getDate()) {
            days.push({
              day: "",
              idx: rowIdx * c,
              calendarDate: null,
              componentData: this.getDayData(null),
            });
            if (0 < firstDayOffset) {
              firstDayOffset--;
            }
          } else {
            let date = new Date(
              this.calendarDate.getFullYear(),
              this.calendarDate.getMonth(),
              day,
              0,
              0,
              0,
              0
            );
            days.push({
              day: day,
              idx: rowIdx * c,
              calendarDate: date,
              componentData: this.getDayData(date),
            });
            day++;
          }
        }
        rows.push({ days: days, idx: rowIdx });
        days = [];
        rowIdx++;
      }

      return rows;
    },
  },
  props: ["dayComponent", "getDayData"],
};
</script>

<style lang="scss">
@import "~@coreui/coreui/scss/mixins";
@import "~@coreui/coreui/scss/functions";
@import "~@coreui/coreui/scss/variables";

.calendar {
  .calendar-weekdays {
    background-color: $gray-100;

    .calendar-weekday {
      padding: map-get($spacers, 2);
      font-weight: $font-weight-bold;
      text-align: center;
    }
  }

  .calendar-row {
    border-top: 1px solid $gray-200;
  }

  .calendar-days {
    border: 1px solid $gray-200;
  }

  .row {
    margin-left: 0;
    margin-right: 0;

    .col {
      padding-left: 0;
      padding-right: 0;

      &:not(:last-child) {
        border-right: 1px solid $gray-200;
      }
    }
  }
}
</style>
