const { Router } = require("express");
const { Stock ,Product} = require("../db");

const router = Router();

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const stock = await Stock.findAll({ where: { productId: id } });
    res.send(stock);
  } catch (error) {
    next(error);
  }
});

router.put("/drop", async (req, res, next) => {
  console.log("Entraaa")
  const { stockProducts } = req.body;
  console.log(req.body, "soy stockProducts")
  const productsChanged = []
  try {
    for (let i = 0; i < stockProducts?.length; i++) {
      const productStock = await Stock.findOne({
        where: { productId: stockProducts[i].id, productSize: stockProducts[i].size },
      });
      if (productStock.stock > 0) {
        productStock.stock = await productStock.stock - Number(stockProducts[i].stock);
        console.log(productStock.stock)
      }
      await productStock.save();
      productsChanged.push(productStock)
    }
    // stockProducts.forEach(async (item) => {
    //   const productStock = await Stock.findOne({
    //     where: { productId: item.id, productSize: item.size },
    //   });
    //   productStock.stock = await productStock.stock - Number(item.stock);
    //   await productStock.save();
    //   productsChanged.push(productStock)
    // });
    res.send(productsChanged);
  } catch (err) {
    next(err);
  }
});

router.put('/add', async (req, res, next) => {
  const { stockProducts } = req.body;
  const productsChanged = []
  try {
    for (let i = 0; i < stockProducts.length; i++) {
      const productStock = await Stock.findOne({
        where: { productId: stockProducts[i].id, productSize: stockProducts[i].size },
      });
      productStock.stock = await productStock.stock + Number(stockProducts[i].stock);
      await productStock.save();
      productsChanged.push(productStock)
    }
    // stockProducts.forEach(async (item) => {
    //   const productStock = await Stock.findOne({
    //     where: { productId: item.id, productSize: item.size },
    //   });
    //   productStock.stock = await productStock.stock - Number(item.stock);
    //   await productStock.save();
    //   productsChanged.push(productStock)
    // });
    res.send(productsChanged);
  } catch (err) {
    next(err);
  }
})


/*
router.put("/Add_Stock_Size", async (req, res, next) => {
  const { idProduct, size, stock } = req.body;
  try {
    const product = await Product.findOne({
      where: {
        id: idProduct
      },
      include: {
        model: Stock,
      }
    });

    if (product !== undefined && product.length !== 0) {
      var FraseRespuesta = "No found Stock"
      for (let index = 0; index < product.stocks.length; index++) {
        const stockData = product.stocks[index];
        if (stockData.productSize == size) {
          console.log(Number.parseInt(stockData.stock), "  ", Number.parseInt(stock))
          FraseRespuesta = `Product "${product.name}" (Size ${size}) modified a Stock ${stockData.stock}`
          console.log((Number.isInteger(stockData.stock) + Number.isInteger(stock)))
          product.stocks[index].stock = Number.isInteger(stockData.stock) + Number.isInteger(stock)
          await product.save()
          break;
        }
      }
      if (FraseRespuesta == "No found Stock") {
        Stock.create({
          productSize: size,
          stock: stock,
          productId: idProduct,
        });
        FraseRespuesta = `Product "${product.name}" (Size ${size}) created with Stock ${stockData.stock}`
      }
    }

    res.status(202).send(FraseRespuesta);
  } catch (err) {
    next(err);
  }
});*/


router.put("/AddStocks", async (req, res, next) => {
  const { idProduct, Sizes } = req.body;
  console.log("ACAAAAAAA ",idProduct,"  ",Sizes)
  try {
    const stock = await Stock.findAll({ where: { productId: idProduct } });

    var FraseRespuesta = "No found Product"
      
    console.log(stock)

    if (stock !== undefined && stock.length !== 0) {
      for (const property in Sizes) {
        let size = property;
        let amount = Sizes[property];
        
        FraseRespuesta = "No found Stock"

       for (let index = 0; index < stock.length; index++) {
          const stockData = stock[index];
          if (stockData.productSize == size) {
            FraseRespuesta = `Product "${stockData.name}" (Size ${size}) modified a Stock ${amount}`
            stock[index].stock = parseInt(amount)
            await stock[index].save()
            break;
          }
        }
        if (FraseRespuesta == "No found Stock") {
          Stock.create({
            productSize: size,
            stock: amount,
            productId: idProduct,
          });
          FraseRespuesta = `Product "${product.name}" (Size ${size}) created with Stock ${stockData.stock}`
        }
      }
    }
    console.log("ACA  ",FraseRespuesta);
    res.status(202).send(FraseRespuesta);
  } catch (err) {
    next(err);
  }
});


module.exports = router;
