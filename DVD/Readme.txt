The Source code folder contains two different folders named score-calculation and backend API

The score calculation is a python program that calculate a similarity score from the given dataset and store the similarity matrix on the MongoDB. 
you need specifies your own installed MongoDB connection string or the cloud-hosted instance in the [dburl] variable in the program

dataset's or stored in same directory,

Make sure your system has a python installed and the dependencies such as NumPy, pandas,pymongo,scipy

The backend API is a Node.js program, that can fetch the similarity matrix from the database and send a response to the client in the form of a JSON document
likewise in the python program, you need to replace the database connection string in dburl variable in that program also

before that running Node.js application makes sure you have Node.js and npm install. afterward navigate to the code directory and type npm install, it will install the required dependencies
