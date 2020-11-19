<template>
  <section class="mailing">
    <ul class="mailing__list">
      <li class="mailing__item" v-for="(item, index) in this.items" :key="index">
        <div class="mailing__container">
          <p class="mailing__item-name">{{ item.name }}</p>
          <div class="mailing__item-wrapper">
            <p class="mailing__item-value">{{ item.value }}</p>
            <p class="mailing__item-logo">
              <img :src="`/static/images/icons/${item.logo}`"/>
            </p>
          </div>
        </div>
        <button class="mailing__item-btn">Выбрать</button>
      </li>
    </ul>
  </section>

</template>

<script>
export default {
  props: {
    items: Array,
  },
  name: 'MailingType',
  mounted() {
    this.items.map((item) => {
      console.log(item);
    });
  },
};
</script>

<style lang="scss">
@import "../../style/components/analytics/mailingtype";
</style>
