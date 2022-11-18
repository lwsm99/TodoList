import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

/*
  Helper Methods
*/

function registerUsers(usersToRegister) {
  const wrapper = shallowMount(App)
  for(let i = 0; i < usersToRegister; i++) {
    wrapper.vm.addUser();
  }
  return wrapper;
}

function addCategory(addedCategories) {
  const wrapper = shallowMount(App)
  for(let i = 0; i < addedCategories; i++) {
    wrapper.vm.addKategorie();
  }
  return wrapper;
}

function deleteUsers(givenUsers, usersToDelete) {
  const wrapper = givenUsers;
  for(let i = 0; i < usersToDelete; i++) {
    wrapper.vm.removeObjectWithId(wrapper.vm.userArray, i);
  }
  return wrapper;
}


/*
  Tests
*/

describe('Task', () => {
  it('adds item to list', () => {
    const wrapper = shallowMount(App)

    wrapper.vm.addToList()
    expect(wrapper.vm.taskArray).toHaveLength(1)
  });
  it('remove task from list', () => {
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
    const wrapper = registerUsers(15);
    expect(wrapper.vm.userArray).toHaveLength(15)
  });

  it('deletes users', () => {
    const wrapper = deleteUsers(registerUsers(15), 4);
    expect(wrapper.vm.userArray).toHaveLength(11);
  });
});

