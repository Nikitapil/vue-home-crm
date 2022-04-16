<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">{{"Bill_by_Currency" | localize}}</span>

        <p 
        v-for="currency in currencies"
        :key="currency"
        class="currency-line">
        <loader v-if="isNaN(getCurrency(currency))"/>
            <span v-else>{{getCurrency(currency) | currency(currency)}}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import Loader from './app/Loader.vue'
export default {
  components: { Loader },
    data: () => ({
        currencies: ['BYN', 'USD', 'EUR']
    }),
    props: ['rates'],
    computed: {
        base() {
            return this.$store.getters.info.bill / (this.rates['BYN'] / this.rates['EUR'])
        }
    },
    methods: {
        getCurrency(currency) {
          return (this.base* this.rates[currency]).toFixed(2)
        }
    }
}
</script>