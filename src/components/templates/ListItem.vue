<template>
  <div v-bind:class="['list__item', isLast ? 'last' : '']">
    <div class="list__item-id">{{ item.id }}</div>
    <div class="list__item-name">{{ item.name }}</div>
    <div class="list__item-created_at">{{ formattedDate(item.created_at) }}</div>
    <div v-if="item.comment" class="list__item-comment">{{ item.comment }}</div>
    <div v-if="item.project" class="list__item-project">{{ item.project }}</div>
    <div v-if="item.events" class="list__item-event">
      <ul>
        <li v-for="(event, index) in item.events">
         <span> {{ index }} </span> {{ event }}
        </li>
      </ul>
    </div>
    <div v-if="item.channels" class="list__item-channels">
      <ul>
        <li v-for="channel in item.channels">{{channel}}</li>
      </ul>
    </div>
    <div v-if="item.status" class="list__item-status">{{ item.status }}</div>
    <div class="list__item-actions">
      <button @click="showBlock" class="show">
        <img src="static/images/icons/templates-edit.svg" alt="">
      </button>
      <div v-show="opened" class="list__item-hideblock">
        <button @click="editTemplate">Редактировать</button>
        <!--        <button>Удалить</button>-->
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      opened: false,
      isLast: false,
    };
  },
  props: {
    item: {
      type: Object,
    },
    index: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: false,
      default: 10,
    },
    arrayLength: {
      type: Number,
      default: 0,
    },
  },
  filters: {
    formattedDate: d => (new Date(d)).toLocaleDateString(),
  },
  methods: {
    formattedDate(d) {
      const arr = (d.replace(/\-/g, '.')).split(/T/);
      return `${`${arr[1].slice(0, -8)} ${arr[0]}`}`;
    },
    editTemplate() {
      this.$store.commit('addObject', this.item);
    },
    showBlock() {
      const onClickOutside = (e) => {
        if (!this.$el.querySelector('.show').contains(e.target)) {
          this.opened = false;
        } else {
          this.opened = true;
        }
      };

      document.addEventListener('click', onClickOutside);
      this.$on('hook:beforeDestroy', () => document.removeEventListener('click', onClickOutside));
    },
  },
  mounted() {
    if ((this.index + 1) === this.arrayLength) {
      this.isLast = true;
    }
  },
};
</script>

<style lang="scss">
@import '../../style/components/templates/listItem';
</style>
