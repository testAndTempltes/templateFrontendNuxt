import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  state: () => {
    return {
      counter: 0
    }
  },
  actions: {
    countStore() {
      this.counter++
    }
  },
  getters: {
    getCounter: (state) => state.counter
  }
})
