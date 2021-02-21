<template>
  <div class="comp pa-4">
  <h4>Completed Tasks</h4>
    <v-list class="pt-0" subheader two-line flatc>
      <div v-for="task in this.tasks" :key="task.id">
        <v-list-item :class="{ 'blue lighten-5': task.isdone }">
          <template>
            <v-list-item-action>
              <v-checkbox @click="updateStatus(task)" :input-value="task.isdone" color="primary"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ task.title }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn @click.stop="deleteTask(task.id)" icon>
                <v-icon color="blue lighten-2">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
            <!-- <Menu /> -->
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon color="blue">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <div v-for="(menu, i) in menu" :key="i">
                  <v-list-item @click="popupAction(menu, task)">
                    <v-list-item-icon>
                      <v-icon color="blue">{{ menu.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>{{ menu.title }}</v-list-item-title>
                  </v-list-item>
                </div>
              </v-list>
            </v-menu>
            <!-- menu -->
            <EditDialog :task="task" v-model="$store.getters.isOpenEdit" />
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Component from "vue-class-component";
import { EventBus } from "@/store/eventBus";
import { Task } from "@/types";
import EditDialog from "@/components/EditDialog.vue";

// const selTaskProps = Vue.extend({
//   props: {
//     selTask: {
//       type: Object as PropType<Task>,
//     },
//   },
// });

@Component({
  components: {
    EditDialog,
  },
})
export default class CompletedTasks extends Vue {
  fTasks= [] as Task[]; 
  
  mounted() {
      this.fTasks= this.$store.getters.getFdTasks;                 
  }
  tid = 0;
  get tasks() {     
       
       console.log(this.fTasks);
    return this.fTasks;
  }
  get selTask() {
    return this.tid;
  } 
  deleteTask(id: number) {
    this.$store.dispatch("deleteTask", id);    
    this.fTasks = this.fTasks.filter((el)=> el.id !== id);    
  }
  taskHandler(id: number) {
    this.$store.dispatch("toogleTask", id);
  }
  updateStatus(t: any) {
    if ( t) {      
      this.$store.dispatch("updateStatus", t);
      // this.isdone=false;
      this.$store.dispatch("closeEdit");
      console.log('Status Updated');
        this.fTasks= this.$store.getters.getFdTasks;   
       
        
    } else {
      console.log("Error");
    }
  }
  popupAction(m: any, t: any) {
    console.log("MENU choosen= ", m);
    console.log("Task= ", t);
    if (m.id === 1) {
      this.$store.dispatch("openForEdit");
      console.log("Opening Dialog for Editing", this.selTask);
    } else if (m.id === 2) {
      //delete
      console.log("ready for delete");
      this.deleteTask(t.id);
      // console.log("Deletion completed");

    } else if (m.id === 3) {
      //
      this.updateStatus(t);
      console.log('Status updated');
      
    }
  }
  menu = [
    { id: 1, title: "Edit", icon: "mdi-pencil-outline" },
    { id: 2, title: "Delete", icon: "mdi-delete" },
    { id: 3, title: "Mark as Done", icon: "mdi-checkbox-marked" },
  ];
}
</script>

<style scoped></style>
