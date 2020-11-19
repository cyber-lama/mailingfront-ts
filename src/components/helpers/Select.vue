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
            this.$emit('setItem', item.id);
            this.showItems();
          }
        });
      } else {
        this.selectedItems = event;
        this.showItems();
        this.$emit('setItem', event);
      }
    },
  },
};
</script>

<style type="scss" scoped>
.select {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 35px;

  &__wrapper {
    position: relative;
    width: 100%;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    border: 1px solid #C4C4C4;
    background-color: #ffffff;
    &::before {
      position: absolute;
      right: 10px;
      top: 45%;
      content: "";
      border-top: 7px solid rgba(0, 0, 0, 0.25);
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid transparent;

    }
  }

  .active {
    &::before {
      transform: rotate(180deg);
      top: 30%;
    }
  }

  &__label {
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    font-family: "PoppinsRegular", "Arial", sans-serif;
    min-width: 200px;
    width: 200px;

  }

  &__placeholder,
  &__title {
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #C4C4C4;
    font-family: "PoppinsRegular", "Arial", sans-serif;
    padding: 10px;
  }

  &__title {
    color: #000000;
  }

  &__list {
    list-style: none;
    margin: 0;
    position: absolute;
    top: 40px;
    left: 0;
    background-color: #ffffff;
    padding: 10px 20px;
    z-index: 2;
    width: 90%;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
  }
  &__item {
    &:not(:nth-of-type(1)) {
      margin-top: 15px;
    }
    padding: 5px;
    font-weight: 500;
    font-size: 18px;
    line-height: 21px;
    color: #000000;
    cursor: pointer;
    &:hover {
      color: #4d4d4d;
    }
  }
}


</style>
