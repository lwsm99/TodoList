<template>
  <div id="app">

    <h1 style="text-align: center">Todo-List</h1>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Launch demo modal
    </button>













    <div v-for="task in taskArray" :key="task.id">
      <p>{{ task.freitext }} - {{ task.prio }} - {{ task.done }}</p>
    </div>


  </div>




  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input type="text" v-model="addTaskInput" class="form-control" style="width: 20rem" placeholder="Task">
          </div>
          <select class="form-select form-select-lg mb-3" style="width: 20rem">
            <option selected disabled>Kategorie auswählen</option>
            <option  v-for="kategorie in kategorieArray" :key ="kategorie.id">{{kategorie}}</option>
          </select>
          <details>
            <summary>Kategorie nicht dabei?</summary>
            <div class="form-group">
              <input type="text" v-model="addKategorieInput" class="form-control" style="width: 20rem" placeholder="Kategorie">
            </div>
            <button class="btn btn-secondary" @click="addKategorie">Kategorie hinzufügen</button>
          </details>
          <br>
          <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" style="width: 20rem" v-model="addTaskInputPrio">
            <option selected disabled>Priorität</option>
            <option value="3">Hoch</option>
            <option value="2">Mittel</option>
            <option value="1">Niedrig</option>
          </select>
          <br>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="addToList">Add To List</button>
        </div>
      </div>
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
