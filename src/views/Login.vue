<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
       <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="localeInput" />
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <span class="card-title">{{"Home_finance" | localize(locale)}}</span>
      <div class="input-field">
        <input
          id="email"
          type="text"
          v-model.trim="email"
          :class="{
            invalid:
              ($v.email.$dirty && !$v.email.required) ||
              ($v.email.$dirty && !$v.email.email),
          }"
        />
        <label for="email">Email</label>
        <small
          v-if="$v.email.$dirty && !$v.email.required"
          class="helper-text invalid"
          >{{"No_empty_email" | localize(locale)}}</small
        >
        <small
          v-if="$v.email.$dirty && !$v.email.email"
          class="helper-text invalid"
          >{{"Enter_correct_email" | localize(locale)}}</small
        >
      </div>
      <div class="input-field">
        <input
          id="password"
          type="password"
          v-model.trim="password"
          :class="{
            invalid:
              ($v.password.$dirty && !$v.password.required) ||
              ($v.password.$dirty && !$v.password.minLength),
          }"
        />
        <label for="password">{{"Password" | localize(locale)}}</label>
        <small
          v-if="$v.password.$dirty && !$v.password.required"
          class="helper-text invalid"
          >{{"Enter_password" | localize(locale)}}</small
        >
        <small
          v-if="$v.password.$dirty && !$v.password.minLength"
          class="helper-text invalid"
          >{{"Password_should_be" | localize(locale)}} {{ $v.password.$params.minLength.min }} {{"Symbols" | localize(locale)}}.
         </small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{"Sign_in" | localize(locale)}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{"Not_register_yet" | localize(locale)}}
        <router-link to="/register">{{"Sign_up" | localize(locale)}}</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import { email, required, minLength } from "vuelidate/lib/validators";
import messages from '../utils/messages'
export default {
  name: "login",
  metaInfo: {
    title: 'Login'
  },
  data() {
    return {
      email: "",
      password: "",
      localeInput: true
    };
  },
  computed: {
    locale() {
      return this.localeInput ? 'ru-RU' : 'en-US'
    }
  },
  methods: {
   async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push("/");
      } catch (error) {
      }
    },
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
  },
  mounted() {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  }
};
</script>
<style scoped>
.switch {
  margin-bottom: 1rem;
}
</style>