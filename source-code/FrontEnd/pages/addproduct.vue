<template>
	<div>
		<TopBar/>
		<v-container class="pa-10">
			<h1 class="text-center">Add a New Product</h1>
			<v-form>
				<v-row>
					<v-col cols="4">
						<v-text-field background-color="blue lighten-5" prepend-icon="mdi-note" v-model="productname" label="Product Name"></v-text-field>
					</v-col>
					<v-col cols="4">
						<v-text-field background-color="blue lighten-5" type="number" prepend-icon="mdi-cash-multiple" v-model="productprice" label="Product Price"></v-text-field>
					</v-col>
					<v-col cols="4">
						<v-text-field background-color="blue lighten-5" type="number" prepend-icon="mdi-percent" v-model="tax" label="Product Tax"></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols=12>
						<v-textarea row-height=20  auto-grow background-color="blue lighten-5" prepend-icon="mdi-format-align-left" v-model="desc" label="Product Description"></v-textarea>
					</v-col>
					<v-col cols=4>
						<v-text-field background-color="blue lighten-5" type="number" prepend-icon="mdi-sack-percent" v-model="stock" label="Stock Count"></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols=6>
						<v-btn  tile outlined block class="black--text" @click="addproduct"><v-icon left>mdi-check</v-icon>Save</v-btn>
					</v-col>	
				</v-row>
			</v-form>
			<!-- DIALOGS -->
			<v-dialog v-model="dialog" hide-overlay persistent width="500">
				<v-card dark>
					<v-card-text class="pa-6">
						Adding a Product ...
						<v-progress-linear indeterminate color="white" class="mb-0 pa-1"></v-progress-linear>
					</v-card-text>
				</v-card>
			</v-dialog>
			<v-dialog hide-overlay persistent width="500"  v-model="error" >
			<v-alert type="error"  prominent border="left" dismissible
			elevation="10" transition="scale-transition"	>
				Product Creation Failed, <strong>Product Name can't be duplicated and all fields are required</strong> 
			</v-alert>
		</v-dialog>


		</v-container>
	</div>
</template>

<script type="text/javascript">
	import TopBar from "~/components/basics/topbar"
	export default{
		name:"addpoduct",
		components:{TopBar},
		data(){
			return{
				productname:'',
				productprice:'',
				tax:'',
				desc:'',
				stock:'',

				dialog:false,
				error:false
			}
		},
		methods:{
			addproduct: async function () {
				this.dialog = true
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				let data = await this.$axios.$post("https://salehandler52.herokuapp.com/product/addproduct",
				{
					"productname": this.productname,
					"productprice": this.productprice,
					"tax":this.tax,
					"description": this.desc,
					"stock": this.stock
				})
				console.log(data)
				if(data['status'] == "success"){
					console.log('Ok')
					this.$store.commit("products/insertnew",data["data"])
					this.$router.push("/products")
				}

				else{
					console.log(data['result'])
					this.dialog = false
					this.error = true
				}
			}
		}
	}
</script>