<template>
  <div id="app">



    <h1 style="text-align: center">Todo-List</h1>

      <div class="form-group">
        <input type="text" v-model="addTaskInput" class="form-control" style="width: 20rem">
      </div>

    <select class="form-select form-select-lg mb-3" style="width: 20rem" >
      <option selected disabled>Prio</option>
    </select>

    <div class="form-group">
      <input type="text" v-model="addKategorieInput" class="form-control" style="width: 20rem">
    </div>

    <button class="btn btn-secondary" @click="addKategorie">Kategorie hinzufügen</button>


    <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" style="width: 20rem" v-model="addTaskInputPrio">
      <option selected disabled>Prio</option>
      <option value="3">Hoch</option>
      <option value="2">Mittel</option>
      <option value="1">Niedrig</option>
    </select>
    <br>

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
      kategorieArray:[],
      addTaskInput:"",
      addTaskInputPrio:0,

      addKategorieInput:"",
    }
  },
  methods:{
    addToList(){
      this.taskArray.push(
          {freitext: this.addTaskInput, prio: this.addTaskInputPrio, done: false}
      )
      this.addTaskInput = '';
      this.addTaskInputPrio = '';
    },
    addKategorie(){
      this.kategorieArray.push(this.addKategorieInput)
    }
  }
}
</script>

<style>
#app {
  margin: 3rem;
}
</style>
