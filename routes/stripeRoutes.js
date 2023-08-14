import express from 'express';
import Stripe from 'stripe';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import Order from '../models/OrderModel.js';

import dotenv from 'dotenv';
const router = express();

dotenv.config();

router.post('/create-checkout-session', authMiddleware, async (req, res) => {

  const stripe = Stripe('sk_test_51LMHmvAw2oupCOB0zk8Vvq55pNjq7zCcLni6sE61D2Q1G6AETsyBUJ1WcKWl8dsBwH4Qv2dcGyWxu8CKd9ljUZzn00dfBc0csB');
  const {_id} = req.user;

    try {
      const {cartItems, orderData, userId} = req.body;
      console.log(cartItems);
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
          line_items: 
            cartItems.map((cart) => {
              console.log(cart, 'yyyyyy')
              return (
                {
                  price_data: {
                      currency: 'usd',
                      product_data: {
                          name: cart?.productId?.title,
                          // images: cart?.productId?.images[0]['url'] ? [cart?.productId?.images[0]['url']] : ['https://www.mountaingoatsoftware.com/uploads/blog/2016-09-06-what-is-a-product.png'],
                      },
                      unit_amount: 2000,
                  },
                  quantity: cart?.quantity,
    
                }
              )
            }
              
            )
            
          ,
          mode: 'payment',
          success_url: `https://ecommerce-as-amazon-nodejs-frontend-with-react-js.vercel.app/checkout-success`,
          cancel_url: `https://ecommerce-as-amazon-nodejs-frontend-with-react-js.vercel.app/checkout-failed`,
        });

        res.send({url: session.url});
      }
      
      catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }

});

export default router;


