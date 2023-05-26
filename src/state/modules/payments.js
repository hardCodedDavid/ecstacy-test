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
    state.payments = payload
  }
}

export const actions = { 
}
