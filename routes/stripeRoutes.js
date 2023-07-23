import express from 'express';
import Stripe from 'stripe';
import { authMiddleware, isAdmin } from '../middlewares/authMiddleware.js';
import Order from '../models/OrderModel.js';

import dotenv from 'dotenv';
const router = express();

dotenv.config();

router.post('/create-checkout-session', authMiddleware, async (req, res) => {

  const stripe = Stripe(process.env.STRIPE_URL);
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
          success_url: `${process.env.CLIENT_URL}/checkout-success`,
          cancel_url: `${process.env.CLIENT_URL}/checkout-failed`,
        });

        res.send({url: session.url});
      }
      
      catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }

});

export default router;


