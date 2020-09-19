```
<v-item-group height="">
					<v-card tile  height="100%">
						<v-img class="mx-auto" width="40%" :src="product.img">
						</v-img>
						<v-card-title class="d-flex justify-center">
							{{product.productname}}
						</v-card-title> 
						<v-card-actions>
							<v-btn color="green" tile text outlined>Click Me </v-btn>
						</v-card-actions>
					</v-card>
</v-item-group>
```