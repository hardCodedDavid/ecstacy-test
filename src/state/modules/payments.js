export const state = {
  payments: []
}

export const getters = {
  getPayments (state) {
    return state.payments
  }
}

export const mutations = {
  SET_PAYMENTS (state, payload) {
    for (let data of payload) {
      state.payments.push(data)
    }
  }
}

export const actions = { 
}
