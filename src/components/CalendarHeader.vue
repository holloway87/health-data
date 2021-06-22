<template>
  <CRow>
    <CCol col="9">
      <h3>{{ month }} {{ year }}</h3>
    </CCol>
    <CCol col="3">
      <div class="text-right">
        <CButtonGroup>
          <CButton v-on:click="setPreviousMonth" color="info" size="sm">
            <CIcon :content="$options.icons.cilCaretLeft" />
          </CButton>
          <CButton v-on:click="setNextMonth" color="info" size="sm">
            <CIcon :content="$options.icons.cilCaretRight" />
          </CButton>
        </CButtonGroup>
      </div>
    </CCol>
  </CRow>
</template>

<script>
import { cilCaretLeft } from "@coreui/icons/js/free/cil-caret-left";
import { cilCaretRight } from "@coreui/icons/js/free/cil-caret-right";
import { mapState } from "vuex";

export default {
  computed: mapState({
    month: (state) =>
      Intl.DateTimeFormat(navigator.language, { month: "long" }).format(
        state.calendarDate
      ),
    year: (state) =>
      Intl.DateTimeFormat(navigator.language, { year: "numeric" }).format(
        state.calendarDate
      ),
  }),
  icons: { cilCaretLeft, cilCaretRight },
  methods: {
    /**
     * Set the next month for the calendar.
     */
    setNextMonth() {
      this.$store.commit("setCalendarNextMonth");
    },

    /**
     * Set the previous month for the calendar.
     */
    setPreviousMonth() {
      this.$store.commit("setCalendarPreviousMonth");
    },
  },
};
</script>
