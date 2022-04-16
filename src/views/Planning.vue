<template>
    
<div>
  <div class="page-title">
    <h3>{{"Menu_planning" | localize}}</h3>
    <h4 v-if="!loading">{{info.bill | currency('BYN')}}</h4>
  </div>
  <loader v-if="loading"/>
   <p v-else-if="!categories.length" class="center">
      {{"No_Categories" | localize}}
      <router-link to="/categories">{{"Add_category" | localize}}</router-link>
    </p>
  <section v-else>
    <div v-for="cat in categories" :key="cat.id">
      <p>
        <strong>{{cat.title}}:</strong>
        {{cat.spent | currency('BYN')}} из {{cat.limit | currency('BYN')}}
      </p>
      <div class="progress" v-tooltip="cat.tooltip">
        <div
            class="determinate"
            :style="{width:`${cat.progressPercent}%`}"
            :class="[cat.progressColor]"
        ></div>
      </div>
    </div>
  </section>
</div>
</template>
<script>
import Loader from '../components/app/Loader.vue'
import {mapGetters} from 'vuex'
import currencyFilter from '../filters/currency.filter'
import localazeFilter from '../filters/localize.filter'

export default {
  name: 'planning',
  components: { Loader },
  data: () => ({
    loading:true,
    categories: []
  }),
  computed: {
    ...mapGetters(['info'])
  },
  metaInfo: {
    title: 'Planning'
  },

  async mounted() {
    const records = await this.$store.dispatch('fetchRecords')
    const categories = await this.$store.dispatch('fetchCategories')

    this.categories = categories.map(cat => {
      const spent = records
      .filter(rec => rec.categoryId === cat.id)
      .filter(rec => rec.type ==='outcome')
      .reduce((acc, item) => acc + +item.amount, 0)
      const percent = spent/cat.limit*100
      const progressPercent = percent > 100 ? 100 : percent
      const progressColor = percent < 60 ? 'green' : percent < 100 ? 'yellow' : 'red'
      const tooltipValue = cat.limit - spent
      const tooltip = tooltipValue < 0 ? `${localazeFilter("Exceeding_by")} ${currencyFilter(Math.abs(tooltipValue))}` : `${localazeFilter("Remains")} ${currencyFilter(Math.abs(tooltipValue))}`
      return {
        ...cat,
        progressPercent,
        progressColor,
        spent,
        tooltip
      }
    })
    this.loading = false
  },
}
</script>