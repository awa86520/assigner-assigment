const Product = require('../models/productModel');
const redisClient = require('../config/redis');

exports.getProducts = async (req, res) => {
  try {

   // const cachedData = await redisClient.get('products');
   const cachedProducts = await redisClient.get("products");
    if (cachedData) {
      return res.status(200).json({ source: 'cache', data: JSON.parse(cachedData) });
    }

    // Fetch from database if not in cache
    const products = await products.find();

    //  here i am storing the result for 5 minutes 
    await redisClient.setEx('products', 300, JSON.stringify(products));

    res.status(200).json({ source: 'database', data: products });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
