// Load the required Modules
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv').config()

// Initialize the Express App Instance
const app = express()

// Assigns a PORT to Web Application
const port = process.env.PORT || 5000

// Get the DataBase URI From the System Environment Variables
let url = process.env.DBURI;

// Establish a Connection to MongoDB
mongoose.connect(url,
	{
		dbName:'ca_db',
		useNewUrlParser: true, 
		useUnifiedTopology: true
	}
);

mongoose.set('useCreateIndex', true);

const db = mongoose.connection;
db.on('error', ()=>console.log("DB Connection Error"));
db.once('open',()=>console.log('Connction DB Done'));

// initialize a Schema for MongoDB Collections
const caschema = mongoose.Schema({
	name:{
		type:String,
		required:true,
	},

	similar:{
		type:Array,
		required:true,
	}
});

// Bind the schema to MongoDB Collection
model = mongoose.model('ca_scores', caschema);


// Create Index Route, that send a response about the instance
app.get('/',(req,res)=>{
	res.json({
		Name: "Cognitive-Analytica",
		InstanceId : "7E3AL83Z",
		status : "Active"
	})
})

// Get Route for all product simlilarity 
app.get("/all",(req,res)=>{
	// select the all record
	model.find({},(err,result)=>{
		if(err){
			// send a errorr esponse
			res.json({
				status:"fail",
				data:err
			})
		}
		else{
			// Get a success response
			res.json({
				status:"success",
				data:result
			})
		}
	})
})
// Initiallize a End point that taking a product name on the query
app.get('/item/:productname',(req,res)=>{
	// fetch the Product name parameter from request object
	let query = req.params.productname

	// Query the Database and get the result
	model.find({"name":query},(err,result)=>{
		// If the Query returns error
		if(err){
			res.json(err)
		}
		// If the Query returns a successfull result
		else{
			// Extract the Required Data from the Query result
			raw_data = result[0]['similar'][0]

			// Initialize the Empty Array
			let sortable = [];

			// Loop every object in the fetched data
			for (let value of Object.keys(raw_data)) {

				  // Push the Every Object into the Array
  				  sortable.push([value, raw_data[value]]);
				}

			// Sort the Every Elements in the Array
			let similar = sortable.sort(function(a, b) {
					// Return the Array in ascending
	 			   return a[1] - b[1];
			});
			// Send a resonse in the JSON Format
			res.json({similar})
		}
	})
})

// Listen a Application on a specified Port
app.listen(port,()=>{
	// Print the debug line 
	console.log(`Server Listening in ${port} `)
})