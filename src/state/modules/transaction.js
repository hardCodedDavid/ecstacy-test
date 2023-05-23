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
    for (let data of payload) {
      state.transactions.push(data)
    }
  }
}

export const actions = { 
}
