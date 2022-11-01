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
            <option value="4">Sehr Hoch</option>
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
            <input type="text" v-model="editTaskText" class="form-control" style="width: 20rem" placeholder="Task">
          </div>
          <select class="form-select form-select-lg mb-3" style="width: 20rem" v-model="editTaskCat">
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
          <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" style="width: 20rem" v-model="editTaskPrio">
            <option selected disabled>Priorität</option>
            <option value="3">Sehr Hoch</option>
            <option value="3">Hoch</option>
            <option value="2">Mittel</option>
            <option value="1">Niedrig</option>
          </select>
          <br>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="editTask">Add To List</button>
        </div>
      </div>
    </div>
  </div>
<input type="text" class="form-control" placeholder="Suche..." id="searchBar">
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
  <tbody id="taskTable">
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
        <button type="button" class="btn btn-primary" @click="openEditTask(task.id)" data-toggle="modal" data-target="#modalEdit">
          Bearbeiten
        </button>
      </td>
    </tr>
  </tbody>
</table>

</template>

<script>

// eslint-disable-next-line
$(document).ready(function(){
  // eslint-disable-next-line
  $("#searchBar").on("keyup", function() {
    // eslint-disable-next-line
    var value = $(this).val().toLowerCase();
    // eslint-disable-next-line
    $("#taskTable tr").filter(function() {
      // eslint-disable-next-line
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
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

      editTaskText:"",
      editTaskCat:"",
      editTaskPrio:"",
      editTaskId:"",

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
    openEditTask(id){
      let task = this.taskArray.find(x => x.id === id)
      this.editTaskText = task.freitext
      this.editTaskCat = task.kategorie
      this.editTaskPrio = task.prio
      this.editTaskId = task.id
    },
    removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
      arr.splice(objWithIdIndex, 1);
    },
    editTask(){
      this.removeObjectWithId(this.taskArray, this.editTaskId)
      this.taskArray.push(
          {freitext: this.editTaskText, prio: this.editTaskPrio, done: false, id: this.editTaskId, kategorie: this.editTaskCat}

      )
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
