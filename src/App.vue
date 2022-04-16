<template>
  <div id="app">
    <component v-if="!loading" :is="layout">
    </component>
  </div>
</template>

<script>
import EmptyLayout from '@/layouts/EmptyLayout'
import MainLayout from '@/layouts/MainLayout'
export default {
  components: {
    EmptyLayout, MainLayout
  },
  data() {
    return {
      loading: true
    }
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    }
  },
  async mounted() {
    try {
    await this.$store.dispatch('fetchInfo')
    } catch (e){}
    this.loading = false
  }
}
</script>

<style lang="scss">
@import '~materialize-css/dist/css/materialize.min.css';
@import 'assets/index.css'
</style>
