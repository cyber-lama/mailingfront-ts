<template>
  <section class="info">
    <div class="info__wrapper" v-bind:style="{width:width + '%',height:height + 'px', 'font-size':fontSize + 'px'}">
      Инфо
      {{ this.$store.getters.getInfoMessage }}
    </div>
  </section>
</template>

<script>

export default {
  name: 'Info',
  components: {},
  data() {
    return {
      name: '',
      code: '',
      height: '60',
      fontSize: '24',
      width: 100
    };
  },
  mounted() {
    setTimeout(() => {
      this.hideBlock();
    }, 1000);
  },
  methods: {
    hideBlock() {
      if (this.height > 0) {
        requestAnimationFrame(() => {
          setTimeout(() => {
            this.fontSize = this.fontSize - 0.4;
            this.height = this.height - 1;
            this.width = this.width - 1;
          }, 500);
          this.hideBlock();
        });
      }
    },
  },
};
</script>

<style lang="scss">
@import "../../style/components/info";
</style>
