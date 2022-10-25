<template>
  <input type="text" v-model="addTaskInput">
 <button @click="addToList">add to List</button>
  <p>
    {{taskArray}}
  </p>
</template>

<script>


export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      taskArray: [],
      addTaskInput:"",
    }
  },
  methods:{
    addToList(){
      this.taskArray.push(this.addTaskInput)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
