const RentCarPaymentData = require("../models/rentCarPayment");
const RentCarData = require("../models/rentCarUpload");
const User = require("../models/user");
const SellCarData = require("../models/sellCarUpload");
const ReviewDataToHost = require("../models/reviewDataToHost");

exports.superAdminUserListHost = async (req, res) => {
  try {
    let hostUserList = await User.find({
      role: "host",
    }).exec();
    const reviewDetails = await ReviewDataToHost.find({});

    let FinalResult = [];
    for (let index1 = 0; index1 < hostUserList.length; index1++) {
      let sum = 0;
      let count = 0;
      const id = hostUserList[index1]._id;
      console.log(id);
      for (let index = 0; index < reviewDetails.length; index++) {
        if (id.toString() === reviewDetails[index].carUploadPersonHostId) {
          sum = sum + reviewDetails[index].reviewStartToHost;
          count++;
        }
      }

      const {
        address,
        bankaccountnumber,
        bankname,
        contact_number,
        createdAt,
        email,
        firstname,
        lastname,
        profileImage,
        role,
        routingnumber,
        salt,
        hashed_password,
        _id,
      } = hostUserList[index1];
      FinalResult.push({
        address,
        bankaccountnumber,
        bankname,
        contact_number,
        createdAt,
        email,
        firstname,
        lastname,
        profileImage,
        role,
        routingnumber,
        salt,
        hashed_password,
        _id,
      });

      FinalResult[index1]["averageRating"] = sum / count;
      if (sum === 0 || count === 0) {
        FinalResult[index1]["averageRating"] = 0;
      }
    }
    /*  const reviewDetails = await ReviewDataToHost.findById(
      carUploadPersonHostId
    ).exec(); */
    res.json(FinalResult);
  } catch (error) {
    res.json({ message: error });
  }
};
exports.superAdminUserListRenter = async (req, res) => {
  try {
    const renterUserList = await User.find({
      role: "renter",
    }).exec();

    res.json(renterUserList);
  } catch (error) {
    res.json({ message: error });
  }
};

//delete renter user
exports.renterUserDelete = async (req, res) => {
  try {
    const { id } = req.body;

    await User.deleteOne({ _id: id });

    res.json({ message: "successfully deleted" });
  } catch (error) {
    res.json({ message: error });
  }
};

//suspend id by update the role
exports.suspendUser = async (req, res) => {
  try {
    const { id } = req.body;

    await User.findByIdAndUpdate(id, { $set: { accountType: "suspended" } });
    res.json({ message: "successfully updated" });
  } catch (error) {
    res.json({ message: error });
  }
};

//get all booking car info list
exports.allBookingCarList = async (req, res) => {
  const CarListAll = await RentCarPaymentData.find({}).exec();

  try {
    let listOfAllBookingCarData = [];
    for (let index = 0; index < CarListAll.length; index++) {
      let BookingList = CarListAll[index];
      let renterUserId = CarListAll[index].renterUserId;
      //find renter data
      if (renterUserId === null) {
        continue;
      }
      let dataForRenterUserId = await User.findById(renterUserId);
      let renterName = dataForRenterUserId.firstname;
      let renterProfileImage = dataForRenterUserId.profileImage;
      //find host data

      let carUploadPersonHostId = CarListAll[index].carUploadPersonHostId;
      let dataForHostUserId = await User.findById(carUploadPersonHostId);
      if (dataForHostUserId === null) {
        continue;
      }

      let hostName = dataForHostUserId.firstname;

      let hostProfileImage = dataForHostUserId.profileImage;

      /*   

      listOfAllBookingCarData.push({
        BookingList,
        renterName,
        hostName,
        renterProfileImage,
        hostProfileImage,
      });
       */
      let data = {
        BookingList,
        renterName,
        renterProfileImage,
        hostName,
        hostProfileImage,
      };

      listOfAllBookingCarData.push(data);
    }
    res.json(listOfAllBookingCarData);
  } catch (error) {
    res.json({ message: error });
  }
};

//find all review data for admin
exports.allReviewData = async (req, res) => {
  try {
    const CarDocumentListAll = await ReviewDataToHost.find({});
    let listOfAllReviewData = [];
    for (let index = 0; index < CarDocumentListAll.length; index++) {
      let reviewList = CarDocumentListAll[index];
      const _id = CarDocumentListAll[index]._id;
      const renterUserId = CarDocumentListAll[index].renterUserId;

      //find renter data
      const dataForRenterUserId = await User.findById(renterUserId);
      let renterFirstName = dataForRenterUserId.firstname;
      let renterLastName = dataForRenterUserId.lastname;
      let renterProfileImage = dataForRenterUserId.profileImage;

      let data = {
        _id,
        reviewList,
        renterFirstName,
        renterLastName,
        renterProfileImage,
      };
      listOfAllReviewData.push(data);
    }
    res.json(listOfAllReviewData);
  } catch (error) {
    res.json({ message: error });
  }
};

//get single data for edit by id
exports.getReviewForEdit = async (req, res) => {
  try {
    const id = req.params.id;

    const reviewDetails = await ReviewDataToHost.findById(id).exec();
    const dataForRenterUserId = await User.findById(reviewDetails.renterUserId);
    let renterFirstName = dataForRenterUserId.firstname;
    let renterLastName = dataForRenterUserId.lastname;
    let renterProfileImage = dataForRenterUserId.profileImage;
    res.json({
      reviewDetails: reviewDetails,
      renterFirstName: renterFirstName,
      renterLastName: renterLastName,
      renterProfileImage: renterProfileImage,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

//update  review data by admin
exports.updateReviewByAdmin = async (req, res) => {
  try {
    const { id, reviewTextToCar, reviewStarToCar } = req.body;
    console.log(id);
    console.log(req.body);
    await ReviewDataToHost.findByIdAndUpdate(id, {
      $set: {
        reviewTextToCar: reviewTextToCar,
        reviewStarToCar: reviewStarToCar,
      },
    });

    return res.json({
      reviewTextToCar: reviewTextToCar,
      reviewStarToCar: reviewStarToCar,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

//list of documents
exports.carDocumentListDataAdmin = async (req, res) => {
  const CarDocumentListAll = await RentCarData.find({});

  let list = [];
  try {
    for (let index = 0; index < CarDocumentListAll.length; index++) {
      let _id = CarDocumentListAll[index]._id;
      let firstname = CarDocumentListAll[index].firstname;
      let carMake = CarDocumentListAll[index].carMake;
      let carModel = CarDocumentListAll[index].carModel;
      let carDocumentPdf = CarDocumentListAll[index].carDocumentPdf;
      let carImage = CarDocumentListAll[index].carImage[0];
      let carLicenseNumber = CarDocumentListAll[index].carLicenseNumber;

      let data = {
        _id,
        firstname,
        carMake,
        carModel,
        carDocumentPdf,
        carImage,
        carLicenseNumber,
      };
      list.push(data);
    }

    res.json(list);
  } catch (error) {
    res.json({ message: error });
  }
};

//average values for host review start
