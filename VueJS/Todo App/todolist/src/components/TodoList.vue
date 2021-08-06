<template>
  <div>
    <input type="text" class="todo-input" placeholder="What need to be done?"
           v-model="newTodo"
           @keyup.enter="addTodo">
    <div v-for="(todo, index) in todos"
         :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <div v-if="!todo.editing" class="todo-item-label"
             @dblclick="editTodo(todo)">{{ todo.title }}
        </div>
        <input v-else class="todo-item-edit" type="text"
               v-model="todo.title"
               @blur="doneEdit(todo)"
               @keyup.enter="doneEdit(todo)" v-focus
               @keyup.esc="cancelEdit(todo)">
      </div>
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
      beforeEdit: '',
      todos: [{
        'id': 1,
        'title': 'huyefn',
        'complete': false,
        'editing': false
      }, {
        'id': 2,
        'title': 'thanhhuyenf',
        'complete': false,
        'editing': false
      }
      ]
    }
  },
  directives: {
    focus: {
      // định nghĩa cho directive
      inserted: function (el) {
        el.focus()
      }
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
        complete: false,
        editing: false
      })
      this.newTodo = ''
      this.idForTodo++
    },
    removeTodo (index) {
      this.todos.splice(index, 1)
    },
    editTodo (todo) {
      this.beforeEdit = todo.title
      todo.editing = true
    },
    doneEdit (todo) {
      if (todo.title.trim().length === 0) {
        todo.title = this.beforeEdit
      }
      todo.editing = false
    },
    cancelEdit (todo) {
      todo.title = this.beforeEdit
      todo.editing = false
    }
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
}

.todo-item {
  display: flex;
  align-items: center;
  margin-top: 12px;
  justify-content: space-between;
}

.remove-item {
  cursor: pointer;
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 24px;
  margin-left: 12px;
  width: 100%;
  border: 1px solid wheat;
}
</style>
