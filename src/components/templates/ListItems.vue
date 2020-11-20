<template>
  <div class="list__items">
    <div class="list__title">
      <div class="list__title-id">№</div>
      <div class="list__title-name">Название</div>
      <div class="list__title-created_at">Дата и время создания
        <div class="group__buttons-arrow">
          <button
            :disabled="sortingDirection === 'up'"
            @click="sortByData('up')"
            class="arrow arrow-top">
            <img src="static/images/icons/arrow-top.svg" alt="">
          </button>
          <button
            :disabled="sortingDirection === 'bottom'"
            @click="sortByData('bottom')"
            class="arrow arrow-bottom">
            <img src="static/images/icons/arrow-bottom.svg" alt="">
          </button>
        </div>
      </div>
      <div v-if="comments" class="list__title-comment">Комментарий</div>
      <div v-if="projects" class="list__title-project">Проект</div>
      <div v-if="events" class="list__title-events">Повторения</div>
      <div v-if="channels" class="list__title-channels">Канал</div>
      <div v-if="status" class="list__title-status">Статус</div>
      <div class="list__title-action">Действия</div>
    </div>
    <ListItem v-for="(template, index) in paginatedData"
              :item="template"
              :index="index"
              :key="template.id"
              :size="4"
              :arrayLength="paginatedData.length"
    ></ListItem>
    <div v-if="paginatedData.length" class="list__pagination">
      <button
        :disabled="pageNumber === 0"
        @click="prevPage">
        <img src="/static/images/icons/arrow-left.svg" alt="arrow-left">
      </button>
      <ul>
        <li v-for="index in pageCount" :key="index.id"  :disabled="pageNumber === index - 1? '' : disabled" @click="goPage(index)">
          {{index}}
        </li>
      </ul>
      <button
        :disabled="pageNumber >= pageCount -1"
        @click="nextPage">
        <img src="/src/img/transfer-sent-watch.svg" alt="arrow-right">
        <img alt="Vue logo" src="@/assets/logo.png">
      </button>
    </div>
  </div>
</template>

<script>
import ListItem from './ListItem';


export default {
  components: { ListItem },
  name: 'ListItems',
  data() {
    return {
      pageNumber: 0,
      size: 4,
      sortingDirection: '',
    };
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    comments: { // Ниже идут поля, которые мы включаем пропсом
      type: Boolean,
      default: false,
    },
    projects: {
      type: Boolean,
      default: false,
    },
    events: {
      type: Boolean,
      default: false,
    },
    channels: {
      type: Boolean,
      default: false,
    },
    status: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    // пагинация
    reset() {
      this.sortingDirection = '';
      this.pageNumber = 0;
    },
    nextPage() {
      this.pageNumber++;
      return true;
    },
    prevPage() {
      this.pageNumber--;
      return true;
    },
    goPage(p) {
      this.pageNumber = p - 1;
      return true;
    },
    // сортировка
    sortByData(direction) {
      const arr = this.items.slice(0);
      const n = arr.length;
      this.sortingDirection = direction;
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - 1 - i; j++) {
          if (direction === 'up') {
            if (arr[j + 1].created_at < arr[j].created_at) {
              const t = arr[j + 1];
              arr[j + 1] = arr[j];
              arr[j] = t;
            }
          } else if (arr[j + 1].created_at > arr[j].created_at) {
            const t = arr[j + 1];
            arr[j + 1] = arr[j];
            arr[j] = t;
          }
        }
      }
      this.$store.commit('updateTemplates', arr);
      return true;
    },
  },
  computed: {
    pageCount() {
      const l = this.items.length;
      const s = this.size;
      return Math.ceil(l / s);
    },
    paginatedData() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      console.log(start, end, this.items)
      return this.items.slice(start, end);
    },
  },
  mounted() {
    console.log(this.items);
  },
};
</script>
