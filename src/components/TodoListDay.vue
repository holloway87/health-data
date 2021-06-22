<template>
  <div class="todo-list-day">
    <TodoListEntry
      v-for="entry in entries"
      :key="entry.idx"
      :done="entry.done"
      :entry="entry.entry"
      :idx="entry.idx"
      :number="formatNumber(entry.number)"
    />
  </div>
</template>

<script>
import TodoListEntry from "./TodoListEntry";
import { mapState } from "vuex";
export default {
  components: { TodoListEntry },
  computed: mapState({
    entries: (state) => state.todoListEntries,
  }),
  methods: {
    formatNumber(number) {
      if (10 > number) {
        return "0" + number;
      }

      return number;
    },
  },
  mounted() {
    this.$store.commit("todoListLoadEntries");
  },
};
</script>

<style lang="scss">
@import "~@coreui/coreui/scss/mixins";
@import "~@coreui/coreui/scss/functions";
@import "~@coreui/coreui/scss/variables";

.todo-list-day {
  margin-top: map-get($spacers, 3);
}
</style>
