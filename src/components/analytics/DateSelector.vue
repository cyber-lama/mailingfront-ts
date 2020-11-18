<template>
  <section class="select">
    <ul class="select__list">
      <li>
        <!--        <h3 v-on:click="() => this.show = 'day'" class="item__title">{{ listItems }}</h3>-->
        <ul v-if="show==='day'" class="item__list">
          <li v-for="(item, index) in days" :key="index">
            v-on:click="(event) => setSelectedValue(event.currentTarget.textContent, 'day')"
            >
            {{ item }}
          </li>
        </ul>

      </li>
      <!--      <li><h3 class="item__title">{{ listItems }}</h3>-->
      <ul class="item__list">
        <li v-for="(item, index) in this.items" :key="index">
          v-on:click="(event) => setSelectedValue(event.currentTarget.textContent, 'day')"
          >
          {{ item }}
        </li>
      </ul>
      <!--      <li><h3 class="item__title">{{ listItems }}</h3>-->
      <ul class="item__list">
        <li v-for="(item, index) in this.items" :key="index">
          v-on:click="(event) => setSelectedValue(event.currentTarget.textContent, 'day')"
          >
          {{ item }}
        </li>
      </ul>
    </ul>

  </section>
</template>

<script lang=ts>
import moment from 'moment';
// import RenderList from '../helpers/RenderList';

export default {
  name: 'DateSelector',
  // components: { RenderList },
  data() {
    return {
      date: new Date(),
      day: '1',
      month: 'Январь',
      year: '1',
      days: [1, 2, 3, 4],
      months: moment.months(),
      years: ['2019', '2018', '2017', '2016'],
      show: '',
      items: null
    };
  },
  mounted() {
    moment.locale('ru');
    const YEARS = () => {
      const years = [];
      const dateStart = moment('2000');
      const dateEnd = moment()
          .add(0, 'y');
      while (dateEnd.diff(dateStart, 'years') >= 0) {
        years.push(dateStart.format('YYYY'));
        dateStart.add(1, 'year');
      }
      return years;
    };
    const DAYS = () => {
      const days = [];
      const dateStart = moment();
      const dateEnd = moment()
          .add(30, 'days');
      while (dateEnd.diff(dateStart, 'days') >= 0) {
        days.push(dateStart.format('D'));
        dateStart.add(1, 'days');
      }
      return days;
    };
    console.log(DAYS(), 'Дни');
    console.log(YEARS(), 'месяцы');
    this.day = moment(this.date)
        .format('D');
    this.month = moment(this.date)
        .format('MMMM');
    this.year = YEARS();
  },
  methods: {
    setSelectedValue(value, variable) {
      this[variable] = value;
      this.show = ' ';
    },
    showList(show) {
      this.show = show;
    },
  },
};
</script>

<style type="scss">
@import "../../style/components/helpers/date-selector.scss";
</style>
