const Stripe = require("stripe");

const stripe = Stripe("sk_test_51RH5rARqSY6nzkPT37IpR0JtujMvQBtDbcuWYrkzuJvIUqNJLiAxcfVofVtN1JRA5ScbtU5Nv27yMuiI3MKazSWs00rZ54Y4Xp"); // Replace with your actual secret key

const getPayment = async (req, res, next) => {
 const amount = (req.body.amount);
console.log(req.body.amount)
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "usd", // or "usd", depending on your business
            product_data: {
              name: "Medical Report Payment", // change as needed
            },
            unit_amount: amount * 100, // amount in paisa (Stripe expects in smallest currency unit)
          },
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/",
      cancel_url: "http://localhost:5173",
    });

    console.log(session.url, "Stripe session URL");

    res.send({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: err.message });
  }
};

module.exports = getPayment;
