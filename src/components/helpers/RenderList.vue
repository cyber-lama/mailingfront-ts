<template>
  <div>
    <h3 class="item__title">{{ listItems }}</h3>
    <ul class="item__list">
      <li v-for="(item, index) in this.items" :key="index" -->
        v-on:click="(event) => setSelectedValue(event.currentTarget.textContent, 'day')"
        >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">

export default {
  props: {
    items: Array,
  },
  name: 'RenderList',
  data() {
    return {
      listItems: '',
    };
  },
  methods: {
    setSelectedValue(value, variable) {
      this[variable] = value;
    },
  },
  mounted() {
    console.log(this.items);
  }
};
</script>

