<template>
  <div>
    <v-dialog v-model="this.show" max-width="500px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit Task</span>
        </v-card-title>
        <v-text-field
          class="pa-2"
          v-model="title"
          label="Task title"
          outlined           
          clearable
          @keyup.enter="updateTask(task)"
          hide-details
        ></v-text-field>
        <v-checkbox
          label="Completed ?"
          v-model="isdone"
          class="pa-2"
          :input-value="this.selTask.isdone"
          color="primary"
        ></v-checkbox>

        <v-card-actions>
          <v-btn color="primary" @click.stop="updateTask(task)">Update</v-btn>
          <v-btn color="primary" @click="closeWindow">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import Component from "vue-class-component";
import { Task } from "@/Types";
import store from "@/store";

const editProp = Vue.extend({
  props: {
    task: {
      type: Object as PropType<Task>,
    },
  },
});
@Component({
  components: {},
})
export default class EditDialog extends editProp {
  
  title= "";
  mounted() {
    this.title= this.task.title;
    this.isdone = this.task.isdone; 
  } 
  get selTask() {
    return this.task;
  }
  get show() {
    return store.getters.isOpenEdit;
  }
   closeWindow( ) {
    this.$store.dispatch("closeEdit");
  }
  isdone = false;
  updateTask(t: any) {
    if (this.title && t) {
      t.title = this.title;
      t.isdone = this.isdone;
      this.$store.dispatch("updateTask", t);
      this.title = "";
      this.isdone = false;
      this.$store.dispatch("closeEdit");
    } else {
      console.log("Error");
    }
  }
}
</script>
