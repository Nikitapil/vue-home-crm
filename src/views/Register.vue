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
          >{{"Password_should_be" | localize(locale)}} {{ $v.password.$params.minLength.min }} {{"Symbols" | localize(locale)}}.</small>
      </div>
      <div class="input-field">
        <input
          id="name"
          type="text"
          class="validate"
          v-model.trim="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required,
          }"
        />
        <label for="name">{{"Name" | localize(locale)}}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
          >{{"Message_EnterName" | localize(locale)}}</small
        >
      </div>
       <div class="input-field">
        <input
          id="bill"
          type="number"
          class="validate"
          v-model.number="bill"
          :class="{
            invalid: $v.bill.$dirty && !$v.bill.required,
          }"
        />
        <label for="bill">{{"Starting_Bill" | localize(locale)}}</label>
        <small
          v-if="$v.bill.$dirty && !$v.bill.required"
          class="helper-text invalid"
          >{{"Starting_Bill" | localize(locale)}}</small
        >
      </div>
      <div class="input-field">
          <select ref="select" v-model="lang">
            <option value="ru-RU">Русский</option>
            <option value="en-US">English</option>
          </select>
          <label>{{"language" | localize(locale)}}</label>
        </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree" />
          <span>{{"Agree_with_terms" | localize(locale)}}</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button class="btn waves-effect waves-light auth-submit" type="submit">
          {{"Sign_up" | localize(locale)}}
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        {{"Already_registered" | localize(locale)}}
        <router-link to="/login">{{"Sign_in" | localize(locale)}}!</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import { email, required, minLength, numeric } from "vuelidate/lib/validators";
export default {
  name: "register",
  data() {
    return {
      email: "",
      password: "",
      name: "",
      agree: false,
      localeInput: true,
      bill: 0,
      lang: 'ru-RU',
      select: null,
    };
  },
  computed: {
    locale() {
      return this.localeInput ? 'ru-RU' : 'en-US'
    }
  },
  validations: {
    email: { email, required },
    password: { required, minLength: minLength(6) },
    name: { required },
    agree: { checked: (v) => v },
    bill: {numeric},
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      const formData = {
        email: this.email,
        password: this.password,
        name: this.name,
        bill: this.bill,
        locale: this.lang
      };
      try {
        await this.$store.dispatch("register", formData);
      this.$router.push("/");
      } catch (error) {
      }
    },
  },
  mounted() {
     setTimeout(() => {
      this.select = M.FormSelect.init(this.$refs.select);
      M.updateTextFields();
    }, 0);
  },
   beforeDestroy() {
    if (this.select && this.select.destroy) {
      this.select.destroy();
    }
  },
  metaInfo: {
    title: 'Register'
  },
};
</script>
<style scoped>
.switch {
  margin-bottom: 1rem;
}
</style>