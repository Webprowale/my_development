const express = require('express');
const mongoose = require('mongoose');
const Product = require("./models/product.model.js")

const app = express();


app.use(express.json());


app.get('/', (req, res)=>{
    res.send("hello from nodejs api"); 
});

app.post('/api/products', async(req, res)=>{
    try{
      const produ = await Product.create(req.body);
      res.status(200).json(produ);
    }
    catch(error){
        res.status(500).json({
            message:error.meesage
        });
    }
});
app.get("/api/products", async(req, res)=>{
    try{
       const produu = await Product.find({})
       res.status(200).json(produu)
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
});

app.get("/api/product/:id", async(req, res)=>{
    try{
       const { id } = req.params;
       const productId = await Product.findById(id);
       res.status(200).json(productId);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
});

// update product 
app.put("/api/product/:id",async (req, res)=>{
    try{
        const { id } = req.params;
       const productUpdate = await Product.findByIdAndUpdate(id, req.body);
       if(!productUpdate){
        return res.status(404).json({
            message:"Product not found"
        });
       }
       const updateProduct = await Product.findById(id);
          res.status(200).json(updateProduct);
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
});

// Delete

app.delete("/api/product/:id", async(req, res)=>{
    try{
     const { id } = req.params;
     const productDel = await Product.findByIdAndDelete(id);
     if(!productDel){
        res.status(404).json({
            message: "Product not found"
        })
        res.status(200).json({
            message: "Product delete successfully"
        })
     }
    }
    catch(error){
        res.status(500).json({
            message: error.message
        })
    }
})

mongoose.connect("mongodb+srv://webprowale:wale1106@cluster0.zeon4vm.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connect to database");
    app.listen(3000, ()=>{
        console.log('server is runnubng on port 3000');
    });
})
.catch(()=>{
    console.log("connection failed!");
})