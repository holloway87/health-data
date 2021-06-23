<template>
  <div class="c-app">
    <CSidebar :show.sync="show_sidebar">
      <CSidebarNav>
        <CSidebarNavItem>
          <router-link to="/" class="c-sidebar-nav-link">Home</router-link>
        </CSidebarNavItem>
        <CSidebarNavItem>
          <router-link to="/sleep-tracker" class="c-sidebar-nav-link">
            Sleep tracker
          </router-link>
        </CSidebarNavItem>
        <CSidebarNavItem>
          <router-link to="/habit-tracker" class="c-sidebar-nav-link">
            Habit tracker
          </router-link>
        </CSidebarNavItem>
        <CSidebarNavItem>
          <router-link to="/weight-tracker" class="c-sidebar-nav-link">
            Weight tracker
          </router-link>
        </CSidebarNavItem>
        <CSidebarNavItem>
          <router-link to="/todo-list" class="c-sidebar-nav-link">
            Todo list
          </router-link>
        </CSidebarNavItem>
      </CSidebarNav>
    </CSidebar>
    <div class="c-wrapper">
      <header class="c-header">
        <button
          type="button"
          class="ml-3 d-lg-none c-header-toggler"
          v-on:click="show_sidebar = true"
        >
          <span class="c-header-toggler-icon"></span>
        </button>
        <div class="container d-md-down-none">
          <ul class="c-header-nav">
            <li class="c-header-nav-item px-3">
              <router-link to="/" class="c-header-nav-link">Home</router-link>
            </li>
            <li class="c-header-nav-item px-3">
              <router-link to="/sleep-tracker" class="c-header-nav-link">
                Sleep tracker
              </router-link>
            </li>
            <li class="c-header-nav-item px-3">
              <router-link to="/habit-tracker" class="c-header-nav-link">
                Habit tracker
              </router-link>
            </li>
            <li class="c-header-nav-item px-3">
              <router-link to="/weight-tracker" class="c-header-nav-link">
                Weight tracker
              </router-link>
            </li>
            <li class="c-header-nav-item px-3">
              <router-link to="/todo-list" class="c-header-nav-link">
                Todo list
              </router-link>
            </li>
          </ul>
        </div>
      </header>
      <div class="c-body">
        <main class="c-main">
          <div class="container">
            <router-view />
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created() {
    window.addEventListener("resize", this.windowResize);
  },
  data() {
    return {
      show_sidebar: false,
    };
  },
  destroyed() {
    window.removeEventListener("resize", this.windowResize);
  },
  methods: {
    windowResize(e) {
      if (992 <= e.target.outerWidth) {
        this.show_sidebar = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "assets/scss/style";
</style>
