import npcApi from "@/api/npc.js";

const state = {
  data: null,
  isLoading: false,
  error: null,
};

export const getterTypes = {
  myNpcPerIds: "[skills ids] my skills per ids",
};

const getters = {
  [getterTypes.myNpcPerIds]: (state) => (lfNpcIds) => {
    if (state.data === null || state.data.length < 1) {
      return [];
    }
    return state.data.filter((stateNpc) => {
      const lfNpc = lfNpcIds.find((id) => id === stateNpc.id);
      if (lfNpc) {
        return true;
      }
      return false;
    });
  },
};

export const mutationTypes = {
  getNpcStart: "[npc] Get npc start",
  getNpcSuccess: "[npc] Get npc success",
  getNpcFailure: "[npc] Get npc failure",
};

const mutations = {
  [mutationTypes.getNpcStart](state) {
    state.isLoading = true;
    state.data = null;
  },
  [mutationTypes.getNpcSuccess](state, payload) {
    state.isLoading = false;
    state.data = payload;
  },
  [mutationTypes.getNpcFailure](state) {
    state.isLoading = false;
  },
};

export const actionTypes = {
  getNpc: "[npc] Get npc",
};

const actions = {
  [actionTypes.getNpc](context, { apiUrl }) {
    return new Promise((resolve) => {
      context.commit(mutationTypes.getNpcStart);
      npcApi
        .getNpc(apiUrl)
        .then((response) => {
          context.commit(mutationTypes.getNpcSuccess, response);
          resolve(response);
        })
        .catch(() => {
          context.commit(mutationTypes.getNpcFailure);
        });
    });
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
