const RentCarData = require("../models/rentCarUpload");

const User = require("../models/user");
const FormData = require("form-data");
var stream = require("stream");
const axios = require("axios");
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const Axios = require("axios");
let projectId = "sacred-garden-349304"; // Get this from Google Cloud
let keyFilename = "cloud-image-storage.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("car-rental");
const imageHostKey = "9ae21678c9799e8a03fa9dacf7303f84";
exports.create = async (req, res) => {
  //console.log("UPDATE USER - req.user", req.user, "UPDATE DATA", req.body);
  const {
    requestStatus,
    carMake,
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
    authorizedMilage,
    carInsuranceName,
    policyNumber,
    insuranceIssueDate,
    insuranceExpireDate,
    carAvailability,
    carAvailabeDateStart,
    carAvailabeDateEnd,
    carAvailabeTimeStart,
    carAvailabeTimeEnd,
    chargePlanName,
    rentCharges,
    milageAllowence,
    deliveryCharges,
  } = req.body;
  let carImage = [];
  let carDocumentPdf = "";

  try {
    for (let index = 0; index < req.files.length; index++) {
      const element = req.files[index];
      const bodyData = new FormData();
      let elementData = element.originalname;
      elementData = elementData.split(".");
      console.log("element.::--", element);
      bodyData.append("image", element.buffer, {
        filename: element.originalname,
        contentType: element.mimetype,
      });

      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imageHostKey}`,
        bodyData
      );
      console.log("response", response);
      carImage.push(response.data.data.url);
    }

    let pickupAddress = JSON.parse(userPickupAddress);

    //saving user info into db
    const userId = req.user._id;

    const result = await User.findById(userId).exec();

    var rentCarData = new RentCarData({
      hostUserId: result._id,
      firstname: result.firstname,
      profileImage: result.profileImage,
      requestStatus,
      carMake,
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
      authorizedMilage,
      carInsuranceName,
      policyNumber,
      insuranceIssueDate,
      insuranceExpireDate,
      carAvailability,
      carAvailabeDateStart,
      carAvailabeDateEnd,
      carAvailabeTimeStart,
      carAvailabeTimeEnd,
      chargePlanName,
      rentCharges,
      milageAllowence,
      deliveryCharges,
      carDocumentPdf,
      carImage,
    });

    // save model to database
    const savedData = await rentCarData.save();
    return res.json({ data: savedData._id });
  } catch (error) {
    console.error(error);
    return res.status(500).send(error);
  }
};
