const router = require("express")();
const keys = require("../config/keys.js");
const cors = require('cors');
const stripe = require("stripe")(keys.stripe.secretkey);

router.use(require("body-parser").text());

// set up cors options
const corsOptions = {
    origin: '*'
  };

router.post("/charge", cors(corsOptions), async (req, res) => {
    stripe.customers.create({
        //this will return a new Customer object.
        //Store customer.id in database with user profile info
        email: 'test@example.com', //TODO: how to extract this data from the request?
        source: req.body
    })
    .then(customer => {
        stripe.plans.create({
            product: {
                name: 'Outfit Creator',
                type: 'service',
            },
            nickname: 'outfit creator',
            currency: 'usd',
            interval: 'month',
            amount: 1000,
        })
        .then(plan => {
            stripe.subscriptions.create({
                customer: customer.id,
                items: [{plan: plan.id}]
            })
            .then(subscription => {
                res.status(200).send({customer, subscription})
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
})

router.post("/cancel", cors(corsOptions), async (req, res) => {
    //TODOL update this to use a value passed through in request
    stripe.subscriptions.del('sub_DSDzTOUVFD0gsk'), {at_period_end: true});
})

module.exports = router;