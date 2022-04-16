<template>
  <ul class="sidenav app-sidenav" :class="{'open': value}">
    <router-link
      v-for="link in links"
      :key="link.title"
      tag="li"
      active-class="active"
      :to="link.url"
      exact
    >
      <a class="waves-effect waves-orange pointer">{{ link.title }}</a>
    </router-link>
  </ul>
</template>
<script>
import localazeFilter from '../../filters/localize.filter'
export default {
  props: ['value'],
  data: () => ({
    links: [
      {
        title: localazeFilter("Menu_bill"),
        url: "/",
      },
      {
        title: localazeFilter("Menu_history"),
        url: "/history",
      },
      {
        title: localazeFilter("Menu_planning"),
        url: "/planning",
      },
      {
        title: localazeFilter("Menu_new_record"),
        url: "/record",
      },
      {
        title: localazeFilter("Menu_new_categories"),
        url: "/categories",
      },
    ],
  }),
};
</script>