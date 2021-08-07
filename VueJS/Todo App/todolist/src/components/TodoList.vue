<template>
  <div>
    <input type="text" class="todo-input" placeholder="What need to be done?"
           v-model="newTodo"
           @keyup.enter="addTodo">
    <div v-for="(todo, index) in filterTodos"
         :key="todo.id" class="todo-item">
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.completed">
        <div v-if="!todo.editing" class="todo-item-label"
             @dblclick="editTodo(todo)"
        :class="{completed : todo.completed}">{{ todo.title }}
        </div>
        <input v-else class="todo-item-edit" type="text"
               v-model="todo.title"
               @blur="doneEdit(todo)"
               @keyup.enter="doneEdit(todo)" v-focus
               @keyup.esc="cancelEdit(todo)">
      </div>
      <div class="remove-item" @click="removeTodo(index)">&times;</div>
    </div>
    <div class="extra-container">
      <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodo">Check all</label></div>
      <div>{{remaining}} items left</div>
    </div>
    <div class="extra-container">
      <div>
        <button :class="{active : filter == 'all'}" @click="filter= 'all'">All</button>
        <button :class="{active : filter == 'active'}" @click="filter= 'active'">Active</button>
        <button :class="{active : filter == 'completed'}" @click="filter= 'completed'">Completed</button>
      </div>
      <div v-if="showClearCompleted" @click="clearCompleted">Clear completed</div>
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
      filter: 'all',
      todos: [{
        'id': 1,
        'title': 'huyefn',
        'completed': false,
        'editing': false
      }, {
        'id': 2,
        'title': 'thanhhuyenf',
        'completed': false,
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
  computed: {
    remaining () {
      return this.todos.filter((item) => !item.completed).length
    },
    anyRemaining () {
      return this.remaining !== 0
    },
    filterTodos () {
      if (this.filter === 'all') {
        return this.todos
      }
      if (this.filter === 'active') {
        return this.todos.filter(item => !item.completed)
      }
      if (this.filter === 'completed') {
        return this.todos.filter(item => item.completed)
      }
    },
    showClearCompleted () {
      return this.todos.filter(item => item.completed).length > 0
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
        completed: false,
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
    },
    checkAllTodo () {
      /* eslint-disable */
      this.todos.forEach((todo) => todo.completed = event.target.checked)
    },
    clearCompleted () {
      this.todos = this.todos.filter(item => !item.completed)
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
.todo-input:focus{
  outline: none;
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
.todo-item-edit:focus{
  outline: none;
}
.todo-item-edit {
  padding: 10px;
  font-size: 24px;
  margin-left: 12px;
  width: 100%;
  border: 1px solid wheat;
}
.completed {
  text-decoration: line-through;
  color: #666;
}
.extra-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgrey;
  margin-top: 10px;
  padding-top: 10px;
}
.active{
  background: powderblue;
}
button{
  border: none;
  outline: none;
  background: none;
  padding: 4px 6px;
  border-radius: 4px;
}
</style>
