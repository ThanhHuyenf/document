<template>
  <div>
    <input type="text" placeholder="What need to be done?" v-model="newTodo" @keyup.enter="addNewTodo">
    <TodoItem v-for="item in todos" :key="item.id"
              :item="item"
              :index="index"
    @doneEdit="doneEdit(data)"></TodoItem>
    <div class="extra-container">
      <div>
        <label>
          <input type="checkbox">
          Check All
        </label>
      </div>
      <div>items left</div>
    </div>
    <div class="extra-container">
      <div>
        <button class="extra-btn all-todo">All</button>
        <button class="extra-btn active-todo">Active</button>
        <button class="extra-btn completed-todo">Completed</button>
      </div>
      <div>
        <button>Clear completed</button>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  name: "TodoList",
  components: {TodoItem},
  data() {
    return {
      idTodo: 4,
      newTodo: '',
      todos: [
        {
          'id': 1,
          'title': 'Huyen xinh gai',
          'completed': false,
          'editing': false
        },
        {
          'id': 2,
          'title': 'Hoc bai cac kieu',
          'completed': false,
          'editing': false
        },
        {
          'id': 3,
          'title': 'Huyen hoc toan',
          'completed': false,
          'editing': false
        }
      ]
    }
  },
  methods: {
    addNewTodo() {
      this.todos.unshift({
        id: this.idTodo,
        title: this.newTodo,
        completed: false,
        editing: false
      })

      this.newTodo = ''
      this.idTodo++
    },
    doneEdit(data, index){
      this.todos[index-1].title= data
    }
  }
}
</script>

<style scoped>
input {
  width: 100%;
  height: 40px;
  outline: none;
  font-size: 16px;
  font-weight: 300;
  padding-left: 15px;
}

.extra-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  border-top: 1px solid lightgrey;
}

.extra-container input {
  width: 15px;
  height: 15px;
}
.extra-btn{
  padding: 6px 8px;
  border: none;
  outline: none;
  border-radius: 5px;
}
.extra-btn+.extra-btn{
  margin-left: 3px;
}
</style>
