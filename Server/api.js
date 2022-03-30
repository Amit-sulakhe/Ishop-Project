var express = require("express");
var mongoClient = require("mongodb").MongoClient;
var cors = require("cors");
const req = require("express/lib/request");
const { response } = require("express");

var connectionString = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());

app.use(express.urlencoded({
    extended:true
}));
    
app.use(express.json());

app.get('/getcustomers',(request,response)=>{
    mongoClient.connect(connectionString,(err,clientObj)=>{
        if(!err){
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tblcustomers").find().toArray((err,document)=>{
                if(!err){
                    response.send(document)
                }
            })
        }
    })
});

app.post('/registercustomer',(request,response)=>{
    mongoClient.connect(connectionString,(err,clientObj)=>{
        if(!err){
            var dbo = clientObj.db("ishopdb");
            var data = {
                "UserId":request.body.UserId,
                "UserName":request.body.UserName,
                "Password":request.body.Password,
                "Mobile":request.body.Mobile,
                "Email":request.body.Email
            };
            dbo.collection("tblcustomers").insertOne(data,(err,result)=>{
                if(!err){
                    console.log(`Record inserted`)
                }
            })
        }
    })
});

app.get('/getproducts',(request,response)=>{
    mongoClient.connect(connectionString,(err,clientObj)=>{
        if(!err){
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tblproducts").find().toArray((err,document)=>{
                if(!err){
                    response.send(document);
                }
            })
        }
    })
})

app.get('/getproducts/:id',(request,response)=>{
    mongoClient.connect(connectionString,(err,clientObj)=>{
        if(!err){
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tblproducts").find({id:parseInt(request.params.id)}).toArray((err,document)=>{
                if(!err){
                    response.send(document);
                }
            })
        }
    })
})

app.get('/categories',(request,response)=>{
    mongoClient.connect(connectionString,(err,clientObj)=>{
        if(!err){
            var dbo = clientObj.db("ishopdb");
            dbo.collection("tblproducts").find().toArray((err,document)=>{
                if(!err){
                    response.send(document);
                }
            })
        }
    })
})

app.get('/categories/:category',(request,responce)=>{
    mongoClient.connect(connectionString,(err,clientObj)=>{
        if(!err){
            var dbo = d=clientObj.db("ishopdb");
            dbo.collection("tblproducts").find({category:request.params.category}).toArray((err,document)=>{
                if(!err){
                    responce.send(document)
                }
            })
        }
    })
})

app.listen(4400);
console.log(`server started:http://127.0.0.1:4400`);