<template>
  <div id="app">

    <h1 style="text-align: center">Todo-List</h1>

    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
      Add Task
    </button>
  </div>

  <!-- Modal Add Task -->
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
          <select class="form-select form-select-lg mb-3" style="width: 20rem" v-model="kategorieInput">
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

  <!-- Modal  Edit Task-->
  <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabelEdit">Modal title</h5>
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

<table class="table">
  <thead>
    <tr>
      <th scope="col">Freitext</th>
      <th scope="col">Kategorie</th>
      <th scope="col">Prio</th>
      <th scope="col">Done</th>
      <th scope="col">Editieren</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="task in taskArray" :key="task.id">
      <td>{{ task.freitext }}</td>
      <td>{{ task.kategorie }}</td>
      <td>{{changeName(task.prio)}} </td>
      <td v-if="task.done"><button type="button" class="btn btn-primary" @click="task.done = !task.done">Nicht erledigt</button></td>
      <td v-else>
        <button type="button" class="btn btn-primary" @click="task.done = !task.done">
          Erledigt
        </button>
      </td>
      <td>
        <button type="button" class="btn btn-primary" @click="editTask(task.id)">
          Bearbeiten
        </button>
      </td>
    </tr>
  </tbody>
</table>

</template>

<script>

let i = 1;
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
      kategorieInput:'',

      addKategorieInput:"",
    }
  },
  methods:{
    addToList(){
      this.taskArray.push(
          {freitext: this.addTaskInput, prio: this.addTaskInputPrio, done: false, id: i, kategorie: this.kategorieInput}
      )
      i+=1
      this.addTaskInput = '';
      this.addTaskInputPrio = '';
    },
    addKategorie(){
      this.kategorieArray.push(this.addKategorieInput)
    },
    editTask(id){
      console.log(id)
    },
    changeName(prio) {
      if (Number(prio) === 3) return "Hoch"
      else if (Number(prio) === 2) return "Mittel"
      else return "Niedrig"
    },
  }
}
</script>

<style>
#app {
  margin: 3rem;
}
</style>
