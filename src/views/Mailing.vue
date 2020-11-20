<template>
  <section class="mailing">
    <!--    <div v-if="!this.getStatusAdditionallyMailing" class="mailing__all"> что это-->
    <div v-if="!create" class="mailing__all">
      <div class="header__wrapper">
        <h1 class="header__wrapper-title">
          Список шаблонов
        </h1>
        <Logout/>
        <Info/>
      </div>
      <div class="search__wrapper">
        <Search :values="mailingList"
                placeholder="Введите название рассылки"
                mutation="updateMailings"
                action="getMailings"
                @searched="resetSettings"/>
        <button class="search__wrapper-button green" @click="createMailing">Создать
        </button>
      </div>
      <div class="list__wrapper">
        <div class="list__wrapper-content">
          <ListItems
              ref="list_items"
              :items="mailingList"
              :projects=true
              :events=true
              :channels=true
              :status=true
          />
        </div>
      </div>
    </div>
    <!--    <div v-if="!this.getStatusAdditionallyMailing" class="mailing__container">-->
    <div v-if="create" class="mailing__container">
      <div class="header__wrapper">
        <h2 class="mailing__title">Добавление рассылки</h2>
        <Info/>
        <Clock/>
        <Logout/>
      </div>
      <div class="mailing__wrapper">
        <div class="mailing__block">
          <div class="mailing__form-input-label">
            <p class="mailing__form-input-text">Условие</p>
            <ul v-for="filter in selectedFilters" :key="filter.id">
              <li>
                <!--                {{filter.filter_action_id}}-->
                <!--                {{filter.filter_field_id}}-->
                {{ filter.value }}
              </li>

            </ul>
          </div>
          <label class="mailing__form-input-label">
            <p class="mailing__form-input-text">Название рассылки</p>
            <input v-on:input="(event) => setSelectedValue(event.target.value, 'name')"
                   class="mailing__form-input"
                   type="text" placeholder="Имя проекта"/>
          </label>
          <Select :items="this.$store.getters.projectsList" :label="'Выбор проекта'" :id="3"
                  :placeholder="'Список проектов'"
                  v-on:setItem="(value) => setSelectedValue(value,'selectedProject')"/>
          <Select :items="this.$store.getters.getAllTemplates" :label="'Выбор шаблона'" :id="2"
                  :placeholder="'Список шаблонов'"
                  v-on:setItem="(value) => setSelectedValue(value,'selectedTemplate')"/>
          <Select :items="status" :label="'Статус'" :placeholder="'Список статусов'" :id="1"
                  v-on:setItem="(value) => setSelectedValue(value,'selectedStatus')"/>

          <label class="mailing__form-input-label">
            <p class="mailing__form-input-text">Дата начала</p>
            <input v-on:input="(event) => setSelectedValue(formatDateToTimStamp(event.target.value), 'startDate')"
                   class="mailing__form-input"
                   type="date" placeholder="Дата начала "/>
          </label>
          <!--Выбор типа окончания-->
          <Select :items="this.$store.getters.getEndingTypes" :label="'Выбор типа окончания'"
                  :placeholder="'Выбрать тип окончания'" :id="4"
                  v-on:setItem="(value) => setSelectedValue(value,'setEndingType')"/>


          <label v-if="setEndingType.trim() === 'По количеству'" class="mailing__form-input-label">
            <p class="mailing__form-input-text">Ввод количества рассылок</p>
            <input v-on:input="(event) => setSelectedValue(event.target.value, 'setEndingValue')"
                   class="mailing__form-input"
                   type="text" placeholder="Количество рассылок"/>
          </label>
          <label v-if="setEndingType.trim() === 'По дате'" class="mailing__form-input-label">
            <p class="mailing__form-input-text">Дата окончания рассылки</p>
            <input v-on:input="(event) => setSelectedValue(formatDateToTimStamp(event.target.value), 'setEndingValue')"
                   class="mailing__form-input"
                   type="date" placeholder="Дата начала "/>
          </label>
          <!--Конец выбора типа окончания-->
        </div>
        <div class="mailing__block">
          <div class="mailing__pickers">

            <!--ФИЛЬТР-->
            <div class="mailing__filters">
              <h2 class="mailing__filters-title"
                  @click="() =>this.showFilters = !showFilters"
              >
                Фильтр
              </h2>
              <ul v-if="showFilters"
                  v-for="filter in this.$store.getters.getFiltersScopes" :key="filter.id">
                <li
                    @click="() => {showFiltersField(filter.id);}"
                >
                  {{ filter.name }}
                  <ul v-if="showFilterFields === filter.id"
                      v-for="fields in filter.fields" :key="fields.id">
                    <li @click="setAllFilterData(filter.id, fields.id, fields.name)">
                      <p>{{ fields.id }}</p>
                      <p>{{ fields.name }}</p>
                    </li>
                  </ul>
                </li>

              </ul>
            </div>

            <!--Конец фильтра-->
            <h4 class="mailing__block-title">Канал отправки</h4>
            <ul>
              <li v-for="(item, index) in this.$store.getters.getChannels" :key="index">
                <label>{{ item.name }}
                  <input @click="selectedChannel(item.id)" type="checkbox">
                </label>
              </li>
            </ul>
          </div>


          <Select :items="this.$store.getters.getEndingTypes" :label="'График рассылки'"
                  :placeholder="'Выбрать график рассылки'" :id="4"
                  v-on:setItem="(value) => setSelectedValue(value,'setIntervalType')"/>


          <label v-if="setIntervalType.trim() === 'По количеству'" class="mailing__form-input-label">
            <p class="mailing__form-input-text">ввод количества рассылок</p>
            <input v-on:input="(event) => setSelectedValue(event.target.value, 'event')"
                   class="mailing__form-input"
                   type="text" placeholder="График рассылки"/>
          </label>
          <div v-if="setIntervalType.trim() === 'По дате'" class="mailing__end">
            <!--            <h4 class="mailing__block-title">-->
            <!--              Условие окончания рассылки-->
            <!--            </h4>-->
            <!--            <ul class="mailing__end-list">-->
            <!--              <li v-for="(item, index) in this.$store.getters.getEndingTypes" :key="index"-->
            <!--                  @click="selectedEndingTypes(index)"-->
            <!--                  class="mailing__end-item"-->
            <!--                  :class="selectedEnding === index && 'mailing__end-item&#45;&#45;selected'">-->
            <!--                {{ selectedEnding }}-->
            <!--                {{ item }}-->
            <!--              </li>-->
            <!--            </ul>-->
            <div class="mailing__end-date-selector">
              Выбор даты
              <ul class="calendar__years">
                <li v-for="(year, index) in years" :key="index"
                    v-if="currentDate.slice(6) === year"
                    class="calendar__years-item"
                >
                  <button @click="changeDate( 'years', 'subtract')">1</button>
                  <button @click="changeDate('years', 'add' )">2</button>
                  <p @click="(event) => setSelectedYear(year, index)"
                     :class="selectedDate.map((date) => {
                    return date.year === year && 'calendar__years-item--selected'
                  })"
                     class="calendar__years-item"
                  >
                    {{ year }}
                  </p>
                  <ul class="calendar__months-list" v-if="index === selectedYearIndex">
                    <li class="calendar__months-item" v-for="(month, index) in months"
                        :key="index"
                    >
                      <!--                    v-if="parseInt(currentDate.slice(3,5)) === (index + 1)">-->
                      <!--                    <button @click="changeDate( 'month', 'subtract',)">1</button>-->
                      <!--                    <button @click="changeDate( 'month','add',)">2</button>-->
                      <p @click="(event) => setSelectedMonth(month,year, index)"
                         :class="selectedDate.map((date) => date.year === year &&
                            date.hasOwnProperty(month) && 'calendar__months-item--selected'
                       )"
                      >
                        {{ month }}
                      </p>
                      <ul class="calendar__days-list" v-if="index == selectedMonthIndex">
                        <li @click="(event) => setSelectedDays(event, day, month, year)"
                            class="calendar__days-item"
                            v-for="(day, index) in daysInSelectedMonth" :key="index"
                            :class="selectedDate.map((date) =>
                          date.year === year &&
                            date.hasOwnProperty(month) &&
                            date[month].indexOf(day) >= 0 && 'calendar__days-item--selected'
                       )"
                        >

                          {{ day }}
                        </li>
                      </ul>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
            <!--            <div v-if="selectedEnding === '2'" class="mailing__end-enter-counter">-->
            <!--              Ввод количества отправок-->
            <!--            </div>-->
          </div>
        </div>
      </div>
      <button class="mailing__submit-btn" @click="submit()">Создать</button>
      <button @click="closeAdditionallyTemplate" class="projects__form-submit red">Назад
      </button>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Select from '../components/helpers/Select';
