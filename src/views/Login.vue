<template>
  <section class="login" @keyup="(event) => keySubmit(event)">
    <h1 class="login__title">Сервис автоматических рассылоккк</h1>
    <!--    <div class="auth__wrapper">-->
    <div class="login__form">
      <h2 class="login__form-title">
        Авторизация
      </h2>

      <input v-on:input="(event) => setEmail(event)"
             class="login__form-input"
             type="text" placeholder="Email"
             v-model="email"/>
      <input v-on:input="(event) => setPass(event)"
             class="login__form-input" type="text" placeholder="Пароль"
             v-model="password"/>
      <button v-on:click="() => submit()" class="login__form-submit">Вход</button>
      <!--      </div>-->
    </div>
  </section>
</template>

<script>
export default {

  name: 'Index',
  data() {
    return {
      email: '',
      password: '',
    };
  },

  methods: {
    setEmail(event) {
      this.email = event.target.value;
    },
    setPass(event) {
      this.password = event.target.value;
    },
    keySubmit(event) {
      if (event.keyCode === 13) {
        this.submit();
      }
    },
    setDevValue(event) {
      if (event.keyCode === 113) {
        this.email = 'dev@dev.local';
        this.password = 'pass';
        this.submit();
      }
    },
    submit() {
      const username = this.email;
      const password = this.password;
      this.$store.dispatch('login', { username, password });
    },

  },
  mounted() {
    if (process.env.NODE_ENV === 'development') {
      document.addEventListener('keyup', this.setDevValue);
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
@import "src/style/components/auth/login";
</style>

