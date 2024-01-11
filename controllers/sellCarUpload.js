const SellCarData = require("../models/sellCarUpload");
const User = require("../models/user");
const { Storage } = require("@google-cloud/storage");
const cors = require("cors")({ origin: true });
const stripe = require("stripe")(process.env.STRIPE_SECRET);
let projectId = "sacred-garden-349304"; // Get this from Google Cloud
let keyFilename = "cloud-image-storage.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("car-rental");
exports.create = async (req, res) => {
  //console.log("UPDATE USER - req.user", req.user, "UPDATE DATA", req.body);
  const { id } = req.body;

  const {
    carMake,
    contactNumber,
    socialeMediaLink,
    carModel,
    carMakeYear,
    carRegistrationState,
    userPickupAddress,
    carLicenseNumber,
    carVinNumber,
    seatNumber,
    doorNumber,
    milesPerGallon,
    fuelType,
    bodyType,
    transmissionType,
    milageOnTheCar,

    carCondition,
    sellPrice,
  } = req.body;
  let carImage = [];
  let carDocumentPdf = "";
  try {
    for (let index = 0; index < req.files.length; index++) {
      const element = req.files[index];

      let elementData = element.originalname;
      elementData = elementData.split(".");

      if (elementData[1] === "pdf") {
        carDocumentPdf =
          "https://storage.googleapis.com/car-rental/" + element.originalname;
      } else {
        carImage.push(
          "https://storage.googleapis.com/car-rental/" + element.originalname
        );
      }
      const blob = bucket.file(element.originalname);

      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        console.log("Success");
      });
      blobStream.end(element.buffer);
    }
  } catch (error) {
    res.status(500).send(error);
  }

  let pickupAddress = JSON.parse(userPickupAddress);

  //saving user info into db
  const userId = req.user._id;

  const result = await User.findById(userId).exec();

  var sellCarData = new SellCarData({
    userId: req.user._id,
    firstname: result.firstname,
    profileImage: result.profileImage,
    carMake,
    contactNumber,
    socialeMediaLink,
    carModel,
    carMakeYear,
    carRegistrationState,
    pickupAddress,
    carLicenseNumber,
    carVinNumber,
    seatNumber,
    doorNumber,
    milesPerGallon,
    fuelType,
    bodyType,
    transmissionType,
    milageOnTheCar,

    carCondition,
    sellPrice,
    carDocumentPdf,
    carImage,
  });

  // save model to database

  sellCarData.save(function (err, data) {
    if (err) return console.error(err);
    else {
      return cors(req, res, async () => {
        const { id } = req.body;

        const amount = parseFloat(25) * 100;

        const paymentIntent = await stripe.paymentIntents.create({
          currency: "USD",
          amount: amount,
          payment_method: id,
          confirm: true,
        });

        res.json({
          clientSecret: paymentIntent.client_secret,
          data: data._id,
        });

        // response.status(200).json({subscriptionId: 'subscription.id'})
      });
    }
  });
};
