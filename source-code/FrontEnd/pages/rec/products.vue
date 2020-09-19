<template>
	<div>
		<v-container>
			<TopBar/>
			<v-row>
				<v-col md=6>
					<h1 class="text-center">Select a Product</h1>
					<v-select 
					:items="items"
					solo
					label="Select a Product.."
					></v-select>
				</v-col>
				<v-col md=6>
					<h1 class="text-center">Similar compared Product 0 </h1>
					
					<v-simple-table>
						<template v-slot:default>
							<thead>
								<tr>
									<th class="text-left">Position</th>
									<th class="text-left">Product Name</th>
									<th class="text-left">Score</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>0</td>
									<td>product20</td>
									<td>0.19999999999999973</td>
								</tr>
								<tr>
									<td>1</td>
									<td>product41</td>
									<td>0.2967559989973</td>
								</tr>
								<tr>
									<td>2</td>
									<td>product28</td>
									<td>0.3999999999999999</td>
								</tr>
								<tr>
									<td>3</td>
									<td>product4</td>
									<td> 0.44721359549995754</td>
								</tr>
								<tr>
									<td>4</td>
									<td>product29</td>
									<td>0.44721359549995754</td>
								</tr>
								<tr>
									<td>5</td>
									<td>product36</td>
									<td>0.5656854249492376</td>
								</tr>
								<tr>
									<td>6</td>
									<td>product19</td>
									<td>0.5656854249492382</td>
								</tr>
								<tr>
									<td>7</td>
									<td>product45</td>
									<td>0.6324555320336755</td>
								</tr>
								<tr>
									<td>8</td>
									<td>product3</td>
									<td>0.6324555320336758</td>
								</tr>
								<tr>
									<td>9</td>
									<td>product44</td>
									<td>0.632455532033676</td>
								</tr>
								<tr>
									<td>10</td>
									<td>product9</td>
									<td>0.7211102550927981</td>
								</tr>

							</tbody>
						</template>
					</v-simple-table>
				</v-col>
			</v-row>
		</v-container>
		
	</div>
</template>

<script type="text/javascript">
	import TopBar from "~/components/basics/topbar"
	layout:"login"
	export default{
		layout:"login",
		components:{TopBar},
		data(){
			return{
				items:["Product0","Product1","Product2","Product3","Product4","Product5","Product6"]
			}
		}
	}
</script>