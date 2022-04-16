<template>
    <div>
      <loader v-if="loading" />
  <div v-else-if="record.categoryName">
    <div class="breadcrumb-wrap">
      <router-link to="/history" class="breadcrumb">{{"Menu_history" | localize}}</router-link>
      <a class="breadcrumb">
        {{record.type === 'income' ? "Income" : "Outcome" | localize}}
      </a>
    </div>
    <div class="row">
      <div class="col s12 m6">
        <div class="card" :class="{
          'red': record.type === 'outcome',
          'green': record.type === 'income'
        }">
          <div class="card-content white-text">
            <p>{{"Description" | localize}}: {{record.description}}</p>
            <p>{{"Summary" | localize}}:{{record.amount | currency}}</p>
            <p>{{"Category" | localize}}:{{record.categoryName}}</p>

            <small>{{new Date(record.date) | date('date')}}</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <p class="center" v-else>Такой записи нет</p>
</div>
</template>
<script>
import Loader from '../components/app/Loader.vue'
export default {
  components: { Loader },
  data() {
    return {
      record: null,
      loading: true
    }
  },
  metaInfo: {
    title: 'Record'
  },
  async mounted() {
   const record = await this.$store.dispatch('fetchRecordById', this.$route.params.id)
   const category = await this.$store.dispatch('fetchCategoryById', record.categoryId)
   this.record = {
     ...record,
     categoryName: category.title
   }
   this.loading = false
  }
}
</script>