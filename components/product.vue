<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="250"
      :src="product.imageUrl"
    ></v-img>

    <v-card-title>
      <div class="mx-5">
        <span class="title blue--text">{{ product.name }}</span>
      </div>
    </v-card-title>
    <div class="mx-5">
      <span class="">
        {{ product.desc.split(' ').splice(0, 5).join(' ') }}
      </span>
    </div>
    <div class="mx-5">
      <span class="title"> {{ product.price }}$</span>
    </div>

    <v-card-actions>
      <!-- <v-col cols="3" sm="4"> -->
      <v-row justify="center" class="ma-1">
        <v-btn color="deep-purple lighten-2" @click="addToCart"> Buy </v-btn>
      </v-row>
      <!-- </v-col> -->
    </v-card-actions>
  </v-card>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      loading: false,
      selection: 1,
    }
  },

  methods: {
    ...mapActions([
      'addProductToCart', // map `this.increment()` to `this.$store.dispatch('increment')`
    ]),
    addToCart() {
      this.loading = true
      this.addProductToCart(this.product)
      setTimeout(() => (this.loading = false), 1000)
    },
  },
}
</script>
<style lang="scss">
.title {
  text-decoration: none;
}
</style>
