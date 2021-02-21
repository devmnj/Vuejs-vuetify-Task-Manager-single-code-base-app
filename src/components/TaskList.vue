<template>
  <div>
    <v-list class="pt-0" subheader two-line flatc>
      <div v-for="task in $store.state.tasks" :key="task.id">
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
import Vue from "vue";
import Component from "vue-class-component";
import EditDialog from "@/components/EditDialog.vue";

@Component({
  components: {
    EditDialog,
  },
})
export default class TaskList extends Vue {
  tid = 0;

  get selTask() {
    return this.tid;
  }

  deleteTask(id: number) {
    this.$store.dispatch("deleteTask", id);
  }
  updateStatus(t: any) {
    if ( t) {      
      this.$store.dispatch("updateStatus", t);
      // this.isdone=false;
      this.$store.dispatch("closeEdit");
      console.log('Status Updated');
      
    } else {
      console.log("Error");
    }
  }
  taskHandler(id: number) {
    this.$store.dispatch("toogleTask", id);
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
    } else if (m.id === 3) {
      //change status
      console.log("ready for Update Status");
      this.updateStatus(t);
    }
  }

  menu = [
    { id: 1, title: "Edit", icon: "mdi-pencil-outline" },
    { id: 2, title: "Delete", icon: "mdi-delete" },
    { id: 3, title: "Update Status", icon: "mdi-checkbox-marked" },
  ];
}
</script>

<style scoped></style>
