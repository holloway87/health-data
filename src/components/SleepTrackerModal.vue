<template>
  <div class="sleeping-quality-modal">
    <p>Select your sleep quality for {{ formatDate() }}</p>

    <div class="text-center">
      <CButtonGroup>
        <CButton
          color="success"
          size="lg"
          v-on:click="() => setSleepingQuality(sleepingDate, 1)"
          >1</CButton
        >
        <CButton
          color="info"
          size="lg"
          v-on:click="() => setSleepingQuality(sleepingDate, 2)"
          >2</CButton
        >
        <CButton
          color="secondary"
          size="lg"
          v-on:click="() => setSleepingQuality(sleepingDate, 3)"
          >3</CButton
        >
        <CButton
          color="warning"
          size="lg"
          v-on:click="() => setSleepingQuality(sleepingDate, 4)"
          >4</CButton
        >
        <CButton
          color="danger"
          size="lg"
          v-on:click="() => setSleepingQuality(sleepingDate, 5)"
          >5</CButton
        >
      </CButtonGroup>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    /**
     * Returns the formatted date.
     */
    formatDate() {
      return Intl.DateTimeFormat(navigator.language, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }).format(this.sleepingDate);
    },
  },
  props: ["setSleepingQuality", "sleepingDate"],
};
</script>
