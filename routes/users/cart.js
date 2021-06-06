const express = require("express");
const router = express.Router();
const cart = require("../../models/cart");
const mongoose = require("mongoose");

router.post("/cart/:id", async (req, res) => {
  try {
    const user_id = req.user.id;
    const _id = req.params.id;
    console.log("CART BODY", req.body);
    const { category, price, productName, image } = req.body;
    const get_usercart = await cart.find({ user_id });
    console.log(get_usercart, "usercart");
    if (get_usercart.length == 0) {
      const new_Cart = new cart({
        user_id: user_id,
        products: [
          {
            product_id: _id,
            quantity: 1,
            price: parseInt(price),
            Name: productName,
            image: image,
          },
        ],
      });
      const saveCart = await new_Cart.save();
      console.log("save cart=", saveCart);
    } else {

      console.log(get_usercart[0].products.length - 1);
      for (x in get_usercart[0].products) {
        if (
          get_usercart[0].products[x].product_id != _id &&
          x == get_usercart[0].products.length - 1
        ) {
          get_usercart[0].products.push({
            product_id: _id,
            quantity: 1,
            price: parseInt(price),
            Name: productName,
            image: image,
          });
        }

        else if (get_usercart[0].products[x].product_id == _id) {
          get_usercart[0].products[x].quantity += 1;
          break;
        }
      }

      console.log(get_usercart);
      console.log(get_usercart[0].products);
      const usercart = await cart.findOneAndUpdate({ user_id }, get_usercart[0]);
      const save = await usercart.save();
    }
    console.log("category=", category);
    res.redirect(`/user/${category}`);
  } catch (error) {
      res.status(500).send(`Internal Error Occurred: ${error._message}`);
  }
});

router.get("/cart", async (req, res) => {
 try {
    const user_id = req.user.id;
    let Total = 0 ;
    const all_items = await cart.findOne({ user_id }).lean();

    if(all_items != null){
      for (x in all_items.products){
        Total +=all_items.products[x].price * all_items.products[x].quantity
      }
      console.log('Total =',Total)
      all_items.Total = Total;
      all_items.grand = Total + 40;
    }
    console.log(all_items)
    res.render("cart", { layout: "cart", all_items });
 } catch (error) {
    res.status(500).send(`Internal Error Occurred: ${error._message}`);
 }
});

router.post('/cart/remove/:id',async(req,res)=>{
  try {
    const user_id = req.user.id;
    const _id = req.params.id;
    const all_items = await cart.find({ user_id });
    console.log(all_items[0].products.length - 1);
    if(all_items[0].products.length == 1 && all_items[0].products[0].quantity == 1){
      const delete_cart = await cart.deleteOne({user_id});
      res.redirect('/user/cart')
    }
    else{
      for (x in all_items[0].products) {
        if (all_items[0].products[x].product_id == _id && all_items[0].products[x].quantity > 1) {
          all_items[0].products[x].quantity -= 1;
          break;
        }else if(all_items[0].products[x].product_id == _id && all_items[0].products[x].quantity == 1){
          all_items[0].products.splice(x,1)
        }
      }
    
      console.log(all_items);
      console.log(all_items[0].products);
      const delete_item = await cart.findOneAndUpdate({ user_id }, all_items[0]);
      const save = await delete_item.save();
      res.redirect('/user/cart')
    }
  } catch (error) {
      res.status(500).send(`Internal Error Occurred: ${error._message}`);
  }
})

module.exports = router;