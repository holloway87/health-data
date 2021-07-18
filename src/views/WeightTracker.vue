<template>
  <div class="weight-tracker">
    <CRow>
      <CCol sm="8" lg="9">
        <CCard>
          <CCardHeader>Weight tracker</CCardHeader>
          <CCardBody>
            <CChartLine
              :datasets="weightDatasets"
              :labels="weightDatasetLabels"
            />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="4" lg="3">
        <WeightTrackerAddEntry :addEntry="addEntry" />
      </CCol>
    </CRow>
  </div>
</template>

<!--suppress JSUnfilteredForInLoop -->
<script>
import { CChartLine } from "@coreui/vue-chartjs";
import WeightTrackerAddEntry from "../components/WeightTrackerAddEntry";

export default {
  components: { CChartLine, WeightTrackerAddEntry },
  data() {
    return {
      weightData: this.loadWeightData(),
      weightDatasets: [],
      weightDatasetLabels: [],
    };
  },
  methods: {
    /**
     * Add a weight entry for a given date.
     */
    addEntry(date, weight) {
      this.weightData[date] = weight;
      this.calcWeightDatasets();
      this.saveWeightData();
    },

    /**
     * Updates the data for the line chart.
     */
    calcWeightDatasets() {
      let data = [];
      let labels = [];
      for (let e in this.weightData) {
        labels.push(
          Intl.DateTimeFormat(navigator.language, {
            day: "2-digit",
            month: "2-digit",
          }).format(new Date(e))
        );
        data.push(this.weightData[e]);
      }

      this.weightDatasets = [
        {
          backgroundColor: "#a0f0a0",
          data: data,
          label: "Weight",
        },
      ];
      this.weightDatasetLabels = labels;
    },

    /**
     * Loads the weight data from local storage.
     */
    loadWeightData() {
      let data = localStorage.getItem("weight-data");
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
     * Saves the weight data in local storage.
     */
    saveWeightData() {
      localStorage.setItem("weight-data", JSON.stringify(this.weightData));
    },
  },

  /**
   * Calculates the chart data when mounted.
   */
  mounted() {
    this.calcWeightDatasets();
  },
};
</script>
