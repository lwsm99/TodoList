import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

/*
  Helper Methods
*/

async function addTask (text, prio, category) {
  const wrapper = shallowMount(App)
  
  await wrapper.setData({ addTaskInput: text, addTaskInputPrio: prio, kategorieInput: category })
  wrapper.vm.addToList()

  return wrapper
}

function testTask(wrapper, length, text, prio, category) {
  expect(wrapper.vm.taskArray).toHaveLength(length)
  expect(wrapper.vm.taskArray[0].freitext).toBe(text)
  expect(wrapper.vm.taskArray[0].prio).toBe(prio)
  expect(wrapper.vm.taskArray[0].kategorie).toBe(category)
}

function addTasks(taskCount) {
  const wrapper = shallowMount(App)
  for(let i = 0; i < taskCount; i++) {
    wrapper.vm.addToList()
  }
  return wrapper
}

function registerUsers(usersToRegister) {
  const wrapper = shallowMount(App)
  for(let i = 0; i < usersToRegister; i++) {
    wrapper.vm.addUser()
  }
  return wrapper
}

function addCategory(addedCategories) {
  const wrapper = shallowMount(App)
  for(let i = 0; i < addedCategories; i++) {
    wrapper.vm.addKategorie()
  }
  return wrapper
}

function deleteUsers(givenUsers, usersToDelete) {
  const wrapper = givenUsers;
  for(let i = 0; i < usersToDelete; i++) {
    wrapper.vm.removeObjectWithId(wrapper.vm.userArray, i)
  }
  return wrapper
}


/*
  Tests
*/

describe('Task', () => {
  it('adds tasks to list', () => {
    const wrapper = addTasks(4)

    expect(wrapper.vm.taskArray).toHaveLength(4)
  });

  it('adds certain task to list', async () => {
    const wrapper = await addTask('Test Task', 1, 'Test Category')
    testTask(wrapper, 1, 'Test Task', 1, 'Test Category')
  });

  it('edits certain task from list', async () => {
    let wrapper = await addTask('Test Task', 1, 'Test Category')
    testTask(wrapper, 1, 'Test Task', 1, 'Test Category')

    await wrapper.setData({ editTaskId: wrapper.vm.taskArray[0].id, editTaskText: 'Edited Task', editTaskPrio: 2, editTaskCat: 'Edited Category' })
    wrapper.vm.editTask()
    
    testTask(wrapper, 1, 'Edited Task', 2, 'Edited Category')
  });

  it('removes tasks from list', () => {
    const wrapper = shallowMount(App)
    wrapper.vm.addToList()
    wrapper.vm.deleteTask(1)
    expect(wrapper.vm.taskArray).toHaveLength(0)
  });
});

describe('Kategorie', () => {
  it('add category', () => {
    const wrapper = addCategory(2)

    expect(wrapper.vm.kategorieArray).toHaveLength(2)
  })
});

describe('User', () => {
  it('registers users', () => {
    const wrapper = registerUsers(15)
    expect(wrapper.vm.userArray).toHaveLength(15)
  });

  it('deletes users', () => {
    const wrapper = deleteUsers(registerUsers(15), 4)
    expect(wrapper.vm.userArray).toHaveLength(11)
  });
});

