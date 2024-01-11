const Favourite = require("../models/favourite");
const mongoose = require('mongoose');

exports.favouriteUpdate = async (req, res) => {

    try {
        const { userId, rentCarDataId } = req.body;
        const doc = await Favourite.findOneAndUpdate(
            { userId, rentCarDataId },
            { $set: { rentCarDataId } },
            { upsert: true, new: true }
        );
        res.json({
            message: "Successfully updated"
        });
    } catch (error) {
        res.json({ message: error });
    }
};
exports.favouriteDelete = async (req, res) => {

    try {
        const { userId, rentCarDataId } = req.body;
        const doc = await Favourite.findOneAndDelete({ userId, rentCarDataId });
        res.json({
            message: "Successfully deleted"
        });
    } catch (error) {
        res.json({ message: error });
    }
};
exports.favouriteAllInformation= async (req, res) => {

    try {
        const userId = new mongoose.Types.ObjectId(req.params.id);
        const invoiceAllInfoDetails = await Favourite.aggregate([
            { $match: { userId } },
            {$lookup:
                {
                   from: "rentcardatas",   // collection to join
                   localField: "rentCarDataId",  //this field as refereence
                   foreignField: "_id",
                   as: "rentCarData"    // output array field
                }
            }

         ]
        ).exec();

        const favcarlist = invoiceAllInfoDetails.map(item => {
            return item.rentCarData[0];
        })
        res.json({
            favcarlist
        });
    } catch (error) {
        console.log(error);
        res.json({ error });
    }
};