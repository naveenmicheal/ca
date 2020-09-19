<template>
	<div>
		<TopBar/>
		<v-container>
			<v-row  >
				<v-col cols=3>
					<!-- <p>Customer Information</p> -->
					<v-btn text tile outlined> 	Customer Information</v-btn>
				</v-col>
				<v-col cols=3>

					<v-text-field v-model="customername" prepend-inner-icon="mdi-account"  label="Customer Name" hide-details=false single-line solo dense></v-text-field>
				</v-col>
				<v-col cols=3>
					<v-text-field prepend-inner-icon="mdi-map-marker" label="Customer Address" single-line solo  hide-details=false dense></v-text-field>
				</v-col>
				<v-col cols=3	>
					<v-text-field v-model="customercontact" prepend-inner-icon="mdi-phone" label="Customer Contact" single-line solo  hide-details=false dense></v-text-field>
				</v-col>
			</v-row>

			<v-row>
				<v-col cols="8"></v-col>
				<v-col cols="4">
					<v-btn @click="paymentprompt = true" tile outlined block color="black" class="green" type="success">Save</v-btn>
				</v-col>
			</v-row>

		</v-container>

		<!-- Invoice Page -->
		<v-container>
			<v-row class="ml-1">
				<v-col style="border:3px solid" cols=8>
					<v-row>
						<v-col cols=6>
							<h2>Acme Stores</h2>
							<span><strong>Sales Person: </strong> {{salesman}}</span>
<!-- 							<span>XYZ Address</span>-
							<span>PQRS State</span><br>
							<span>0987654321</span> -->
						</v-col>
						<v-col cols=6>
							<span><strong>To:</strong> {{customername}}</span><br>
							<span><strong>Contact:</strong> {{customercontact}}</span>
							

						</v-col>

					</v-row>
					<hr>

					<v-row>
						<v-col cols="4">
							Name
						</v-col>
						<v-col cols="2">
							Price
						</v-col>
						<v-col cols="1">
							Tax
						</v-col>
						<v-col cols="2">
							Quantity
						</v-col>
						<v-col cols="3">
							Total
						</v-col>
					</v-row>
					<v-row v-for="(item,index) in selected" :key=index>
						<v-col cols="4">
							{{item.productname}}
						</v-col>
						<v-col cols="2">
							{{item.productprice}}
						</v-col>
						<v-col cols="1">
							{{item.tax}}
						</v-col>
						<v-col cols="2">
							<input type="number" v-model="item.quantity">
							<!-- <v-btn @click="item.productprice++">Plus</v-btn> -->
						</v-col>
						<v-col class="totalamount" cols="3">
							<input type="number" v-model="item.total = (((item.tax/100) * item.productprice) + item.productprice) * item.quantity">
						</v-col>
					</v-row>
					<v-row>
						<v-col cols="9">
							Total Amount:
							<!-- <v-btn @click="final" tile>calculate</v-btn> -->
						</v-col>
						<v-col col="3">
							{{finalprice}}
						</v-col>
					</v-row>

				</v-col>

				<!-- PRODUCTS LISTINGS -->
				<v-col class="pt-0" cols=4>
					<v-data-table
					tile
					v-model="selected"
					:headers="headers"
					:items="items"
					:single-select="singleSelect"
					item-key="productname"
					show-select
					class="elevation-10"
					:loading = loading 
					loading-text="Loading... Please wait"
					>
				</v-data-table>
			</v-col>
		</v-row>

		<v-dialog v-model="paymentprompt" persistent max-width="590">
			<v-card>
				<v-card-title class="headline">Total Amount: {{finalprice}}</v-card-title>
				<v-card-text>Here All Your Specific Customization Placed</v-card-text>
				
			</v-select>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="green darken-1" text @click="paymentprompt = false">Cancel</v-btn>
				<v-btn color="green darken-1" text @click="maketransaction">Done</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>

	<v-dialog v-model="transaction" hide-overlay persistent width="500">
		<v-card dark>
			<v-card-text class="pa-6">
				Making a Transaction ....
				<v-progress-linear indeterminate color="white" class="mb-0 pa-1"></v-progress-linear>
			</v-card-text>
		</v-card>
	</v-dialog>
</v-container>
</div>
</template>

<script type="text/javascript">
	import TopBar from "~/components/basics/topbar"
	export default{
		name:"invoice",
		data(){
			return{
				customername:"Kara Ak300",
				customercontact:"0987654321",
				customeraddress:"Antartica",
				selected:[],
				singleSelect:false,
				items:[],
				loading: true,
				paymentprompt: false,
				payemntoptions:["Cash","UPI","Debit Card"],
				transaction:false,

				headers:[
				{ text: 'Name', align: 'start',sortable: true,value: 'productname'},
				{ text: 'Price', value: 'productprice' },
				{ text: 'Tax', value: 'tax' },
				],

			}
		},
		computed: {
			salesman(){
				return "Name"
			},
			finalprice:function () {
				let final = 0
				for(let value of this.selected){
					final = final + value['total']
				}
				return final
			}
		},
		methods:{
			async maketransaction(e){
				this.transaction = true
				let token = document.cookie.split(";")[0].split("=")[1]
				this.$axios.setHeader('Authorization', 'Bearer '+token)
				let newdata = await this.$axios.$post("https://salehandler52.herokuapp.com/transaction/new",
				{
					"items":this.selected,
					"customer":[
					{
						"customername":this.customername,
						"Address":this.customeraddress,
						"contact":this.customercontact
					}					
					],
					finalprice:this.finalprice
				})
				if(newdata["status"] == "success"){
					console.log("DONE")
					this.transaction = false
					this.$router.push("/transactions")
				}
				else{
					this.transaction = false
					console.log(newdata)
				}
			}
		},
		components:{TopBar},

		async mounted(){
			console.log("%c Invoice Mounted Fired ",'background: #222; color: green')
			let token = document.cookie.split(";")[0].split("=")[1]
			this.$axios.setHeader('Authorization', 'Bearer '+token)
			let getdata = await this.$axios.$get("https://salehandler52.herokuapp.com/product/store")
			if(data["status"] == "success"){
				console.log(data["data"])
				let t = []
				for(let item of data['data']){
					item.quantity = 1
					item.total = 0
					t.push(item)
				}
				this.items = t
				this.loading = false
			}
			else{
				console.log(data)
			}
		}
	}
</script>

<style>
</style>