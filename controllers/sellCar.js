const SellCarData = require("../models/sellCarUpload");

exports.sellCarListInfo = async (req, res) => {
  try {
    const page = parseInt(req.query.page);

    const size = parseInt(req.query.size);

    let skipSize = page * size;
    const count = await SellCarData.count();
    const finalResult = await SellCarData.collection
      .find({})
      .sort()
      .skip(skipSize)
      .limit(size)
      .toArray();

    res.json({ count, finalResult });
  } catch (error) {
    res.json({ message: error });
  }
};

//single sell cart details api start
exports.sellCarDetails = async (req, res) => {
  try {
    const id = req.headers.id;
    const sellCarDetails = await SellCarData.findById(id).exec();
    res.json(sellCarDetails);
  } catch (error) {
    res.json({ message: error });
  }
};
