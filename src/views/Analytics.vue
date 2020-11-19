<template>
  <section class="analytics">
    <div class="analytics__wrapper">
      <h1 class="analytics__title">
        Аналитика рассылок
      </h1>
      <DateSelector/>
      <Logout/>
    </div>
    <MailingType :items="mailingList"/>
  </section>
</template>

<script lang="ts">
import Logout from '../components/auth/Logout.vue';
import DateSelector from '../components/analytics/DateSelector.vue';
import MailingType from '../components/analytics/MailingType.vue';

export default {
  name: 'Analytics',
  components: { MailingType, DateSelector, Logout },
  data() {
    return {
      mailingList: [
        {
          name: 'E-mail',
          logo: 'email_icon.svg',
          value: 1500,
        },
        {
          name: 'sms',
          logo: 'sms_icon.svg',
          value: 500,
        },
        {
          name: 'Голосовые',
          logo: 'voice_icon.svg',
          value: 1000,
        },
        {
          name: 'Push',
          logo: 'push_icon.svg',
          value: 2000,
        },
      ],
    };
  },
  methods: {
    test(){
      const progectPage = 1;
      this.$store.dispatch('getProjectPage', progectPage);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "../style/components/analytics/analytics";
</style>
