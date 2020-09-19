export const state = () => ({
	products :[]
})

export const mutations={
	addproduct(state,data){
		console.log('Add product Executed')
		state.products = data
	},
	insertnew(state,item){
		state.products.push(item)
	},
	removeproduct(state,id){
		let item = state.products.find(i => i["_id"] === id)
		console.log(item)
		state.products.splice(state.products.indexOf(item),1)
	}
}

export const getters = {
	getproducts : state =>{
		return state.products
	}
}