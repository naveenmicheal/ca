<template>
	<div>
		<TopBar/>
		<ProductCards/>
	</div>
</template>

<script type="text/javascript">
	import TopBar from "~/components/basics/topbar"
	import ProductCards from "~/components/objects/productcards"
	export default{
		data(){
			return{

			}
		},
		components:{ProductCards,TopBar}
	}
</script>