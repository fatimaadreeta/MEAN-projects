//the backend for crud for product
const express = require("express");
const router = express.Router();
const Products = require("../backend/models/Products");
const Admin = require('../backend/models/admin');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//create admin
router.post('/sign-up', (req,res) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const admin = new Admin({
                username: req.body.username,
                password: hash
            })

            admin.save()
            .then(result => {
                res.status(201).json({
                    message: 'Admin created',
                    result: result
                })
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            })
        })
})

router.post('/login', (req,res) => {

    let userFound;

    Admin.findOne({username: req.body.username})
        .then(user => {
            if(!user){
                return res.status(401).json({
                    message: 'Admin not found'
                })
            }
            userFound = user
            return bcrypt.compare(req.body.password, user.password)
        })
    .then(result => {
        if(!result){
            return res.status(401).json({
                message: 'Password is incorrect'
            })
        }

        const token = jwt.sign({username: userFound.username, userId: userFound._id}, "secret_string", {expiresIn:"1h"})
        return res.status(200).json({
            token: token
        })
    })
    .catch(err => {
        return res.status(401).json({
            message: 'Error with authentication'
        })
    })
})


//add new product
router.post("/product", (req, res, next) =>{
    try{
        const token = req.headers.authorization;
        jwt.verify(token, "secret_string")
        next();
    }catch(err){
        res.status(401).json({message: "Token issue"})
    }

}  ,async (req, res) => {
    try{
        const newProduct = new Products(req.body);
        await newProduct.save()
        .then((savedProduct) => {
            console.log(savedProduct);
            res.status(201).json({message: "Product successfully saved"});
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({message: "Unable to create new product"})
        })
    } catch(error){
        console.log(error);
        res.status(500).json({message: "Unable to save product"});
    }
})

//read all products
router.route('/product').get((req, res, next) => {
    Products.find()
        .then(data => {
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
});

//read one single product
router.route('/product/:id').get((req, res, next) => {
    const id = req.params.id;
    Products.findById(id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.json(data);
        })
        .catch(error => {
            return next(error);
        });
});

//searching product
router.get('/search', async (req, res) => {
    try{
        const searchTerm = req.query.searchTerm;
        console.log(searchTerm);
        const searchRegEx = new RegExp(searchTerm, "i");
        await Products.find({
            $or: [
                {name: searchRegEx},
                {imageUrl: searchRegEx},
                {description: searchRegEx}
            ]
        })
        .then((products) => {
            if(products.length){
                console.log(products);
                res.status(200).json({products: products});
            } else{
                res.status(200).json({message: "unable to find product"});
            }
           
        })
        .catch((error) => {
            console.log(error);
            res.status(500).json({message: "unable to find product"});
        })
    } catch(error){
        console.log(error);
        res.status(500).json({message: "no matching records found"}); 
    }
})

//update product
router.route('/product/:id').put((req, res) => {
    const id = req.params.id;
    const updatedProduct = {
        name: req.body.name,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
        price: req.body.price
    };

    // Use the Mongoose findByIdAndUpdate method
    Products.findByIdAndUpdate(id, updatedProduct, { new: true })
        .then(updatedData => {
            if (updatedData) {
                res.send(updatedData);
            } else {
                // If no product found with the given id, send a 404 response
                raiseRecord404Error(req, res);
            }
        })
        .catch(err => {
            console.error(err);
            res.status(500).send('Internal Server Error');
        });
});


//delete product
router.route('/product/:id').delete((req, res, next) => {
    const id = req.params.id;
    Products.findByIdAndDelete(id)
        .then(data => {
            if (!data) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully', deletedProduct: data });
        })
        .catch(error => {
            return next(error);
        });
});

module.exports = router;