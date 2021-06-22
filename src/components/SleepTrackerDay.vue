<template>
  <div class="calendar-day" :class="calendarClass" v-on:click="onClick()">
    {{ day ? day : "&nbsp;" }}
  </div>
</template>

<script>
export default {
  computed: {
    calendarClass() {
      let calendarClass = [];
      if (this.day) {
        calendarClass.push("clickable");
      }
      if (this.componentData.quality) {
        let qualityClass = "";
        switch (this.componentData.quality) {
          case 1:
            qualityClass = "bg-success";
            break;
          case 2:
            qualityClass = "bg-info";
            break;
          case 3:
            qualityClass = "bg-secondary";
            break;
          case 4:
            qualityClass = "bg-warning";
            break;
          case 5:
            qualityClass = "bg-danger";
            break;
        }
        if (qualityClass) {
          calendarClass.push(qualityClass);
        }
      }

      return calendarClass.join(" ");
    },
  },
  methods: {
    /**
     * If the day is set, it opens the quality dialog.
     */
    onClick() {
      if (!this.calendarDate) {
        return;
      }

      this.componentData.openDialog(this.calendarDate);
    },
  },
  props: ["componentData", "day", "calendarDate"],
};
</script>

<style lang="scss">
@import "~@coreui/coreui/scss/mixins";
@import "~@coreui/coreui/scss/functions";
@import "~@coreui/coreui/scss/variables";
@import "../assets/scss/calendar-day";

.calendar-day {
  &.bg-success,
  &.bg-info,
  &.bg-danger {
    color: $white;
  }
}
</style>
