export const state = () => ({
	transactions :[]
})

export const mutations={
	addtransaction(state,data){
		console.log('Add product Executed')
		state.transactions = data
	},
	insertnew(state,item){
		state.transactions.push(item)
	},
	removeproduct(state,id){
		let item = state.transactions.find(i => i["_id"] === id)
		console.log(item)
		state.transactions.splice(state.transactions.indexOf(item),1)
	}
}

export const getters = {
	gettransactions : state =>{
		return state.transactions
	}
}