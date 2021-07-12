<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Top 5</v-card-title>
          <v-card-text>
            <v-list v-for="t in $store.state.stats.top" :key="t.id">
              <v-list-item> {{ t.product[0].name }} {{ t.count }} </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card>
          <v-card-title>Top 5 unique</v-card-title>
          <v-list v-for="t in $store.state.stats.unique" :key="t.id">
            <v-list-item> {{ t.product[0].name }} {{ t.count }} </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col>
        <v-card
          ><v-card-title>past 5 days</v-card-title>
          <v-list v-for="t in $store.state.stats.last" :key="t.id">
            <v-list-item> {{ t._id.date }} {{ t.total }} </v-list-item>
          </v-list>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  components: {},
  asyncData({ store }) {
    return store.dispatch('getAllStats')
  },
  data() {
    return {
      stats: [],
    }
  },
}
</script>

<style scoped></style>
