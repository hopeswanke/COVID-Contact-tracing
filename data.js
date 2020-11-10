const { ObjectId, MongoClient } = require("mongodb");

class DataStore {
	constructor(url, dbName, collectionName) {
		this.url = url;
		this.dbName = dbName;
		this.collName = collectionName;
		this.connection = null;
	}

	// Establish a connection to Mongo DB
	async connect() {
        console.log('at top of connect ', this.url)
		// check if connection already exists
		if (this.connection && this.connection.isConnected()) {
            console.log('Connected to DB already exists')
			return this.connection;

			// if not, create connection and return it
		} else {
            console.log(('attempting to create a new connection ', this.url))
			const client = await MongoClient.connect(this.url, { useUnifiedTopology: true });
            console.log('after getting connected ', client)
            this.connection = client;
            console.log('Created new DB connection, now connected.')
			return this.connection;
        }
        console.log('at bottom of connect')
    }
    
    // Read all Users
	async readData() {
        console.log('in readData')
        let client = await this.connect();
        console.log('after connect ', client)
        let db = await client.db(this.dbName);
        console.log('after client.db ', this.dbName)
		const collection = db.collection(this.collName);
		let dataArr = await collection.find({}).toArray();
		return dataArr;
	}
}

module.exports = DataStore;