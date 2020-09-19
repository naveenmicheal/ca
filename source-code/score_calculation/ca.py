# Import Required Modules and library
import pandas as pd
import numpy as np
from scipy.spatial import distance
from pymongo import MongoClient
import os
import sys

# Read Dataset CSV File from the disk
df = pd.read_csv('dataset.csv')



#Arrange a CSV File in a order
rows = rows = df['name'].values.tolist()
df['min'] =  (df['o1'] + df['c1'] + df['e1'] + df['a1'] + df['n1']) /5
df['max'] =   (df['o2'] + df['c2'] + df['e2'] + df['a2'] + df['n2']) /5
df.set_index('name', inplace=True)

# Crate a new Empty datafram
newdf = pd.DataFrame(index=rows,columns=rows)

# Loop each record(min max) in dataframe and find eucledean distance of them
for index,rec in df.iterrows():
  now = [rec['min'],rec['max']]
  for sindex,srec in df.iterrows():

    sub = [srec['min'],srec['max']]
    new_value = distance.euclidean(now,sub)
    newdf.at[index,sindex] = new_value
print(newdf)
# Store the new Dataframe in mongodb
client = MongoClient("mongodb+srv://ca:cognitive3773@workspace.ohvca.mongodb.net/ca_db?retryWrites=true&w=majority")


db = client['ca_db']
collection = db['ca_scores']

# Convert a dataframe into JSON Format
data = newdf.to_dict()
row = newdf.index.values.tolist()
# Iterate Each row and convert into Object
for key in row:
  newobj = {
            'name':key,
            'similar':[data[key]]
            } 
  # Insert the objects into MongoDB 
  rec_id = collection.insert_one(newobj).inserted_id
  # Print the ID of each Inserted Record
  print(rec_id)
  print("Added to Database Collection")

  
print("Completed")

