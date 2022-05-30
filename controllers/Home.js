module.exports = (app, db) => {
    app.get("/home", (req, res) => {

        const { MongoClient, ServerApiVersion, Collection } = require('mongodb');
        const uri = process.env.MONGOOSE;
        const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
        client.connect(err => {

            const collection = client.db("test").collection("devices");

            // perform actions on the collection object
            client.close();
        });

        res.render('home', db());
    });

}