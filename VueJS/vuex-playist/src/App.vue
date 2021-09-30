<template>
  <div id="app">
    <ProductListFirst></ProductListFirst>
    <ProductListSecond></ProductListSecond>
  </div>
</template>

<script>
import ProductListFirst from "./components/ProductListFirst";
import ProductListSecond from "./components/ProductListSecond";
export default {
  name: 'app',
  components: {ProductListSecond, ProductListFirst},
  data () {
    return {

    }
  }
}
</script>

<style scoped>
#app{
  font-family: Arial;
  color: #555;
}
</style>
