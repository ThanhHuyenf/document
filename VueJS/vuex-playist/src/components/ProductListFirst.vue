<template>
<div class="product-list-first">
  <h2>Product List First</h2>
  <ul>
    <li v-for="item in saleProducts">
      <span class="name">{{item.name}}</span>
      <span class="price">  ${{item.price}}</span>
    </li>
  </ul>
  <button @click="reducePrice">Reduce Price</button>
</div>
</template>

<script>
export default {
  name: "ProductListFirst",
  computed: {
    products(){
      return this.$store.state.products
    },
    saleProducts(){
      return this.$store.getters.saleProducts
    }
  },
  methods: {
    reducePrice(){
      // this.$store.state.products.forEach(item => {
      //   item.price -=1
      // })
      this.$store.commit('reducePrice')
    }
  }
}
</script>

<style scoped>
.product-list-first{
  background: powderblue;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, .2);
  margin-bottom: 30px;
  padding: 20px 10px;
}
.product-list-first ul{
  padding: 0;
}
.product-list-first li{
  display: inline-block;
  margin-right: 10px;
  margin-top: 10px;
  padding: 20px;
  background: azure;
}
.price{
  font-weight: bold;
  color: brown;
}
</style>
