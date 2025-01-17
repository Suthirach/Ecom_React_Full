const prisma = require("../config/prisma");
const stripe = require("stripe")(
    "sk_test_51QiC8W08rthDKIgwMQO0ueToKAZBp4s1FCjv0PUvBXUvGb98ZemKCEQ3JIG87kmJytxXjGE5SVL6YewOfj01NugG00qFiO7fxX"
);

exports.payment = async (req, res) => {
    try {
        //code
        const cart = await prisma.cart.findFirst({
            where:{
                orderedById : req.user.id

            }
        })
        // console.log(cart)
        const amountTHB = cart.cartTotal * 100 


        // Create a PaymentIntent with the order amount and currency
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amountTHB,
            currency: "thb",
            // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
            automatic_payment_methods: {
                enabled: true,
            },
        });

        res.send({
            clientSecret: paymentIntent.client_secret,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server error" });
    }
};
