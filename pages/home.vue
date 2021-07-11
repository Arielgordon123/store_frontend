<template>
  <div>
    <v-container>
      <v-row justify="end">
        <v-col cols="3" sm="4">
          <v-row justify="center">
            <div class="text-center">
             <cartDropDown/>
            </div>
          </v-row>
        </v-col>
      </v-row>

      <v-row fluid v-if="$store.state.products.length > 0">
        <v-col
          v-for="product in $store.state.products"
          :key="product.id"
          cols="12"
          lg="3"
        >
          <product :product="product"></product>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import product from '~/components/product'
import cartDropDown from '~/components/cartDropDown'

export default {
  components: {
    product,
    cartDropDown
  },
  methods: {
    addNewCat() {
      this.itemToEdit = {}
      this.addDialog = true
    },
    clearEdit() {
      // console.log('clear edit');
      this.itemToEdit = null
      this.addDialog = false
    },
  },
  data() {
    return {
      products: [],
     
      dialog: false,
      addDialog: false,
      itemToEdit: null,
      method: 'new',
      fav: true,
      menu: false,
      message: false,
      hints: true,
    }
  },
  asyncData({ store, params, addBtn }) {
    return store.dispatch('getAllProducts')
  },
}
</script>
