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

      if (this.componentData.marked) {
        calendarClass.push("marked");
      }

      return calendarClass.join(" ");
    },
  },
  methods: {
    onClick() {
      if (!this.calendarDate) {
        return;
      }

      this.componentData.toggleDay(this.calendarDate);
    },
  },
  props: ["componentData", "calendarDate", "day"],
};
</script>

<style lang="scss">
@import "~@coreui/coreui/scss/mixins";
@import "~@coreui/coreui/scss/functions";
@import "~@coreui/coreui/scss/variables";
@import "../assets/scss/calendar-day";

.calendar-day {
  &.marked {
    background-color: map-get($theme-colors, "success");
    color: $white;
  }
}
</style>
