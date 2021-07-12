import { mapGetters } from 'vuex'
import api from '~/api'

export const state = () => ({
  products: [],
  cart: [],
  total: 0,
  stats: {},
})

export const getters = {
  getProducts(state) {
    return state.products
  },
  getCartItems(state) {
    return state.cart
  },
  getCartTotal(state) {
    return state.cart.reduce((val, item) => {
      return parseFloat(item.price) * item.count + val
    }, 0)
  },
}
export const computed = {
  // mix the getters into computed with object spread operator
  ...mapGetters(['getProducts', 'getCartItems', 'getCartTotal']),
}

export const mutations = {
  setTop(store, top) {
    store.stats.top = top
  },
  setLastDays(store, last) {
    store.stats.last = last
  },
  setTopUnique(store, topUnique) {
    store.stats.unique = topUnique
  },
  setProducts(store, products) {
    store.products = products
  },
  createProduct(store, product) {
    store.products.push(product)
  },
  updateProduct(store, product) {
    store.products = store.products.map((obj) =>
      obj._id == product._id ? { ...product } : obj
    )
  },
  deleteProduct(store, product) {
    store.products = store.products.filter((value) => {
      return value._id != product
    })
  },
  sendTransaction(store, transaction) {
    store.cart = []
    store.total = 0
  },
  addProductToCart(store, product) {
    let found = store.cart.filter((value) => value._id == product._id)
    if (found.length) {
      found[0].count = found[0].count ? ++found[0].count : 1
      store.cart = store.cart.map((obj) =>
        obj._id == found[0]._id ? { ...found[0] } : obj
      )
    } else {
      store.cart.push({ ...product, count: 1 })
    }
  },
  removeProductFromCart(store, product) {
    store.cart = store.cart.filter((value, index, arr) => {
      return value != product.id
    })
  },
  updateProductCart(store, product) {
    store.cart = store.cart.map((obj) =>
      obj._id == product._id ? { ...product } : obj
    )
  },
}

export const actions = {
  sendTransaction({ commit }, payload) {
    return api.transactions.createTransaction(payload).then(({ data }) => {
      commit('sendTransaction', payload)
    })
  },
  addProductToCart({ commit }, payload) {
    commit('addProductToCart', payload)
  },
  deleteProduct({ commit }, payload) {
    return api.products.deleteProduct(payload).then(() => {
      commit('deleteProduct', payload)
    })
  },
  updateProduct({ commit }, payload) {
    return api.products.updateProduct(payload).then(({ data }) => {
      commit('updateProduct', data)
    })
  },
  createProduct({ commit, dispatch }, payload) {
    return api.products.createProduct(payload).then(({ data }) => {
      commit('createProduct', data)
    })
  },
  getAllStats( {dispatch, commit }) {
    return api.stats
      .getTop(5)
      .then((top) => {
        commit('setTop', top.data)
      })
      .then(() => {
        api.stats.getLastDays(5).then((top) => {
          commit('setLastDays', top.data)
        })
        return api.stats.getTopUnique(5).then((top) => {
          commit('setTopUnique', top.data)
        })
      })
  },
  getAllProducts({ dispatch, commit }) {
    return api.products
      .getAllProducts()
      .then((products) => {
        commit('setProducts', products.data)
      })
      .catch((err) => {
        console.error('err :>> ', err);
        return Promise.reject(new Error("can't get products"))
      })
  },
}
