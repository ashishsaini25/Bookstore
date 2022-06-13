import express from 'express';
const router = express.Router();

import userRoute from './user.route';
import bookRoute from'./Books.route';
import cartRoute from './cart.route';
import wishlistRoute from './wishlist.route';
import orderRoute from './order.route';
import userinfoRoute from './userinfo.route';

/**
 * Function contains Application routes
 *
 * @returns router
 */
const routes = () => {
  router.get('/', (req, res) => {
    res.json('Welcome');
  });
  router.use('/users', userRoute);
  router.use('/Books', bookRoute);
  router.use('/Cart', cartRoute);
  router.use('/wishlist', wishlistRoute);
  router.use('/order', orderRoute);
  router.use('/order', userinfoRoute);

  return router;
};

export default routes;
