<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed">
      <div v-if="!editing" class="todo-item-label"
           @dblclick="editTodo()"
           :class="{completed : completed}">{{ title }}
      </div>
      <input v-else class="todo-item-edit" type="text"
             v-model="title"
             @blur="doneEdit()"
             @keyup.enter="doneEdit()" v-focus
             @keyup.esc="cancelEdit()">
      <div class="remove-item" @click="removeTodo(index)">&times;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TodoItem',
  props: {
    todo: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      'id': this.todo.id,
      'title': this.todo.title,
      'completed': this.todo.completed,
      'editing': this.todo.editing,
      'beforeEdit': ''
    }
  },
  methods: {
    removeTodo(index) {
      this.$emit('removedTodo', index)
    },
    editTodo() {
      this.beforeEdit = this.title
      this.editing = true
    },
    doneEdit() {
      if (this.title.trim().length === 0) {
        this.title = this.beforeEdit
      }
      this.editing = false
      this.$emit('finishedEdit', {
        'index': this.index,
        'todo': {
          'id': this.id,
          'title': this.title,
          'completed': this.completed,
          'editing': this.editing,
        }
      })
    },
    cancelEdit() {
      this.title = this.beforeEdit
      this.editing = false
    },
  }
}
</script>

<style scoped>
/*.todo-item {*/
/*  display: flex;*/
/*  align-items: center;*/
/*  margin-top: 12px;*/
/*  justify-content: space-between;*/
/*}*/
</style>
