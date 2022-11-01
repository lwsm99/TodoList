<template>
  <div id="app">
    <h1 style="text-align: center">Todo-List</h1>

      <div class="form-group">
        <input type="text" v-model="addTaskInput" class="form-control" style="width: 20rem">
      </div>
      <button @click="addToList" class="btn btn-primary">add to List</button>

    <div v-for="task in taskArray" :key="task.id">
      <p>{{ task.freitext }} - {{ task.prio }} - {{ task.done }}</p>
    </div>


  </div>

</template>

<script>


export default {
  name: 'App',
  components: {

  },
  data() {
    return {
      taskArray: [

      ],
      addTaskInput:"",
    }
  },
  methods:{
    addToList(){
      this.taskArray.push(
          {freitext: this.addTaskInput, prio: 1, done: false}

      )
      this.addTaskInput = '';
    }
  }
}
</script>

<style>
#app {
  margin: 3rem;
}
</style>
