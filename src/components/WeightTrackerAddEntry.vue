<template>
  <div class="weight-tracker-add-entry">
    <CCard>
      <CCardHeader>Add entry</CCardHeader>
      <CCardBody>
        <CInput label="Date" v-model="date" type="date" />
        <CInput label="Weight" v-model="weight" />
        <CButton color="primary" type="submit" v-on:click="onClick()">
          Add
        </CButton>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: "",
      weight: null,
    };
  },
  methods: {
    /**
     * Adds the entry to the weight tracker and resets the data.
     */
    onClick() {
      if (!this.date || !this.weight) {
        return;
      }

      this.addEntry(this.date, parseFloat(this.weight));
      this.date = "";
      this.weight = null;
    },
  },
  props: ["addEntry"],
};
</script>
