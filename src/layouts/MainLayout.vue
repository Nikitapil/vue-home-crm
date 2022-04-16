<template>
    <div  class="app-main-layout">
        <nav-bar @click="isOpen = !isOpen" :key="locale + 1"/>
        <side-bar :value="isOpen" :key="locale" />
      <main class="app-content" :class="{'full': !isOpen}">
        <div class="app-page">
            <router-view/>
        </div>
      </main>
  
      <div class="fixed-action-btn" v-tooltip="toLocale('Create_record')">
        <router-link class="btn-floating btn-large blue" to="/record">
          <i class="large material-icons">add</i>
        </router-link>
      </div>
    </div>
</template>
<script>
import NavBar from '@/components/app/NavBar'
import SideBar from '@/components/app/SideBar'
import Loader from '../components/app/Loader.vue'
import messages from '../utils/messages'
import localazeFilter from '../filters/localize.filter'
export default {
    data:() => ({
        isOpen:true,
        toLocale: localazeFilter
    }),
    name: 'main-layout',
    components: {
        NavBar, SideBar,
        Loader
    },
    computed: {
    error() {
      return this.$store.getters.error
    },
    locale() {
      return this.$store.getters.info.locale
    }
  },
  watch: {
    error(fbError) {
      this.$error(messages[fbError] || 'Что-то пошло не так')
    },
  },
   async mounted() {
       if (!Object.keys(this.$store.getters.info).length) {
        await this.$store.dispatch('fetchInfo')
       }
    }
}
</script>