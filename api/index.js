import axios from 'axios'

export default {
  products: {
    getAllProducts: () => axios.get('api/products'),
    deleteProduct: (_id) => axios.delete(`api/products/${_id}`),
    updateProduct: (product) => axios.patch(`api/products/${product._id}`, product),
    createProduct: (product) => axios.post(`api/products/`, product)
  },
  transactions: {
    createTransaction: (transaction) => axios.post(`api/transaction/`, transaction)
  },
  stats: {
    getLastDays: (num) => axios.get(`api/transaction/lastDays/${num}`),
    getTopUnique: (num) => axios.get(`api/transaction/topUnique/${num}`),
    getTop: (num) => axios.get(`api/transaction/top/${num}`),
  }
}
