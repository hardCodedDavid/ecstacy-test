export const state = {
  transactions: []
}

export const getters = {
  getTransactions (state) {
    return state.transactions
  }
}

export const mutations = {
  SET_TRANSACTIONS (state, payload) {
    state.transactions = payload
  }
}

export const actions = { 
}
