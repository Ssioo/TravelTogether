# MongoDB Instance Setup and Initial Data Loading

This README file provides instructions on how to create a MongoDB instance and load initial development data.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

- MongoDB: [Installation Guide](https://docs.mongodb.com/manual/installation/)

## Steps

Follow these steps to set up your MongoDB instance and load initial development data:

1. Start MongoDB: 
   - Open a terminal or command prompt.
   - Run the following command to start the MongoDB server:
     ```
     mongod
     ```

2. Create a Database:
   - Open a new terminal or command prompt.
   - Run the following command to open the MongoDB shell:
     ```
     mongo
     ```
   - Inside the MongoDB shell, run the following command to create a new database:
     ```
     use mydatabase
     ```

3. Load Initial Development Data:
   - Create a JSON or CSV file containing the initial development data.
   - Run the following command to load the data into the database:
     ```
     mongoimport --db mydatabase --collection mycollection --file data.json
     ```
     Replace `mydatabase` with the name of your database, `mycollection` with the name of your collection, and `data.json` with the path to your data file.

4. Verify Data:
   - Run the following command inside the MongoDB shell to verify that the data has been loaded successfully:
     ```
     db.mycollection.find()
     ```
     Replace `mycollection` with the name of your collection.

## Conclusion

You have successfully set up a MongoDB instance and loaded initial development data. You can now start building your application using MongoDB as the database.

For more information, refer to the [MongoDB Documentation](https://docs.mongodb.com/).
