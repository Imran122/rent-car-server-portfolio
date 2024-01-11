const RentCarPaymentData = require("../models/rentCarPayment");
const ReviewDataToHost = require("../models/reviewDataToHost");
const User = require("../models/user");

exports.renterTodaysBookCar = async (req, res) => {
  try {
    const userId = req.user._id;

    const dataForHost = await RentCarPaymentData.find({
      renterUserId: userId,
    }).exec();
    //running today data calculate

    const timeTodayDate = Date.now();
    const today = new Date(timeTodayDate);
    let todaysAllData = [];
    for (let index = 0; index < dataForHost.length; index++) {
      var mydate = dataForHost[index].createdAt;

      if (today.getDate() === mydate.getDate()) {
        todaysAllData.push(dataForHost[index]);
      }
    }

    res.json(todaysAllData);
  } catch (error) {
    res.json({ message: error });
  }
};

//dashboard todays,month,year count of booking

exports.renterBookDataInfo = async (req, res) => {
  try {
    const userId = req.user._id;

    const dataForHost = await RentCarPaymentData.find({
      renterUserId: userId,
    }).exec();
    //running today data calculate
    //current month date
    let dateNow = new Date();
    const monthfirstDay = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth(),
      2
    );

    const monthlastDay = new Date(
      dateNow.getFullYear(),
      dateNow.getMonth() + 1,
      1
    );
    //end current month date
    const timeTodayDate = Date.now();
    const today = new Date(timeTodayDate);
    let todaysDataCount = 0;
    let currentMonthBookCount = 0;
    totalBookCount = 0;
    for (let index = 0; index < dataForHost.length; index++) {
      var mydate = dataForHost[index].createdAt;
      totalBookCount = totalBookCount + 1;
      if (today.getDate() === mydate.getDate()) {
        todaysDataCount = todaysDataCount + 1;
      }
      if (monthfirstDay < mydate && monthlastDay > mydate) {
        currentMonthBookCount = currentMonthBookCount + 1;
      }
    }

    res.json({
      todaysDataCount: todaysDataCount,
      currentMonthBookCount: currentMonthBookCount,
      totalBookCount: totalBookCount,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

//public car details page review work
exports.carDetailsPageReview = async (req, res) => {
  try {
    const id = req.params.id;

    const CarReviewListAll = await ReviewDataToHost.find({
      rentCarId: id,
    }).exec();
    let result = [];
    //cacluation part for start
    //const totalAmountReview = CarReviewListAll.length;

    //cacluation part for end

    for (let index = 0; index < CarReviewListAll.length; index++) {
      let reviewList = CarReviewListAll[index];
      let renterUserId = CarReviewListAll[index].renterUserId;
      //find renter data
      if (renterUserId === null) {
        continue;
      }
      let dataForRenterUserId = await User.findById(renterUserId);
      let renterFirstName = dataForRenterUserId.firstname;
      let renterLastName = dataForRenterUserId.lastname;
      let renterProfileImage = dataForRenterUserId.profileImage;

      let data = {
        reviewList,
        renterFirstName,
        renterLastName,
        renterProfileImage,
      };
      result.push(data);
    }
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};
