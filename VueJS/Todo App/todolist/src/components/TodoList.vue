<template>
  <div>
    <input type="text" class="todo-input" placeholder="What need to be done?"
           v-model="newTodo"
           @keyup.enter="addTodo">
    <div v-for="(todo, index) in todos" :key="todo.id" class="todo-item">
      <div>{{ todo.title }}</div>
      <div class="remove-item" @click="removeTodo(index)">&times;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data () {
    return {
      idForTodo: 3,
      newTodo: '',
      todos: [{
        'id': 1,
        'title': 'huyefn',
        'complete': false
      }, {
        'id': 2,
        'title': 'thanhhuyenf',
        'complete': false
      }
      ]
    }
  },
  methods: {
    addTodo () {
      if (this.newTodo.trim() === 0) {
        return
      }
      this.todos.unshift({
        id: this.idForTodo,
        title: this.newTodo,
        complete: false
      })
      this.newTodo = ''
      this.idForTodo++
    },
    removeTodo (index) {
      this.todos.splice(index, 1)
    }
  }
}
</script>

<style scoped>
*{
  box-sizing: border-box;
}
.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
}
.todo-item{
  display: flex;
  align-items: center;
  margin-top: 12px;
  justify-content: space-between;
}
.remove-item{
  cursor: pointer;
}
</style>
