export const state = {
  withdrawals: []
}

export const getters = {
  getWithdrawals (state) {
    return state.withdrawals
  }
}

export const mutations = {
  SET_WITHDRAWALS (state, payload) {
    for (let data of payload) {
      state.withdrawals.push(data)
    }
  }
}

export const actions = { 
}
