<template>
  <section class="templates">
    <div v-if="!this.getStatusAdditionally" class="templates__all">
      <div class="header__wrapper">
        <h1 class="header__wrapper-title">
          Список шаблонов
        </h1>
        <Logout/>
      </div>
      <div class="search__wrapper">
        <Search :values="getAllTemplates"
                placeholder="Введите название шаблона"
                mutation="updateTemplates"
                action="getTemplates"
                @searched="resetSettings"/>
        <button class="search__wrapper-button green" @click="createTemplates">Создать</button>
      </div>
      <div class="list__wrapper">
        <div class="list__wrapper-content">
          <ListItems
            ref="list_items"
            :items="getAllTemplates"
            :comments=true
          />
        </div>
      </div>
    </div>

    <div v-if="this.getStatusAdditionally" class="templates__all">
      <div class="header__wrapper">
        <h1 class="header__wrapper-title">
           {{getEditElement.id ? 'Редактирование шаблона ' + getEditElement.name : 'Добавление шаблона'}}
        </h1>
        <Logout/>
      </div>
      <div class="list__wrapper">
        <div class="list__wrapper-content edit-add">
          <label class="list__form-input-label">
            <span>
            Название шаблона</span>
            <input v-on:input="(event) => setSelectedValue(event.currentTarget.value, 'name')"
                   class="templates__form-input"
                   type="text" placeholder="Название шаблона"
                   v-bind:value="getEditElement ? getEditElement.name : ''"/>
          </label>
          <label class="list__form-input-label">
            <span>
            Текст шаблона</span>
            <textarea v-on:input="(event) => setSelectedValue(event.currentTarget.value, 'message')"
                      class="templates__form-input message"
                      placeholder="Текст шаблона"
                      :maxlength="maxMessage"
                      v-bind:value="getEditElement ? getEditElement.message : ''"/>
          </label>
          <label class="list__form-input-label">
            <span>Комментарий</span>
            <textarea v-on:input="(event) => setSelectedValue(event.currentTarget.value, 'comment')"
                      class="templates__form-input comment"
                      placeholder="Комментарий"
                      v-bind:value="getEditElement ? getEditElement.comment : ''"/>
          </label>
        </div>
      </div>
      <div class="list__buttons">
        <button v-if="!getEditElement.id" @click="addNewTemplate" class="projects__form-submit">Сохранить
        </button>
        <button v-if="getEditElement.id" @click="saveEditTemplates" class="projects__form-submit">Обновить
        </button>
        <button  @click="closeAdditionallyTemplate" class="projects__form-submit red">Назад
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex';
import Logout from '@/components/auth/Logout';
import Search from '@/components/helpers/Search';
import ListItems from '@/components/templates/ListItems';

export default {
  components: { Logout, Search, ListItems },
  name: 'Templates',
  data() {
    return {
      sortingDirection: '',
      preloader: false,
      maxMessage: 19,
      text: '',
    };
  },
  methods: {
    resetSettings(eventData) {
      this.preloader = eventData;
      this.$refs.list_items.reset();
    },
    setSelectedValue(value, variable) {
      this[variable] = value;
    },
    createTemplates() {
      this.$store.commit('controlAdditionallyTemplate', true);
      console.log(this.getEditElement);
    },
    addNewTemplate() {
      const name = this.name;
      const message = this.message;
      const comment = this.comment;
      this.$store.dispatch('createTemplates', { name, message, comment });
    },
    saveEditTemplates() {
      const id = this.getEditElement.id;
      const name = this.name;
      const message = this.message;
      const comment = this.comment;
      this.$store.dispatch('editTemplate', { id, name, message, comment });
    },
    closeAdditionallyTemplate() {
      this.$store.commit('controlAdditionallyTemplate', false);
    },
  },
  computed: mapGetters(['getAllTemplates', 'getStatusAdditionally', 'getEditElement']),
  async mounted() {
    this.$store.dispatch('getTemplates');
  },
};
</script>

<style lang="scss">
@import '@/style/components/templates/templates';
</style>
