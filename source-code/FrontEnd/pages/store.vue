<template>
	<div>
		<v-container class="mt-16" fluid>
			<h1 class="">{{counter}}</h1>
			<v-btn class="" text tile outlined @click="inc"> Increase</v-btn>
		</v-container>
	</div>
</template>

<script type="text/javascript">
	 import { mapMutations } from 'vuex'
	export default{
		data(){
			return{
				
			}
		},
		methods:{
			inc(){
				this.$store.commit("todo/increase",5)
			}
		},
		computed:{
			counter(){
				// return this.$store.getters["todo/data"]
				return this.$store.state.todo.counter
			} 
		}
	}
</script>	