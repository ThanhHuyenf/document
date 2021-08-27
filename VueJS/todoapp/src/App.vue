<template>
  <div id="app" class="container">
    <TodoList></TodoList>
  </div>
</template>

<script>
import TodoList from "./components/TodoList";
export default {
  name: 'App',
  components: {TodoList},
}
</script>

<style>
*{
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  margin-top: 60px;
}
.container{
  width: 400px;
  margin: 0 auto;
}
</style>
