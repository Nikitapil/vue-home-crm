<template>
  <div>
    <div class="page-title">
      <h3>{{"Categories" | localize}}</h3>
    </div>
    <section>
      <loader v-if="isLoading"/>
      <div v-else class="row">
        <category-create @created="addNewCategory" />
        <category-edit v-if="categories.length" :categories="categories" @updated="updateCategories" :key="categories.length + updateCount" />
        <p v-else>{{"No_Categories" | localize}}</p>
      </div>
    </section>
  </div>
</template>

<script>
import CategoryCreate from '../components/CategoryCreate'
import CategoryEdit from '../components/CategoryEdit'
import Loader from '../components/app/Loader.vue'

export default {
  name: 'categories',
  components: {
    CategoryCreate, CategoryEdit, Loader
  },
  data() {
    return {
      categories: [],
      isLoading: true,
      updateCount: 0
    }
  },
  metaInfo: {
    title: 'Categories'
  },
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
      this.updateCount++
    },
    updateCategories(category) {
      const idx = this.categories.findIndex(c => c.id === category.id)
      this.categories[idx].title = category.title
      this.categories[idx].limit = category.limit
      this.updateCount++
    }
  },
 async mounted() {
   this.categories = await this.$store.dispatch('fetchCategories')
   this.isLoading = false
  },
}
</script>