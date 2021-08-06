<template>
  <div id="app" class="container">
    <Todolist></Todolist>
  </div>
</template>

<script>
import Todolist from './components/TodoList'
export default {
  name: 'App',
  components: {Todolist}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}
.container{
  width: 400px;
  margin: 0 auto;
  box-sizing: border-box;
}
</style>
