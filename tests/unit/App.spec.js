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

describe('App.vue', () => {
  it('adds item to list', () => {
    const wrapper = shallowMount(App)

    wrapper.vm.addToList()

    expect(wrapper.vm.taskArray).toHaveLength(1)
  })
});

describe('User', () => {
  test('register users', () => {
    const wrapper = registerUsers(15);
    expect(wrapper.vm.userArray).toHaveLength(15)
  });

  test('delete users', () => {
    const wrapper = deleteUsers(registerUsers(15), 4);
    expect(wrapper.vm.userArray).toHaveLength(11);
  });
});