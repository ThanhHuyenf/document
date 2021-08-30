<template>
  <div>
    <div class="todo-item">
      <div class="todo-item-left" @dblclick="item.editing=true">
        <input type="checkbox">
        <div v-if="item.editing === false" class="label-title">{{ item.title }}</div>
        <input v-else type="text" class="edit-title" v-model="item.title" @keyup.enter="doneEdit">
      </div>
      <div class="remove-item">&times;</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    item: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  methods: {
    doneEdit(){
      this.$emit("doneEdit", this.item.title, this.index)
      this.item.editing = false
    }
  }
}
</script>

<style scoped>
.todo-item {
  width: 100%;
  height: 50px;
  display: flex;
  font-size: 20px;
  align-items: center;
  justify-content: space-between;
}

.remove-item {
  color: lightgrey;
  cursor: pointer;
}

.remove-item:hover {
  color: #2c3e50;
}
.todo-item-left{
  display: flex;
  align-items: center;
}
.label-title{
  margin-left: 10px;
}
.edit-title {
  font-size: 20px;
  /*border: none;*/
  outline: none;
  padding-left: 10px;
}
input:checked ~ .label-title {
  text-decoration: line-through;
  color: rgba(0, 0, 0, .5);
}
</style>
