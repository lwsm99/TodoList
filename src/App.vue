<template>
  <div id="app">
    <h1 style="text-align: center">Todo-List</h1>
    <div class="row">
      <div class="col-6">
        <!-- Button trigger modal -->
        <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
          Add Task
        </button>
      </div>
      <div class="col-6" style="text-align: right">
        <!--Button Add User-->
        <button type="button" id="register" class="btn btn-primary" data-toggle="modal" data-target="#addUserModal">
          Register
        </button>
      </div>
    </div>
  </div>

  <!--Searchbar-->
  <input type="text" class="form-control mb-3" placeholder="Suche..." id="searchBar">

  <!-- Modal Delete Task -->
  <div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Löschen</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          Wirklich diese Aufgabe löschen?
          <br>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="deleteTask(task)" data-dismiss="modal">Löschen</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal  Edit Task-->
  <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
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
            <option v-for="kategorie in kategorieArray" :key="kategorie.id">{{ kategorie }}</option>
          </select>
          <details>
            <summary>Kategorie nicht dabei?</summary>
            <div class="form-group">
              <input type="text" v-model="addKategorieInput" class="form-control" style="width: 20rem"
                     placeholder="Kategorie">
            </div>
            <button class="btn btn-secondary" @click="addKategorie">Kategorie hinzufügen</button>
          </details>
          <br>
          <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" style="width: 20rem"
                  v-model="editTaskPrio">
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
          <button type="button" class="btn btn-primary" @click="editTask">Add To List</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal Add Task -->
  <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
       aria-hidden="true">
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
            <option v-for="kategorie in kategorieArray" :key="kategorie.id">{{ kategorie }}</option>
          </select>
          <details>
            <summary>Kategorie nicht dabei?</summary>
            <div class="form-group">
              <input type="text" v-model="addKategorieInput" class="form-control" style="width: 20rem"
                     placeholder="Kategorie">
            </div>
            <button class="btn btn-secondary" @click="addKategorie">Kategorie hinzufügen</button>
          </details>
          <br>
          <select class="form-select form-select-lg mb-3" aria-label=".form-select-lg example" style="width: 20rem"
                  v-model="addTaskInputPrio">
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

  <!-- Modal Add User-->
  <div class="modal fade" id="addUserModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel1"
       aria-hidden="true">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="addUserLabel">Register User</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <input type="text" v-model="addUsernameInput" class="form-control" style="width: 20rem"
                   placeholder="Username">
          </div>
          <br>
          <br>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary" @click="addUser">Add User</button>
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
      <th scope="col">Löschen</th>
    </tr>
    </thead>
    <tbody id="taskTable">
    <tr v-for="task in taskArray" :key="task.id" :class="{ done: task.done }">

      <td class="linethrough">{{ task.freitext }}</td>
      <td class="linethrough">{{ task.kategorie }}</td>
      <td class="linethrough">{{ changeName(task.prio) }}</td>

      <td v-if="task.done">
        <button type="button" class="btn btn-info" @click="task.done = !task.done">
          <i class="fa-sharp fa-solid fa-rotate-right"></i>
        </button>
      </td>
      <td v-else>
        <button type="button" class="btn btn-success" @click="task.done = !task.done">
          <i class="fa-solid fa-check"></i>
        </button>
      </td>
      <td>
        <button type="button" class="btn btn-warning" @click="openEditTask(task.id)" data-toggle="modal"
                data-target="#modalEdit">
          <i class="fa-solid fa-pencil"></i>
        </button>
      </td>
      <td>
        <button type="button" class="btn btn-danger" data-toggle="modal" data-target="#deleteModal">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
    </tbody>
  </table>

  <div>
    Registered users:<br>
    <ul v-for="user in userArray" :key="user">
      <li>{{ user.username }} - {{ user.id }} <button class="btn btn-danger" @click="removeObjectWithId(userArray, user.id)"><i class="fa-solid fa-trash"></i></button></li>
    </ul>
  </div>

</template>

<script>
import $ from 'jquery'
// eslint-disable-next-line
$(document).ready(function () {
  // eslint-disable-next-line
  $("#searchBar").on("keyup", function () {
    // eslint-disable-next-line
    var value = $(this).val().toLowerCase();
    // eslint-disable-next-line
    $("#taskTable tr").filter(function () {
      // eslint-disable-next-line
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });
});
let i = 1;
let j = 1;
export default {
  name: 'App',
  components: {},
  data() {
    return {
      taskArray: [],
      kategorieArray: [],
      userArray: [],
      addTaskInput: "",
      addTaskInputPrio: 0,
      kategorieInput: '',
      addUsernameInput: '',
      addKategorieInput: "",

      editTaskText: "",
      editTaskCat: "",
      editTaskPrio: "",
      editTaskId: "",
    }
  },
  methods: {
    addToList() {
      this.taskArray.push(
          {freitext: this.addTaskInput, prio: this.addTaskInputPrio, done: false, id: i, kategorie: this.kategorieInput}
      )
      i += 1
      this.addTaskInput = '';
      this.addTaskInputPrio = '';
      this.taskArray.sort((a, b) => b.prio - a.prio);
    },
    addUser() {
      this.userArray.push(
          {username: this.addUsernameInput, id: j}
      )
      j += 1
    },
    addKategorie() {
      this.kategorieArray.push(this.addKategorieInput)
    },
    removeObjectWithId(arr, id) {
      const objWithIdIndex = arr.findIndex((obj) => obj.id === id);
      arr.splice(objWithIdIndex, 1);
    },
    openEditTask(id) {
      let task = this.taskArray.find(x => x.id === id)
      this.editTaskText = task.freitext
      this.editTaskCat = task.kategorie
      this.editTaskPrio = task.prio
      this.editTaskId = task.id
    },
    editTask() {
      this.removeObjectWithId(this.taskArray, this.editTaskId)
      this.taskArray.push(
          {
            freitext: this.editTaskText,
            prio: this.editTaskPrio,
            done: false,
            id: this.editTaskId,
            kategorie: this.editTaskCat
          }
      )
    },
    changeName(prio) {
      switch (prio) {
        case "4":
          return "Sehr hoch"
        case "3":
          return "Hoch"
        case "2":
          return "Mittel"
        case "1":
          return "Niedrig"
      }
    },
    deleteTask(task) {
      const index = this.taskArray.indexOf(task)
      this.taskArray.splice(index, 1);
    }
  }
}
</script>

<style>
#app {
  margin: 3rem;
}

#register {
  margin-left: 5px;
}

.done {
  background-color: #eaeaea;
}

.done > .linethrough {
  text-decoration: line-through;
  color: #4b4b4b;
}
</style>
