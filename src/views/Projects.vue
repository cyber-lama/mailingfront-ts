<template>
  <section class="projects">
    <div class="projects__logout-wr">
      <Logout/>
    </div>
    <div class="projects__wrapper">

      <div class="projects__all">
        <h2 class="projects__title">Список проектов</h2>
        <p v-if="projectList.length === 0">нет проектов</p>
        <ol class="projects__list">
          <li v-for="(item, index) in this.$store.getters.projectsList"
              :key="index"
              class="projects__item"
          >{{ item.name }}
            <button>Редактировать</button>
          </li>
        </ol>
      </div>
      <div class="projects__add">
        <h2 class="projects__title"> Добавить проекты</h2>
        <label class="projects__form-input-label"> Имя проекта
          <input v-on:input="(event) => setProjectName(event)"
                 class="projects__form-input"
                 type="text" placeholder="Имя проекта"/>
        </label>
        <label class="projects__form-input-label"> Код проекта
          <input v-on:input="(event) => setProjectCode(event)"
                 class="projects__form-input" type="text"
                 placeholder="Задается один раз для идентификации"/>
        </label>
        <button v-on:click="() => submit()" class="projects__form-submit">Добавить</button>
      </div>
    </div>
  </section>
</template>

<script>
import Logout from '@/components/auth/Logout';

export default {
  name: 'Projects',
  components: { Logout },
  data() {
    return {
      projectList: this.$store.getters.projectsList,
      name: '',
      code: '',
    };
  },
  mounted() {
    this.$store.dispatch('getProjectPage')
        .then((response) => {
          const responseData = response.data;
          this.$store.dispatch('setProjectsList', responseData.data);
        });
  },
  methods: {
    setProjectName(event) {
      this.name = event.target.value;
    },
    setProjectCode(event) {
      this.code = event.target.value;
    },
    submit() {
      const name = this.name;
      const code = this.code;
      this.$store.dispatch('addProject', { name, code });
    },

  },
};
</script>

<style lang="scss">
@import "../style/components/projects";
</style>
