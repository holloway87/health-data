<template>
  <div class="home">
    <CCard>
      <CCardHeader>Home</CCardHeader>
      <CCardBody>
        <div class="text-center">
          <img alt="Vue logo" src="../assets/logo.png" />
          <HelloWorld msg="Welcome to Your Vue.js App" />
        </div>
      </CCardBody>
    </CCard>
  </div>
</template>

<script>
import HelloWorld from "../components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
};
</script>
