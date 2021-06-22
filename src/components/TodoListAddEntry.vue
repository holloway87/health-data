<template>
  <CCard>
    <CCardHeader>Add entry:</CCardHeader>
    <CCardBody>
      <CInput v-model="entry" />
      <CInputCheckbox label="Add for next day" class="form-group" />
      <CButton color="primary" type="submit" v-on:click="onClick()">
        Add
      </CButton>
    </CCardBody>
  </CCard>
</template>

<script>
export default {
  data() {
    return {
      entry: "",
    };
  },
  methods: {
    onClick() {
      this.$store.commit("todoListAddEntry", this.entry);
      this.entry = "";
    },
  },
};
</script>
