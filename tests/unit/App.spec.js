import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App.vue', () => {
  it('adds item to list', () => {
    const wrapper = shallowMount(App)

    wrapper.vm.addToList()

    expect(wrapper.vm.taskArray).toHaveLength(1)
  })
})
