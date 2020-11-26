<template>
  <div :class="className">
    <p class="select__label">{{ this.label }}</p>
    <div class="select__wrapper" @click="showItems()" :class="showAllItems ? 'active' : '' ">
      <p v-if="selectedItems" class="select__title" :data-id="id">{{ selectedItems }}</p>
      <p v-else class="select__placeholder" :data-id="id">{{ this.placeholder }}</p>
      <ul class="select__list" v-if="showAllItems">
        <li class="select__item" v-for="(item, index) in this.items" :key="index">
          <p class="select__item-text" @click="(event) =>
         setSelectedItems(typeof items[0] === 'object' ? item.id : event.target.textContent)">
            {{ typeof items[0] === 'object' ? item.name : item }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Select',
  props: ['items', 'label', 'placeholder', 'id'],
  mounted() {
    // console.log(this.items)
    const app = document.getElementById('app');
    app.addEventListener('click', (event) => {
      const target = event.target;
      const isSelect = target.getAttribute('data-id');
      if (!(parseInt(isSelect) === this.id)) {
        // console.log('target die');
        this.showItems(false);
      }
    });
  },
  data() {
    return {
      showAllItems: false,
      selectedItems: '',
      className: 'select',
    };
  },
  methods: {
    showItems(status = null) {
      this.showAllItems = status !== null ? status : !this.showAllItems;
    },
    setSelectedItems(event) {
      if (typeof this.items[0] === 'object') {
        this.items.map((item) => {
          if (item.id === event) {
            this.selectedItems = item.name;
            this.$emit('set-item', item.id);
            this.showItems();
          }
        });
      } else {
        this.selectedItems = event;
        this.showItems();
        this.$emit('set-item', event);
      }
    },
  },
};
</script>

<style type="scss">
@import "../../style/components/helpers/select.scss";
</style>
