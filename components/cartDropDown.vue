<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-width="200"
    offset-y
  >
    <template #activator="{ on, attrs }">
      <v-btn color="indigo" dark v-bind="attrs" v-on="on">
        <v-icon>mdi-cart</v-icon> Cart ({{ cartItems().length }})
      </v-btn>
    </template>

    <v-card v-if="cartItems().length">
      <v-list>
        <v-list-item>
          <v-row>
            <v-col>
              <v-list-item-action> name</v-list-item-action>
            </v-col>
            <v-col>
              <v-list-item-action> quantity</v-list-item-action>
            </v-col>
            <v-col>
              <v-list-item-action>Price</v-list-item-action>
            </v-col>
          </v-row>
        </v-list-item>
        <v-list-item v-for="item in cartItems()" :key="item.id">
          <v-row>
            <v-col>
              <v-list-item-action> {{ item.name }}</v-list-item-action>
            </v-col>
            <v-col>
              <v-list-item-action>{{ item.count }} </v-list-item-action></v-col
            >
            <v-col>
              <v-list-item-action>{{ item.price }}$</v-list-item-action>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>

      <v-list>
        <v-list-item>
          <v-row>
            <v-col>
              <v-list-item-action> Total</v-list-item-action>
            </v-col>
            <v-col>
              <v-list-item-action>{{ cartTotal() }}$</v-list-item-action>
            </v-col>
          </v-row>
        </v-list-item>
      </v-list>
      <v-card-actions>
        <v-spacer></v-spacer>

        <v-btn color="primary" @click="pay"> Pay </v-btn>
      </v-card-actions>
    </v-card>
    <v-card v-else>
      <v-card-actions>No Items on shopping cart</v-card-actions>
    </v-card>
  </v-menu>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  components: {},
  data() {
    return {
      menu: false,
      cart: {
        items: 0,
      },
    }
  },
  methods: {
    pay() {
      this.sendTransaction({
        products: this.cartItems(),
      })
    },
    ...mapActions(['sendTransaction']),
    ...mapGetters(
      // map this.count to store.state.count
      { cartTotal: 'getCartTotal', cartItems: 'getCartItems' }
    ),
  },
}
</script>

<style scoped></style>
