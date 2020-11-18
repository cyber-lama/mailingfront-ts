<template>
  <div id="app" class="container">
    <Menu/>
    <router-view/>
  </div>
</template>

<script>

import Menu from './components/menu/Menu';

export default {
  name: 'App',
  components: { Menu },
  methods: {
    setDevValue(event) {
      if (event.keyCode === 115) {
        this.$store.dispatch('logOut');
      }
    },
  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      document.addEventListener('keyup', this.setDevValue);
    }
  },
};
</script>

