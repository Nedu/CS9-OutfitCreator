const router = require("express")();
const stripe = require("stripe")("sk_test_xj8MsjaHp54vM8zhfcWAZtDH");

router.use(require("body-parser").text());

router.post("/", async (requestAnimationFrame, res) => {
    try {
        let {status} = await stripe.charges.create({
            amount: 1000,
            currency: "usd",
            description: "monthly subscription fee",
            source: req.body
        });

        res.json({status});
    } catch (err) {
        res.status(500).end();
    }
})

module.exports = router;