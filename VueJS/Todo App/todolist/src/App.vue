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
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
  box-sizing: border-box;
}
.container{
  width: 400px;
  margin: 0 auto;
}
</style>
