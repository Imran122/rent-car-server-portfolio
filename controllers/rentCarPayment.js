const RentCarPaymentData = require("../models/rentCarPayment");
const User = require("../models/user");
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(process.env.STRIPE_SECRET);
exports.create = async (req, res) => {
  //console.log("UPDATE USER - req.user", req.user, "UPDATE DATA", req.body);
  const { totalCostAll, id } = req.body;
  const {
    rentCarId,
    carUploadPersonHostId,
    booktStatus,
    firstname,
    carMake,
    carModel,
    carRegistrationState,
    chargePlanName,
    deliveryCharges,
    insuranceName,
    driverLicenseExpireDate,
    driverLicenseIssueDate,
    insuranceExpDate,
    tripStartDateTime,
    tripEndDateTime,
    driverLicenseNumber,
    insurancePolicyNumber,
    nameOnDriverLicense,
    pickupAddress,
    dropupAddress,
    hoursTotal,
    rentCharges,
    totalAmountCost,

    carImage,
    profileImage,
  } = req.body.rentCarData;
  //let pickupAddress = JSON.parse(pickupAddress);
  const userId = req.user._id;

  //saving user info into db
  const result = await User.findById(userId).exec();
  //find host id who uploaded the car
  //console.log("result", result);
  var rentCarPaymentData = new RentCarPaymentData({
    rentCarId,
    carUploadPersonHostId,
    renterUserId: result._id,
    rentTransactionId: id,
    booktStatus,
    firstname,
    carMake,
    carModel,
    carRegistrationState,
    chargePlanName,
    deliveryCharges,
    insuranceName,
    driverLicenseExpireDate,
    driverLicenseIssueDate,
    insuranceExpDate,
    tripStartDateTime,
    tripEndDateTime,
    driverLicenseNumber,
    insurancePolicyNumber,
    nameOnDriverLicense,
    pickupAddress,
    dropupAddress,
    hoursTotal,
    rentCharges,
    totalAmountCost,
    totalCostAll,
    profileImage,
    pickupAddress,
    carImage,
  });

  // save model to database
  rentCarPaymentData.save(function (err, data) {
    if (err) return console.error(err);
    else {
      return cors(req, res, async () => {
        const { id, totalCostAll, rentCarData } = req.body;

        const amount = parseFloat(totalCostAll) * 100;

        const paymentIntent = await stripe.paymentIntents.create({
          currency: "USD",
          amount: amount,
          payment_method: id,
          confirm: true,
        });
        res.json({ clientSecret: paymentIntent.client_secret, data: data._id });

        // response.status(200).json({subscriptionId: 'subscription.id'})
      });
    }
  });
};
