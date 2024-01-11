const CarData = require("../models/carListData");
const SellerCarList = require("../models/sellCarUpload");

exports.carListData = async (req, res) => {
  try {
    const CarListAll = await CarData.find({});
    res.json(CarListAll);
  } catch (error) {
    res.json({ message: error });
  }
};

//showing seller er all uploaded car list
exports.myCarListSeller = async (req, res) => {
  try {
    const userId = req.user._id;

    //finding data who has same user id
    const result = await SellerCarList.find({
      userId: { $in: [userId] },
    });
    res.json(result);
  } catch (error) {
    res.json({ message: error });
  }
};
