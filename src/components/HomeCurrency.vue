<template>
  <div class="col s12 m6 l8">
    <div class="card orange darken-3 bill-card">
      <div class="card-content white-text">
        <div class="card-header">
          <span class="card-title">{{"Currency_rates" | localize}}</span>
        </div>
        <table>
          <thead>
            <tr>
              <th>{{"Currency" | localize}}</th>
              <th>{{"Rates" | localize}}</th>
              <th>{{"Date" | localize}}</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="currency in currencies" :key="currency">
              <td>{{currency}}</td>
              <td>{{rates[currency].toFixed(2)}}</td>
              <td>{{new Date(date) | date('date')}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
        currencies: ['BYN', 'USD', 'EUR']
        }
    },
    props: ['rates', 'date']
}
</script>