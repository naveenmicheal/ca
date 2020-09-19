<template>
	<div>
		<v-overlay :value="overlay">
      <v-btn
        icon
        @click="overlay = false"
      >
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </v-btn>
    </v-overlay>
		<v-container class="pa-6">

			<v-row id="cards">
				<v-col wrap cols=12 md=4 v-for="item in products" :key="item._id" >
					<v-item-group>
						<v-card class="elevation-7" tile>
							<!-- <v-img class="mx-auto" width="40%" :src="product.img">
							</v-img> -->
									<v-card-title style="height: 100px;  overflow-y: auto;" class="d-flex justify-center">
								{{item.productname}}
							</v-card-title> 
							
							<v-card-text style="font-size: 30px"  class="d-flex justify-center">
								{{item.productprice}}<v-icon>mdi-currency-inr</v-icon>
							</v-card-text>
							<v-container>
								<v-card-actions>
									<v-btn color="blue" tile text outlined>View
										<v-icon left>mdi-playlist-edit</v-icon>
									</v-btn>
									<v-spacer></v-spacer>
									<v-btn :loading="loading" @click="removeproduct(item._id)" color="red" text tile outlined>Remove
										<v-icon left>mdi-delete</v-icon>
									</v-btn>
								</v-card-actions>
							</v-container>
						</v-card>

					</v-item-group>
				</v-col>
			</v-row>
		</v-container>
		<!-- MODEL -->
<!-- 		<v-dialog v-model="dialog" width="500">
			<v-alert
			prominent
			type="error"
			>
			<v-row align="center">
				<v-col class="grow">Are You Sure Want to Delete?</v-col>
				<v-col class="shrink">
					<v-btn tile text>Yes</v-btn>
				</v-col>
			</v-row>
		</v-alert>
	</v-dialog> -->
	<!-- SECOND -->
	<v-dialog
      v-model="dialog"
      hide-overlay
      persistent
      width="300"
    >
      <v-card
        color="danger"
        dark
      >
        <v-card-text>
          Product Removing From the Database
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
	<!-- END MODEL -->
</div>
</template>

<script type="text/javascript">
	export default{
		name:"productcards",
		data(){
			return{
				overlay:false,
				dialog:false,
				// products:[],
				loading:false,
			}
		},
		// async mounted(){
		// 	console.log("%c Mount Fired ",'background: #222; color: green')
		// },
		computed:{
			products(){
				return this.$store.getters["products/getproducts"]

			}
		},
		methods:{
			removeproduct: async function (e) {
				this.dialog = true
				console.log(e)
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				let data = await this.$axios.$delete("https://salehandler52.herokuapp.com/product/delete/"+e)
				console.log(data)
				if(data['status'] == "success"){
					console.log('Ok')
					this.$store.commit("products/removeproduct",e)
					this.dialog = false
				}
					
				else{
					console.log(result)
				}

			}
		}
	}
</script>


<style scoped>
#cards{
	min-height: 300px;
	max-height: 400px;
}
.v-alert{
	margin-bottom:0;
}
</style>