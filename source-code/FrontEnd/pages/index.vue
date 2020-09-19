<template>
  <v-app style="background-image: linear-gradient(135deg, transparent 0%, transparent 21%,rgba(131, 20, 209,0.4) 21%, rgba(131, 20, 209,0.4) 51%,transparent 51%, transparent 100%),linear-gradient(45deg, transparent 0%, transparent 16%,rgb(131, 20, 209) 16%, rgb(131, 20, 209) 21%,rgb(88, 22, 184) 21%, rgb(88, 22, 184) 64%,transparent 64%, transparent 100%),linear-gradient(90deg, rgb(255,255,255),rgb(255,255,255));" id="inspire">
    <v-main>
      <v-container
      class="fill-height"
      fluid
      >
      <v-row
      align="center"
      justify="center"
      >
      <v-col
      cols="12"
      sm="8"
      md="4"
      >
      <v-card tile class="elevation-12">
        <v-toolbar
        dark
        flat
        >
        <v-toolbar-title>Login form</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
          label="Login"
          name="login"
          prepend-icon="mdi-account"
          type="text"
          v-model="username"
          ></v-text-field>

          <v-text-field
          id="password"
          label="Password"
          name="password"
          prepend-icon="mdi-lock"
          type="password"
          v-model="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn :loading="loading" @click="login" tile block color="primary">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</v-row>
</v-container>
<!-- SNAKEBAR -->
<v-snackbar  v-model="snackbar" >
  Authentication Failed 
  <v-btn
  color="pink"
  text
  @click="snackbar = false"
  >
  Close
</v-btn>
</v-snackbar>
</v-main>
</v-app>
</template>

<script>
  export default {
  	layout:"login",
    name:"loginpage",
  	data(){
  		return{
  			username:"admin@mail.com",
  			password:"pass524",
        loading:false,
        snackbar:false,
      }
    },
    methods:{
      login: async function (e) {
        this.loading = true
        console.log()
        let result = await this.$axios.$post(
          "https://salehandler52.herokuapp.com/user/login",
          {
            "email":this.username,
            "password":this.password
          })
        console.log(result)
        if(result['status'] == "fail"){
          this.snackbar = true
          this.loading = false

        }
        else{
          document.cookie = "token="+result["token"]
          this.$axios.setHeader('Authorization', 'Bearer '+result["token"])
          let data = await this.$axios.$get("https://salehandler52.herokuapp.com/product/store")
          console.log(data)
          this.$store.commit("products/addproduct",data['data'])
          let allt = await this.$axios.$get("https://salehandler52.herokuapp.com/transaction/new")
          this.$store.commit("transaction/addtransaction",allt['data'])
          this.$router.push('/dashboard')
        }
      }
    },
    mounted(){
      this.$axios.$get("https://salehandler52.herokuapp.com").then(sresult =>console.log(sresult))
    }  
  }
</script>