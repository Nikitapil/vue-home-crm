<template>
  <div v-if="!loading">
    <div class="page-title">
      <h3>{{'ProfileTitle' | localize}}</h3>
    </div>

    <form class="form" @submit.prevent="submitHandler">
      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="name"
          :class="{
            invalid: $v.name.$dirty && !$v.name.required,
          }"
        />
        <label for="description">{{'Name' | localize}}</label>
        <small
          v-if="$v.name.$dirty && !$v.name.required"
          class="helper-text invalid"
          >{{"Message_EnterName" | localize}}</small
        >
      </div>
      <div class="switch">
        <label>
          English
          <input type="checkbox" v-model="isRuLocale" />
          <span class="lever"></span>
          Русский
        </label>
      </div>
      <button class="btn waves-effect waves-light" type="submit">
        {{"Refresh" | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  data() {
    return {
      name: "",
      isRuLocale: true,
      loading: true
    };
  },
  metaInfo: {
    title: 'Profile'
  },
  computed: {
    nameValue() {
      return this.$store.getters.info.name
    },
    localeValue() {
      return this.$store.getters.info.locale
    }
  },
  validations: {
    name: { required },
  },
  async mounted() {
    this.name = this.nameValue;
    this.isRuLocale = this.localeValue === 'ru-RU'
    this.loading  = false
    setTimeout(() => {
      M.updateTextFields();
    }, 0);
  },
  methods: {
    ...mapActions(['updateInfo']),
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      try {
          await this.updateInfo({name: this.name, locale: this.isRuLocale ? 'ru-RU' : 'en-US'})
      } catch (error) {}
    },
  },
};
</script>
<style scoped>
.switch {
  margin-bottom: 2rem;
}
</style>