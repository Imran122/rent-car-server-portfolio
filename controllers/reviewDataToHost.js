const ReviewDataToHost = require("../models/reviewDataToHost");
const User = require("../models/user");
const RentCarPaymentData = require("../models/rentCarPayment");

//get data in form by this api
exports.getDataForPostReview = async (req, res) => {
  try {
    let id = req.params.id;

    //finding data who has same user id
    const result = await RentCarPaymentData.findById(id);
    const hostInfo = await User.findById(result.carUploadPersonHostId);
    res.json({
      rentCarId: result.rentCarId,
      carUploadPersonHostId: result.carUploadPersonHostId,
      renterUserId: result.renterUserId,
      carMake: result.carMake,
      carModel: result.carModel,
      rentCarImage: result.carImage,
      booktStatus: result.booktStatus,
      hostFirstName: hostInfo.firstname,
      hostLastName: hostInfo.lastname,
      hostProfileImage: hostInfo.profileImage,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

exports.postReviewDataToHost = async (req, res) => {
  const {
    rentCarId,
    carUploadPersonHostId,
    renterUserId,
    hostFirstName,
    hostLastName,
    reviewStarToCar,
    reviewStartToHost,
    reviewTextToCar,
    reviewTextToHost,
    carMake,
    carModel,
    hostProfileImage,
    rentCarImage,
  } = req.body;

  var reviewDataToHost = new ReviewDataToHost({
    rentCarId,
    carUploadPersonHostId,
    renterUserId,
    hostFirstName,
    hostLastName,
    reviewStarToCar,
    reviewStartToHost,
    reviewTextToCar,
    reviewTextToHost,
    carMake,
    carModel,
    hostProfileImage,
    rentCarImage,
  });

  reviewDataToHost.save(function (err, data) {
    if (err) return console.error(err);
    else {
      return res.json({
        data: data._id,
      });
    }
  });

  console.log("renterTodaysBookCar: ");
};

//get all review for renter dashboard
exports.renterReviewList = async (req, res) => {
  try {
    const userId = req.user._id;

    //finding data who has same user id
    const result = await ReviewDataToHost.find({
      renterUserId: userId,
    }).exec();

    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};
