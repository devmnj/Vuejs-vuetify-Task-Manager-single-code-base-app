<template>
  <div class="home">
    <v-text-field
      class="pa-2"
      v-model="newTask"
      label="Task title"
      outlined
      clearable
      append-icon="mdi-plus"
      hide-details
      @click:append="addTask"
      @keyup.enter="addTask"
    ></v-text-field>    
     <TaskList />     
     <SnackBar/>  
     {{this.$store.state.localTasks}}  
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TaskList from "@/components/TaskList.vue";
 import SnackBar from "@/components/SnackBar.vue";
import { Task } from "@/types";

@Component({
  components: {
    TaskList,
    SnackBar
  },
})
export default class Home extends Vue {
  editShow = false;
  newTask = "";
  isdone = false;
  etaskTitle = "";
  ctask = {};
 
  created() {
    console.log("created");
  }
   
  
  addTask() {
    if (this.newTask) {
      const ntsk = {
        id: this.$store.state.tasks.length ? this.$store.state.tasks[this.$store.state.tasks.length-1].id+1:1 ,
        title: this.newTask,
        isdone: false,
      } as Task;
      this.$store.dispatch("addTask", ntsk);

      this.newTask = "";
    } 
  }
   
  
}
</script>
