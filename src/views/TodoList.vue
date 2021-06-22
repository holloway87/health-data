<template>
  <div class="todo-list">
    <CRow>
      <CCol sm="9" lg="9">
        <CCard>
          <CCardHeader>Todo list</CCardHeader>
          <CCardBody>
            <CRow>
              <CCol col="9">
                <h3>{{ dateReadable }}</h3>
              </CCol>
              <CCol col="3">
                <div class="text-right">
                  <CButtonGroup>
                    <CButton v-on:click="setPreviousDay" color="info" size="sm">
                      <CIcon :content="$options.icons.cilCaretLeft" />
                    </CButton>
                    <CButton v-on:click="setNextDay" color="info" size="sm">
                      <CIcon :content="$options.icons.cilCaretRight" />
                    </CButton>
                  </CButtonGroup>
                </div>
              </CCol>
            </CRow>
            <TodoListDay />
          </CCardBody>
        </CCard>
      </CCol>
      <CCol sm="4" lg="3">
        <TodoListAddEntry />
      </CCol>
    </CRow>
  </div>
</template>

<script>
import { cilCaretLeft } from "@coreui/icons/js/free/cil-caret-left";
import { cilCaretRight } from "@coreui/icons/js/free/cil-caret-right";
import { mapState } from "vuex";
import TodoListAddEntry from "../components/TodoListAddEntry";
import TodoListDay from "../components/TodoListDay";

export default {
  components: { TodoListAddEntry, TodoListDay },
  computed: mapState({
    date: (state) => state.todoListDate,
    dateReadable: (state) =>
      Intl.DateTimeFormat(navigator.language, {
        day: "numeric",
        month: "long",
      }).format(state.todoListDate),
  }),
  data() {
    return {};
  },
  icons: { cilCaretLeft, cilCaretRight },
  methods: {
    setNextDay() {
      this.$store.dispatch("todoListSetNextDay");
    },
    setPreviousDay() {
      this.$store.dispatch("todoListSetPreviousDay");
    },
  },
};
</script>
