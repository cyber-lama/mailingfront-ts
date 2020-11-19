<template>
  <section class="menu">
    <div class="menu__wrapper">
      <router-link to="projects" class="menu__link">

      </router-link>
      <router-link to="analytics" class="menu__link">

      </router-link>
      <router-link to="mailing" class="menu__link">

      </router-link>
      <router-link to="templates" class="menu__link">

      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      msg: 'Welcome to Your Vue.js App',
    };
  },
};
</script>
<style lang="scss">
@import "../../style/components/menu";
</style>
