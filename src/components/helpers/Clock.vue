<template>
  <div class="clock">
    {{ time }}
    <button @click="() => this.changeFormat()">Сменить формат</button>
  </div>

</template>

<script>
import moment from 'moment';

export default {
  name: 'Clock',
  data() {
    return {
      time: '',
      format: 'MMMM Do YYYY, h:mm:ss a',
    };
  },
  mounted() {
    this.getTime();
  },
  methods: {
    getTime() {
      this.time = moment()
        .format(this.format);
      requestAnimationFrame(this.getTime);
    },
    changeFormat() {
      this.format = 'LTS';
    },
  },
};
</script>

<style scoped>

</style>
