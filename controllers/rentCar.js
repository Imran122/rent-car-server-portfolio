const RentCarData = require("../models/rentCarUpload");
const ReviewDataToHost = require("../models/reviewDataToHost");
const RentCarPaymentData = require("../models/rentCarPayment");
exports.rentCarListInfo = async (req, res) => {
  try {
    const rentCarListAll = await RentCarData.find({});
    res.json(rentCarListAll);
  } catch (error) {
    res.json({ message: error });
  }
};
//all approved car list to show in frontend
exports.approvedRentCarList = async (req, res) => {
  try {
    const page = parseInt(req.query.page);

    const size = parseInt(req.query.size);

    let skipSize = page * size;
    const count = await RentCarData.count();
    const uniqeTruedata = await RentCarData.collection
      .find({
        $and: [{ requestStatus: true }],
      })
      .sort()
      .skip(skipSize)
      .limit(size)
      .toArray();

    /* let uniqeTruedata = rentCarListAll.filter(
      (obj) => obj.requestStatus === true
    ); */
    let finalResult = [];
    for (let index = 0; index < uniqeTruedata.length; index++) {
      const carId = uniqeTruedata[index]._id;

      const CarReviewListWithId = await ReviewDataToHost.find({
        rentCarId: carId,
      }).exec();

      //console.log(CarReviewListWithId);

      let findReviewsData = CarReviewListWithId.map((product) => {
        return product.reviewStarToCar;
      });

      let averageOfReview =
        findReviewsData.reduce((a, b) => a + b, 0) / findReviewsData.length;

      if (findReviewsData.length === 0) {
        averageOfReview = 0;
      }
      let uniqedata = uniqeTruedata[index];
      let data = {
        uniqedata,
        averageOfReview,
      };
      finalResult.push(data);
      // uniqeTruedata[index]["averageOfReview"] = averageOfReview;

      // console.log("xxx:=", averageOfReview);
    }

    res.json({ count, finalResult });
  } catch (error) {
    res.json({ message: error });
  }
};

//single rent cart details api start
exports.rentCarDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const renCarDetails = await RentCarData.findById(id).exec();
    res.json(renCarDetails);
  } catch (error) {
    res.json({ message: error });
  }
};
//single rent cart details api end

exports.rentCarApprove = async (req, res) => {
  try {
    const { id } = req.body;

    await RentCarData.findByIdAndUpdate(id, { $set: { requestStatus: true } });
    res.json({ message: "successfully updated" });
  } catch (error) {
    res.json({ message: error });
  }
};
exports.rentCarDeny = async (req, res) => {
  try {
    const { id } = req.body;
    console.log(id);
    await RentCarData.deleteOne({ _id: id });
    console.log("hello");
    res.json({ message: "successfully deleted" });
  } catch (error) {
    res.json({ message: error });
  }
};
