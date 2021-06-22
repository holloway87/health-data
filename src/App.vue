<template>
  <div class="c-wrapper">
    <header class="c-header">
      <div class="container">
        <ul class="c-header-nav d-sd-down-none">
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
</template>

<style lang="scss">
@import "assets/scss/style";
</style>
