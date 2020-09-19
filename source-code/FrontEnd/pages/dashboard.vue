<template>	
<div>
	<TopBar />
	<DashCards/>
</div>		
</template>

</div>

</template>

<script>
	import TopBar from "~/components/basics/topbar"
	import DashCards from "~/components/objects/dashcards"
	export default {
		name:"dashboard",
		data () {
			return {
				
			}
		},
		components:{TopBar,DashCards}
	}
</script>