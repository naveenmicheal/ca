<template>
	<div>
		<TopBar/>
		<v-container>
			<v-row>
				<v-col cols=9>
					<v-card>
						<v-card-title>
							All Transactions
							<v-spacer></v-spacer>
							<v-text-field
							v-model="search"
							append-icon="mdi-magnify"
							label="Search"
							single-line
							hide-details
							></v-text-field>
						</v-card-title>
						<v-data-table
						:headers="headers"
						:items="items"		
						item-key="Date"
						:search="search"
						:loading="loading"
						class="elevation-1"
						>
						<v-chip color="red"></v-chip>
					</v-data-table>
				</v-card>
			</v-col>
			<v-col>
				<h1 class="text-center">View</h1>
				<v-text-field v-model="invoicenumber" solo placeholder="Transaction Number..."></v-text-field>
				<v-btn block tile outlined @click="openinvoice">Get Invoice</v-btn>
			</v-col>
		</v-row>
		<!-- INVOICE DIALOG -->
		<v-dialog v-model="invoiceprompt" persistent max-width="700">
			<v-card>
				<v-card-title class="headline">Invoice Number</v-card-title>
				<v-card-text class="d-inline">Customer Name: </v-card-text>
				<v-card-text class="d-inline" >Customer Name: </v-card-text>
				<v-card-text class="d-inline" >Customer Name: </v-card-text>
				<v-card-actions>
					<v-spacer></v-spacer>
					<v-btn color="black darken-4" text tile outlined @click="invoiceprompt = false">Close</v-btn>
					<v-btn color="blue darken-1" text tile outlined @click="">Print</v-btn>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</v-container>
</div>
</template>

<script type="text/javascript">
	import TopBar from "~/components/basics/topbar"
	export default{
		data(){
			return{
				Hello : "World",
				items :[],
				expanded: [],
				singleExpand: true,
				search: '',
				loading:true,

				invoicenumber:'',
				invoiceprompt:false,
				headers:[
				
				{text:"Customer Name",value:"customer"},
				{text:"Date",align: 'start',value:"date"},
				{text:"Total Price",value:"totalprice"},
				{text:"Show Invoic",value:"info"}
				]
			}
		},
		components:{TopBar},
		methods:{
			openinvoice(){
				this.invoiceprompt = true
			},
			getinvoice(e){
				console.log(e)
			}
		},
		async mounted(){
			let token = document.cookie.split(";")[0].split("=")[1]
			this.$axios.setHeader('Authorization', 'Bearer '+token)
			let data = await this.$axios.$get("https://salehandler52.herokuapp.com/transaction/all")
			console.log(data)
			if(data["status"] == "success"){
				// this.items = data["data"]
				let temp = []
				for(let obj of data["data"]){
					let newobj = {
						"date": obj.date.split(' ')[0] + "-" + obj.date.split(' ')[1]+ "-"+ obj.date.split(' ')[2],
						"customer": obj.customer[0]["customername"],
						"totalprice":obj["finalprice"],
						"info":obj.transaction_id
					}
					temp.push(newobj)
				}
				this.items = temp
				this.loading = false
			}
		},
	}
</script>