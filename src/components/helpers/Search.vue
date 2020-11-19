<template>
  <div class="search__form">
    <label class="search__form-input-label">
      <input v-model="searchValue"
             v-on:keyup.enter="search"
             class="search__form-input"
             type="text" :placeholder="placeholder"/>
      <button class="search__form-button-icon" v-on:click="search"></button>
    </label>
    <button class="search__form-button blue" v-on:click="search">поиск</button>
  </div>

</template>

<script>

export default {
  props: {
    values: Array,
    placeholder: {
      type: String,
      default: 'Введите...',
    },
    mutation: { // Сюда передаем название мутации состояния списка, по которому ищем
      type: String,
      required: true,
    },
    action: { // Сюда передаем название action, в случае если запрос пустой, обновим весь список
      type: String,
      required: true,
    },
  },
  data() {
    return {
      searchValue: '',
    };
  },
  methods: {
    search() {
      this.$emit('searched', true);
      const reloadAllitems = new Promise((resolve) => {
        this.$store.dispatch(this.action);
        setTimeout(() => {
          resolve();
        }, 1000);
      });
      reloadAllitems.then(() => {
        if (this.searchValue.length > 0) {
          const filtered = this.values.filter(
              item => item.name.toLowerCase().indexOf(this.searchValue.toLowerCase()) !== -1,
          );
          this.$store.commit(this.mutation, filtered);
        } else this.$store.dispatch(this.action);
      });
    },
  },
};
</script>

<style lang="scss">
@import '../../style/components/helpers/search';
</style>
