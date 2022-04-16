import { getDatabase, ref, set, onValue, push, child, get, update } from "firebase/database"

import { auth, database } from "../main";

export default {
  state: {
    info: {},
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    clearInfo(state) {
      state.info = {};
    },
  },
  actions: {
    async fetchInfo({ dispatch, commit }) {
      try {
        const uid = await dispatch("getUid");
        const infoPath = ref(database);
        const info = await (await get(child(infoPath, `/users/${uid}/info`))).val()
        commit("setInfo", info);
      } catch (error) {
        commit("setError", error.code);
        throw error;
      }
    },
    async updateInfo({ dispatch, commit, getters }, toUpdate) {
      try {
        const uid = await dispatch("getUid");
        const updateData = {...getters.info, ...toUpdate}
        await update(ref(database,  `/users/${uid}/info`), updateData)
        commit('setInfo', updateData)
      } catch (error) {
        commit("setError", error.code);
        throw error;
      }
    },
  },
  getters: {
    info: (s) => s.info,
  },
};
