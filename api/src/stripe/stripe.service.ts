import { Injectable } from '@nestjs/common';

import Stripe from 'stripe';

import { Cart } from './Cart.model';

@Injectable()
export class StripeService {
  private stripe;

  constructor() {
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: '2022-08-01',
    });
  }

  checkout(cart: Cart) {
    const totalPrice = cart.reduce(
      (accumulator, item) => accumulator + item.price * item.quantity,
      0,
    );
    return this.stripe.paymentIntents.create({
      amount: +totalPrice.toFixed(2) * 100, //cents
      currency: 'cad', // set currency
      payment_method_types: ['card'],
    });
  }
}
