<template>
  <div class="product-list-second">
    <h2>Product List Second</h2>
    <ul>
      <li v-for="item in products">
        <span class="name">{{item.name}}</span>
        <span class="price">  ${{item.price}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProductListSecond",
  computed: {
    products(){
      return this.$store.state.products
    }
  }
}
</script>

<style scoped>
.product-list-second{
  background: #D1E4FF;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, .2);
  padding: 10px 20px;
}
.product-list-second ul{
  list-style-type: none;
  padding: 0;
}
.product-list-second li{
  margin-right: 10px;
  margin-top: 10px;
  padding: 20px;
  background: cadetblue;
  color: white;
}
.price{
  font-weight: bold;
  color: brown;
}
</style>
