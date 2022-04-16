<template>
    <table>
      <thead>
      <tr>
        <th>#</th>
        <th>{{"Summary" | localize }}</th>
        <th>{{"Date" | localize}}</th>
        <th>{{"Category" | localize}}</th>
        <th>{{"Type" | localize}}</th>
        <th>{{"Open" | localize}}</th>
      </tr>
      </thead>

      <tbody>
      <tr v-for="(record, idx) in records" :key="record.id">
        <td>{{idx + 1}}</td>
        <td>{{record.amount | currency}}</td>
        <td>{{new Date(record.date) | date}}</td>
        <td>{{record.categoryName}}</td>
        <td>
          <span class="white-text badge" :class="record.typeClass">{{record.typeText}}</span>
        </td>
        <td>
          <button class="btn-small btn" v-tooltip="'Открыть'" @click="$router.push(`/detail/${record.id}`)">
            <i class="material-icons">open_in_new</i>
          </button>
        </td>
      </tr>
      </tbody>
    </table>
</template>
<script>
export default {
    props: {
        records: {
            required: true,
            type: Array
        }
    }
}
</script>