import mongoose from 'mongoose';
import Transaction from '../models/transactionModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const processTransaction = async (req, res) => {
  const { sender_id, receiver_id, amount } = req.body;

  if (!sender_id || !receiver_id || !amount) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    
    const transaction = new Transaction({
      senderId: sender_id,
      receiverId: receiver_id,
      amount,
      status: 'pending',
    });

    await transaction.save({ session });

    
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      payment_method_types: ['card'],
    });

    
    transaction.status = 'completed';
    await transaction.save({ session });

    
    await session.commitTransaction();
    session.endSession();

    res.status(200).json({ message: 'Transaction successful', transaction, paymentIntent });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();

    
    await Transaction.findOneAndUpdate(
      { senderId: sender_id, receiverId: receiver_id, amount },
      { status: 'failed' }
    );

    res.status(500).json({ message: error.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
