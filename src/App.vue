<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app class="green lighten-3">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title"> Application </v-list-item-title>
          <v-list-item-subtitle> subtext </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
     
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
         

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="#43a047"
      dark
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      prominent
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(55,236,186,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-app-bar-title default="{props}">Tasks </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

 <!-- <Menu /> -->
            <v-menu bottom left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn dark icon v-bind="attrs" v-on="on">
                  <v-icon color="blue">mdi-dots-vertical</v-icon>
                </v-btn>
              </template>
              <v-list>
                <div>
                  <v-list-item @click="clearAll">
                    <v-list-item-icon>
                      <v-icon>mdi-broom</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Clear All</v-list-item-title>

                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-help</v-icon>
                    </v-list-item-icon>
                    <v-list-item-title>Help</v-list-item-title>
                    
                  </v-list-item>

                </div>
              </v-list>
            </v-menu>
      <!-- <v-btn icon> -->
        <!-- <v-icon>mdi-dots-vertical</v-icon> -->
      <!-- </v-btn> -->
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      { title: "Dashboard", icon: "mdi-view-dashboard", to: "/" },
      { title: "Completed Tasks", icon: "mdi-check-all", to: "/completed" },
      { title: "About", icon: "mdi-help-box", to: "/about" },

    ] 
  }),
  methods: {
    clearAll(){
      this.$store.state.tasks=[]

    }
  },
};
</script>
