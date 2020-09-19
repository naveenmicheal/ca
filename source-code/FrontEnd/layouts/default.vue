<template>
  <v-app id="root">
    <v-main>
  	<sidebar/>
    <nuxt/>
  </v-main>
  </v-app> 
</template>

<script>
	
	import sidebar from "~/components/basics/sidebar"
  export default {
    data() {
      return{

      }
    },
    components:{
    	sidebar,

    }
  }
</script>

<style scoped>
  #root{
    background-color: #EAEFF8
  }
  body {
    min-width: 1024px !important;
}
</style>
