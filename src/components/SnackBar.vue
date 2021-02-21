<template>
  <div>
    <v-snackbar v-model="snackbar">
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="pink"
          text
          v-bind="attrs"
          @click="snackbar =false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import Vue  from "vue";
import Component from "vue-class-component";
import stores from '@/store' 
@Component({  
})
export default class SnackBar extends Vue {
  get snackbar(){ 
    return stores.getters.snVisibility;
  }
  set snackbar(value){
    stores.dispatch('setSbVisibilty',value)
  }
  get text(){
    console.log(stores.getters.snText);
    
    return stores.getters.snText;
    }
  
    
 
}
</script>
