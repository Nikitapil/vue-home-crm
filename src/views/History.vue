<template>
  <div>
    <div class="page-title">
      <h3>{{"Records_history" | localize}}</h3>
    </div>
    <loader v-if="loading" />
    <p v-else-if="records && !records.length">{{"No_records" | localize}}</p>
    <section v-else>
      <history-table :records="items" />

      <paginate
        v-model="page"
        :pageCount="pageCount"
        :clickHandler="pageChangeHandler"
        :prevText="toLocale('Previous')"
        :nextText="toLocale('Next')"
        :containerClass="'pagination'"
        :page-class="'waves-effect'"
      >
      </paginate>
    </section>
  </div>
</template>

<script>
import paginationMixins from "@/mixins/pagination.mixin";
import HistoryTable from "@/components/HistoryTable";
import Loader from "../components/app/Loader.vue";
import localazeFilter from '../filters/localize.filter'
export default {
  name: "history",
  mixins: [paginationMixins],
  components: {
    HistoryTable,
    Loader,
  },
  metaInfo: {
    title: 'History'
  },
  data() {
    return {
      loading: true,
      records: [],
      toLocale: localazeFilter
    };
  },
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");
    this.setupPagination(
      this.records.map((record) => {
        return {
          ...record,
          categoryName: categories.find((cat) => cat.id === record.categoryId)
            .title,
          typeClass: record.type === "income" ? "green" : "red",
          typeText: record.type === "income" ? localazeFilter("Income") : localazeFilter("Outcome"),
        };
      })
    );
    this.loading = false;
  },
};
</script>