import Logout from '../components/auth/Logout';
import Info from '../components/info/Info';
import Search from '../components/helpers/Search';
import ListItems from '../components/templates/ListItems';
import moment from 'moment';
import Clock from '../components/helpers/Clock';

export default {
  name: 'Index',
  components: { Clock, Logout, Select, Search, ListItems, Info },
  data() {
    return {
      // isLocked: this.$store.getters.isLocked,
      create: true,
      selectedEnding: '1',
      years: [],
      selectedYear: '',
      months: [],
      // selectedMonth: "",
      daysInSelectedMonth: [],
      selectedMonthIndex: '',
      selectedYearIndex: '',
      currentDate: '',

      selectedMonth: [],
      selectedDays: [],

      selectedDate: [], // дата из календаря

      status: [{ id: '2', name: 'Отключена' }, { id: '1', name: 'Включена' }],
      preloader: '',
      selectedStatus: '',
      templatesList: [],
      selectedTemplate: '',
      selectedProject: '',
      channels: '',
      event: [],
      selectedChannels: [],
      selectedDaysIndex: '',
      startDate: '',
      endDate: '',
      showFilters: false,
      showFilterFields: null,
      setEndingValue: '', // ending.value
      setIntervalType: '', // interval_type
      setEndingType: '', // тип окончания рассылкиe nding.type
      selectedFilters: [],
      // temporaryFilter: {},
    };
  },
  methods: {
    createMailing() {
      // this.$store.commit('controlAdditionallyMailing', true);
      this.create = true;
    },
    closeAdditionallyTemplate() {
      this.$store.commit('controlAdditionallyMailing', false);
    },
    resetSettings() {
      this.preloader = '';
    },
    // setTemplatesList(templates) {
    //   console.log('templates', templates);
    //
    //   this.templatesList = templates;
    // },
    setSelectedValue(value, variable) {
      this[variable] = value;
      this.show = ' ';
    },
    selectedChannel(id) {
      if (this.selectedChannels.indexOf(id) !== -1) {
        this.selectedChannels = this.selectedChannels.filter(item => item !== id);
      } else {
        this.selectedChannels.push(id);
      }
    },
    setSelectedYear(year, index) {
      // проверять внгесены ли уже изменеия в какой то из годов
      this.selectedDate.push({ year });
      this.selectedYearIndex = index;
    },
    setSelectedMonth(month, year, index) {
      // нужно определить правильное количество дней в месяце
      this.daysInSelectedMonth = moment(`${this.selectedYear}-${index + 1}`, 'YYYY-MM')
          // это предоставляет сам moment
          .daysInMonth();
      this.selectedMonthIndex = index;
      // eslint-disable-next-line array-callback-return
      this.selectedDate.map((item) => {
        if (item.year === year) {
          // создаем пустые массивы под дни, поидее можно этого избежать
          item[month] = [];
        }
      });
    },
    setSelectedDays(event, day, month, year) {
      this.selectedDate.map((item) => {
        if (item.year === year) {
          item[month].push(day);
        }
      });
      this.$forceUpdate();
    },

    changeDate(type, action) {
      const date = moment(this.currentDate, 'DD/MM/YYYY');
      this.currentDate = date[action](1, type)
          .format('DD/MM/YYYY');
    },
    showFiltersField(id) {
      this.showFilterFields = id; // показ фильра по id
    },
    setAllFilterData(filterActionId, filterFieldId, value) {
      const temporaryFilter = {};
      temporaryFilter.filter_action_id = filterActionId;
      temporaryFilter.filter_field_id = filterFieldId;
      temporaryFilter.value = value;
      this.selectedFilters.push(temporaryFilter);
    },
    formatDateToTimStamp(date) {
      return moment(date)
          .format('X');
    },
    submit() {
      const name = this.name;
      const projectId = this.selectedProject;
      const templateId = this.selectedTemplate;
      const status = this.selectedStatus;
      const channels = this.selectedChannels;
      const startDate = this.startDate;
      const endDate = this.endDate;
      const filters = this.selectedFilters;
      const event = {
        strat_date: this.startDate,
        interval: this.selectedDate,
        interval_type: this.setIntervalType,
        ending: {
          type: this.setEndingType,
          value: this.setEndingValue,
        },
      };

      console.log({ name, projectId, templateId, startDate, endDate, status, channels, filters, event });
      this.$store.dispatch('mailingCreate',
          { name, projectId, templateId, startDate, endDate, status, channels, filters, event });
    },
  },

  computed: mapGetters(['getAllMailings', 'getStatusAdditionallyMailing']),
  mounted() {
    this.$store.dispatch('getAllData');
    // this.$store.dispatch('getProjects');
    // this.$store.dispatch('getTemplates');
    moment.locale('en');
    const YEARS = () => {
      const years = [];
      const dateStart = moment('2019');
      const dateEnd = moment()
          .add(10, 'y');
      while (dateEnd.diff(dateStart, 'years') >= 0) {
        years.push(dateStart.format('YYYY'));
        dateStart.add(1, 'year');
      }
      return years;
    };

    this.years = YEARS();
    this.months = moment.monthsShort();
    this.currentDate = moment(new Date())
        .format('DD/MM/YYYY');
  },
};
</script>

<style lang="scss">
@import "../style/components/mailing";
@import "../style/components/elements/calendar";
</style>
