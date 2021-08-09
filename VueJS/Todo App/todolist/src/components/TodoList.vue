<template>
  <div>
    <input class="input-todo" type="text" placeholder="What need to be done?" v-model="newTodo"
           @keypress.enter="addNewTodo">
    <div class="todo-item" v-for="(todo, index) in todosTemp" :key="todo.id">
      <div class="todo-item-left">
        <input type="checkbox" v-model="todo.completed">
        <div v-if="!todo.editing" class="todo-item-label"
             @dblclick="editTodo(todo)"
        :class="{completed : todo.completed}">{{ todo.title }}
        </div>
        <input v-else class="todo-item-edit" type="text"
               v-model="todo.title" @keypress.enter="doneEdit(todo)"
               v-focus @keyup.esc="cancelEdit(todo)">
      </div>
      <div class="remove-item" @click="removeTodo(index)">&times;</div>
    </div>
    <div class="extra-container">
      <div>
        <input type="checkbox" :checked="!anyRemaining"
        @change="checkAll">Check All
      </div>
      <div>{{remaining}} items left</div>
    </div>
    <div class="extra-container">
      <div>
        <button @click="todoFilter= 'all'" :class="{actived: todoFilter === 'all'}">All</button>
        <button @click="todoFilter= 'active'" :class="{actived: todoFilter === 'active'}">Active</button>
        <button @click="todoFilter= 'completed'" :class="{actived: todoFilter === 'completed'}">Completed</button>
      </div>
      <div class="delete-btn" v-if="showDeleteButton" @click="deleteTodo">Clear completed</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoList',
  data () {
    return {
      newTodo: '',
      idItem: 3,
      beforeEdit: '',
      todoFilter: 'all',
      todos: [
        {
          id: '1',
          title: 'Hello Huyn',
          completed: false,
          editing: false
        },
        {
          id: '2',
          title: 'Hello Huyn xinh gai',
          completed: false,
          editing: false
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
      return this.todos.filter(item => !item.completed).length
    },
    anyRemaining () {
      return this.remaining > 0
    },
    showDeleteButton () {
      return this.todos.filter(item => item.completed).length > 0
    },
    todosTemp () {
      if (this.todoFilter === 'all') {
        return this.todos
      }
      if (this.todoFilter === 'active') {
        return this.todos.filter(item => !item.completed)
      }
      if (this.todoFilter === 'completed') {
        return this.todos.filter(item => item.completed)
      }
    }
  },
  methods: {
    addNewTodo () {
      this.todos.unshift({
        'id': this.idItem,
        'title': this.newTodo,
        'completed': false,
        'editing': false
      })
      this.newTodo = ''
      this.idItem++
    },
    removeTodo (index) {
      this.todos.splice(index, 1)
    },
    editTodo (todo) {
      this.beforeEdit = todo.title
      todo.editing = true
    },
    cancelEdit (todo) {
      todo.title = this.beforeEdit
      todo.editing = false
    },
    doneEdit (todo) {
      if (todo.title.trim().length === 0) {
        todo.title = this.beforeEdit
      }
      todo.editing = false
    },
    checkAll () {
      this.todos.forEach((item) => item.completed = event.target.checked)
    },
    deleteTodo () {
      this.todos = this.todos.filter(item => !item.completed)
    }
  }
}
</script>
<style scoped>
.input-todo {
  width: 100%;
  font-size: 16px;
  padding: 10px 18px;
  margin-bottom: 16px;
  box-sizing: border-box;
}

.input-todo:focus {
  outline: none;
}

.todo-item {
  display: flex;
  margin-bottom: 15px;
  align-items: center;
  justify-content: space-between;
  font-size: 20px
}

.remove-item {
  cursor: pointer;
  margin-left: 12px;
  color: lightgrey;
}

.remove-item:hover {
  color: black;
}

.todo-item-left {
  display: flex;
  align-items: center;
}
.completed {
  text-decoration: line-through;
  color: #666;
}
.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 20px;
  padding: 10px;
  margin-left: 12px;
}

.todo-item-edit:focus {
  outline: none
}
.extra-container{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 15px;
  height: 30px;
  border-top: 1px solid lightgrey;
  padding-top: 10px;
}
button{
  padding: 6px 6px;
  cursor: pointer;
  background: white;
  border: none;
  margin-right: 4px;
  /*color: white;*/
  border-radius: 3px;
}
.actived {
  color: white;
  background: #42b983;
}
.delete-btn{
  cursor: pointer;
}
</style>
