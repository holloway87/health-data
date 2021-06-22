<template>
  <div class="todo-list-entry" :class="entry_class" v-on:click="onClick()">
    <div class="entry-number">[{{ number }}]</div>
    <div class="entry-text">{{ entry }}</div>
  </div>
</template>

<script>
export default {
  computed: {
    entry_class() {
      if (this.done) {
        return "done";
      }

      return "";
    },
  },
  methods: {
    onClick() {
      this.$store.commit("todoListToggleDone", this.idx);
    },
  },
  props: ["done", "entry", "idx", "number"],
};
</script>

<style lang="scss">
@import "~@coreui/coreui/scss/mixins";
@import "~@coreui/coreui/scss/functions";
@import "~@coreui/coreui/scss/variables";

.todo-list-entry {
  display: flex;
  padding: map-get($spacers, 1) 0;
  border-bottom: 1px dashed $gray-100;
  font-size: 1.2rem;
  cursor: pointer;

  &:hover {
    text-decoration: line-through;
  }

  &.done {
    color: map-get($theme-colors, "success");
    text-decoration: line-through;

    &:hover {
      color: map-get($theme-colors, "danger");
    }
  }

  .entry-text {
    flex: 1;
    padding-left: map-get($spacers, 2);
  }
}
</style>
