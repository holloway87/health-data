<template>
  <div class="sleep-tracker">
    <CCard>
      <CCardHeader>Sleep tracker</CCardHeader>
      <CCardBody>
        <CalendarHeader />
        <Calendar
          :day-component="() => import('../components/SleepTrackerDay')"
          :get-day-data="getDayData"
        />
      </CCardBody>
    </CCard>
    <CModal title="Sleeping quality" :show.sync="qualityModal">
      <SleepTrackerModal
        :sleeping-date="modalDate"
        :set-sleeping-quality="setSleepingQuality"
      />
    </CModal>
  </div>
</template>

<script>
import Calendar from "../components/Calendar";
import CalendarHeader from "../components/CalendarHeader";
import SleepTrackerModal from "../components/SleepTrackerModal";
import getMachineDate from "../lib/getMachineDate";

export default {
  components: { Calendar, CalendarHeader, SleepTrackerModal },
  data() {
    return {
      qualityModal: false,
      modalDate: null,
      sleepingQuality: this.loadSleepingQualityData(),
    };
  },
  methods: {
    /**
     * Returns the data for the calendar day component.
     */
    getDayData(date) {
      if (null === date) {
        return {};
      }

      return {
        quality: this.getSleepingQuality(getMachineDate(date)),
        openDialog: this.showQualityModal,
      };
    },

    /**
     * Returns the sleeping quality for the given day.
     */
    getSleepingQuality(day) {
      if ("undefined" === typeof this.sleepingQuality[day]) {
        return 0;
      }

      return this.sleepingQuality[day];
    },

    /**
     * Reads the sleeping quality data from local storage.
     *
     * @return object
     */
    loadSleepingQualityData() {
      let data = localStorage.getItem("sleeping-tracker-days");
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
     * Saves the sleeping quality data in local storage.
     */
    saveSleepingQualityData() {
      localStorage.setItem(
        "sleeping-tracker-days",
        JSON.stringify(this.sleepingQuality)
      );
    },

    /**
     * Sets the sleeping quality for the given date.
     */
    setSleepingQuality(sleepingDate, quality) {
      let day = getMachineDate(sleepingDate);
      let newDays = {};
      for (const d in this.sleepingQuality) {
        // noinspection JSUnfilteredForInLoop
        newDays[d] = this.sleepingQuality[d];
      }
      newDays[day] = quality;

      this.sleepingQuality = newDays;
      this.qualityModal = false;
      this.saveSleepingQualityData();
    },

    /**
     * Shows the modal to set the quality for a day.
     */
    showQualityModal(sleepingDate) {
      this.modalDate = sleepingDate;
      this.qualityModal = true;
    },
  },
};
</script>
