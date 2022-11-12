const e = require("express");
const { Router } = require("express");
const { DataTypes, where } = require("sequelize");
const { Order } = require("../db");
const { User } = require("../db");
const orderRouter = Router();
//email
// const transporter = require("../../config/mailer");
const { changeStateOrder, createOrder, changeStateOrderDispatched } = require("../Email/mail.config");

require("dotenv").config();

orderRouter.get("/", async (req, res, next) => {
   const { type, parameter } = req.query;
   try {
      var allOrders = [];

      if (type !== "UserID" && type !== "OrderID")
         allOrders = await Order.findAll();
      else if (type === "UserID") {
         allOrders = await Order.findAll({
            where: {
               userId: parameter,
            },
         });
      } else {
         allOrders = await Order.findAll({
            where: {
               id: parameter,
            },
         });
      } 
      res.status(200).json(allOrders)
   } catch (error) {
      next(error);
   }
});

orderRouter.post("/", async (req, res) => {
   // email para orden creada osea se compro
   const { userId, stocks, estado ,contactAdress} = req.body;
   try {  
      var priceTotal = 0;
      for (let index = 0; index < stocks.length; index++) {
         const element = stocks[index];
         priceTotal += element.amount * element.value;
         stocks[index] = { ...stocks[index], comment: false };
      }
      priceTotal = priceTotal.toFixed(2);

      let stocksJSON = JSON.stringify(stocks);
      let contactAdressJSON=JSON.stringify(contactAdress)

      const user = await User.findOne({
         where: { id: userId }
      })
      let newOrder = await Order.create({
         price: priceTotal,
         userId,
         stocks: stocksJSON,
         stateOrder: estado,
         contactAdress:contactAdressJSON,
      });
      createOrder(user.email, newOrder)
      res.send(newOrder);
   } catch (error) {
      console.log(error)
      res.status(400).send(error);
   }
});

orderRouter.put("/:id", async (req, res, next) => {
   // buscar por findAll por id la compra para mandar email la compra de manera especifica
   const { type } = req.query;
   const { id } = req.params;
   const { data } = req.body;

   try {
      const order = await Order.findOne({ where: { id: id } });

      const user = await User.findOne({
         where: { id: order.userId }
      })

      switch (type) {
         case "idpurchase":
            order.idpurchase = data;
            await order.save();
            res.send(`The purchased id has been changed`);
            break;
         case "stateOrder":
            order.stateOrder = data;
            await order.save();
            if(data === "Dispatched"){
               changeStateOrderDispatched(user.email, data, id)
            }else{
               changeStateOrder(user.email, data, id)
            }
            res.send(`The state has been changed`);
            break;
         case "stocks":
            order.stocks = JSON.stringify(data);
            await order.save();
            res.send(`The state has been changed`);
            break;
         default:
            break;
      }
   } catch (err) {
      console.log(err)
      next(err);
   }
});

module.exports = orderRouter;