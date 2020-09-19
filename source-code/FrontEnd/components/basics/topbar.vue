<template>
	<div class="pa-3">
		<v-app-bar  dense flat color="light">
			<div id="date">{{date}}</div>
			<v-spacer></v-spacer>
			<v-spacer></v-spacer>
			<v-btn color="black" nuxt text><v-icon left>mdi-store</v-icon>View Store</v-btn>
			<div id="avatar">
				<v-avatar size="40">
				<img
				src="https://cdn.vuetifyjs.com/images/john.jpg"
				alt="John"
				>

			</v-avatar>
			<v-btn style="padding: 0" text >Wired Market</v-btn>
			<v-btn @click="logout" text outlined tile>Log Out <v-icon right >mdi-exit-to-app</v-icon></v-btn>
			</div>
			<v-spacer></v-spacer>	
		</v-app-bar>
	</div>
</template>

<script type="text/javascript">

	export default{
		data(){
			return{
				date: new Date().toDateString()
			}
		},
		methods:{
			logout: function () {
				document.cookie ="token=null"
				this.$router.push('/')
			}
		}
	}
</script>

