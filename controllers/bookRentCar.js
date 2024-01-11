const RentCarPaymentData = require("../models/rentCarPayment");
const User = require("../models/user");
const RentCarData = require("../models/rentCarUpload");
exports.myBookingrentCarList = async (req, res) => {
  try {
    const renterUserId = req.user._id;

    //finding data who has same user id
    const result = await RentCarPaymentData.find({
      renterUserId: { $in: [renterUserId] },
    });
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};

//host booking car info
exports.hostBookingRentCarList = async (req, res) => {
  try {
    const carUploadPersonHostId = req.user._id;

    //finding data who has same user id
    const result = await RentCarPaymentData.find({
      carUploadPersonHostId: { $in: [carUploadPersonHostId] },
    });

    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};

//accept booking from host dashboard
exports.acceptBookedCarForRent = async (req, res) => {
  try {
    const id = req.params.id;

    await RentCarPaymentData.findByIdAndUpdate(id, {
      $set: { booktStatus: "accept" },
    });
    res.json({ message: "successfully updated" });
  } catch (error) {
    res.json({ message: error });
  }
};
//accept booking from host dashboard
exports.markCompleteBookedCarForRent = async (req, res) => {
  try {
    const id = req.params.id;

    await RentCarPaymentData.findByIdAndUpdate(id, {
      $set: { booktStatus: "complete" },
    });
    res.json({ message: "successfully updated" });
  } catch (error) {
    res.json({ message: error });
  }
};

//reject book car from host
exports.bookCarReject = async (req, res) => {
  try {
    const id = req.params.id;

    await RentCarPaymentData.deleteOne({ _id: id });

    res.json({ message: "successfully deleted" });
  } catch (error) {
    res.json({ message: error });
  }
};

//make bookForRentStatus true or flase based on mark complete or accept from host dashboard
exports.changeBookForRentStatus = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await RentCarPaymentData.findById(id);
    const _id = result.rentCarId;

    await RentCarData.findByIdAndUpdate(_id, {
      $set: { bookForRentStatus: true },
    });
  } catch (error) {
    res.json({ message: error });
  }
};
exports.changeBookForRentStatusFlase = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await RentCarPaymentData.findById(id);
    const _id = result.rentCarId;

    await RentCarData.findByIdAndUpdate(_id, {
      $set: { bookForRentStatus: false },
    });
  } catch (error) {
    res.json({ message: error });
  }
};
