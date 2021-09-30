import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    strict: true,
    products: [
      {
        name: "banana",
        price: 20
      },
      {
        name: "orange",
        price: 31
      },
      {
        name: "strawberry",
        price: 22
      },
      {
        name: "watermelon",
        price: 17
      }
    ]
  },
  getters: {
    saleProducts: state => {
      var saleProducts = state.products.map(item => {
        return {
          name: item.name + "hihi",
          price: item.price * 0.5
        }
      })
      return saleProducts
    }
  },
  mutations: {
    reducePrice: state => {
      state.products.forEach(item => {
        item.price -= 1
      })
    }
  }
})
