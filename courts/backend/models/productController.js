const Products = require("./Products");

var createProducts = async (req, res) => {
    try{
        const body = req.body
        const productModelData = new Products()
        productModelData.name = body.name
        productModelData.imageUrl = body.imageUrl
        productModelData.description = body.description
        productModelData.price = body.price
        await productModelData.save()

        res.status(200).send({
            "status":true, "message": "product created successfully"
        });
    }
    catch(error){
        res.status(400).send(error);
    }
}

module.exports = { createProducts };