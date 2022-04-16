<template>
  <div>
    <div class="page-title">
      <h3>{{"New_record" | localize}}</h3>
    </div>

    <loader v-if="loading" />

    <p v-else-if="!categories.length" class="center">
      {{"No_Categories" | localize}}
      <router-link to="/categories">{{"Add_category" | localize}}</router-link>
    </p>

    <form v-else class="form" @submit.prevent="handleSubmit">
      <div class="input-field">
        <select ref="select" v-model="category">
          <option v-for="cat in categories" :value="cat.id" :key="cat.id">
            {{ cat.title }}
          </option>
        </select>
        <label>{{"Choose_category" | localize}}</label>
      </div>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="income"
            v-model="type"
          />
          <span>{{"Income" | localize}}</span>
        </label>
      </p>

      <p>
        <label>
          <input
            class="with-gap"
            name="type"
            type="radio"
            value="outcome"
            v-model="type"
          />
          <span>{{"Outcome" | localize}}</span>
        </label>
      </p>

      <div class="input-field">
        <input
          id="amount"
          type="number"
          v-model.number="amount"
          :class="{ invalid: $v.amount.$dirty && !$v.amount.minValue }"
        />
        <label for="amount">{{"Summary" | localize}}</label>
        <span
          v-if="$v.amount.$dirty && !$v.amount.minValue"
          class="helper-text invalid"
          >{{"Min_value" | localize}} {{ $v.amount.$params.minValue.min }}</span
        >
      </div>

      <div class="input-field">
        <input
          id="description"
          type="text"
          v-model="description"
          :class="{
            invalid: $v.description.$dirty && !$v.description.required,
          }"
        />
        <label for="description">{{"Description" | localize}}</label>
        <span
          v-if="$v.description.$dirty && !$v.description.required"
          class="helper-text invalid"
          >{{"Enter_Description" | localize}}</span
        >
      </div>

      <button class="btn waves-effect waves-light" type="submit">
        {{"Create" | localize}}
        <i class="material-icons right">send</i>
      </button>
    </form>
  </div>
</template>
<script>
import Loader from "../components/app/Loader.vue";
import { required, minValue } from "vuelidate/lib/validators";
import { mapGetters } from "vuex";
export default {
  components: { Loader },
  name: "record",

  data() {
    return {
      loading: true,
      categories: [],
      select: null,
      category: null,
      type: "outcome",
      amount: 1,
      description: "",
    };
  },
  metaInfo: {
    title: 'Record'
  },

  validations: {
    description: { required },
    amount: { minValue: minValue(1) },
  },

  async mounted() {
    this.categories = await this.$store.dispatch("fetchCategories");
    if (this.categories.length) {
      this.category = this.categories[0].id;
    }
    this.loading = false;
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
  computed: {
    ...mapGetters(["info"]),
    canCreateRecord() {
      if (this.type === "income") {
        return true;
      }

      return this.info.bill >= this.amount;
    },
  },
  methods: {
    async handleSubmit() {
      if (this.$v.$invalid) {
        this.$v.$touch();
        return;
      }
      if (this.canCreateRecord) {
        try {
          await this.$store.dispatch("createRecord", {
            categoryId: this.category,
            amount: this.amount,
            description: this.description,
            type: this.type,
            date: new Date().toDateString(),
          });
          const bill = this.type === "income" ? this.info.bill + this.amount : this.info.bill - this.amount
          await this.$store.dispatch('updateInfo', {bill})
          this.$message('Запись успешно создана')
          this.$v.$reset()
          this.amount = 1
          this.description = ''
        } catch (error) {}
      } else {
        this.$message(
          `Недостаточно средств на счете (${this.amount - this.info.bill})`
        );
      }
    },
  },
};
</script>