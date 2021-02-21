import { Task } from '@/types';
import Vue from 'vue'
import Vuex from 'vuex'
import * as  taskData from '@/mockData/taskData.json'

Vue.use(Vuex)

export default new Vuex.Store({ 
  state: {    
     openEdit:false,
     snBar: {
      text: '',      
      visibility: false
    },
    //  tasks: taskData 
    tasks:[
      { id: 1, title: "work out", isdone: true },      
    ] 
  },
  mutations: {
    setSbMessage(state, msg) {
      state.snBar.visibility = false;
      if (msg.length > 0) {
        state.snBar.text = msg;
        state.snBar.visibility = true;
      }
    },
    openForEdit(state,newVal){
      state.openEdit=newVal;
    },
    addTask(state, newVal) {
      state.tasks.push(newVal);
    },
    deleteTask(state, id: number) {
      state.tasks = state.tasks.filter((task) => task.id !== id);
    },
    toogleTask(state, id: number) {
      const task = state.tasks.filter((task) => task.id === id)[0];
      task.isdone = !task.isdone;
    },
    updateStatus(state, t: any) {
      const indx = state.tasks.indexOf(t);
      state.tasks[indx].isdone=!state.tasks[indx].isdone
    },
    updateTask(state, t: any) {
      const indx = state.tasks.indexOf(t);
      state.tasks[indx] = t;
    },
    getTask(state, id) {
      
      const t = state.tasks.filter((task) => task.id === id)[0];
      return t;
    }
  },
  actions: {
    updateStatus({commit}, task: Task){
     commit('updateStatus',task)
    },
    openForEdit({commit}){
         commit('openForEdit',true);
    },
    closeEdit({ commit }) {
      commit('openForEdit', false);
    },
    setSbMessage({ commit }, msg) {
      commit('setSbMessage', msg);
    },
    setSbVisibilty({ commit }, flag) {
      commit('setSbMessage', '');
    },
    addTask({ commit }, newValue) {
      commit('addTask', newValue)
      commit('setSbMessage', 'Task Created')
    },
    deleteTask({ commit }, id) {
      commit('deleteTask', id)
      commit('setSbMessage', 'Task Deleted')
    }
    , toogleTask({ commit }, id) {
      commit('toogleTask', id)
    },
    updateTask({ commit }, task) {
      commit('updateTask', task)
      commit('setSbMessage', 'Task Updated')
    }
    , getTask({ commit }, id) {
      commit('getTask', id)
    }
  },
  getters: {
    snVisibility(state) {
      return state.snBar.visibility;
    },
    snText(state) {
      return state.snBar.text;
    }
    ,isOpenEdit(state){
     return state.openEdit;
    }
    ,getFdTasks(state){
      return state.tasks.filter(task => task.isdone !== false);
    }
  },
  modules: {
  }
})
