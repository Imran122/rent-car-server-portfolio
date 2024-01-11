const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { Storage } = require("@google-cloud/storage");

let projectId = "sacred-garden-349304"; // Get this from Google Cloud
let keyFilename = "cloud-image-storage.json"; // Get this from Google Cloud -> Credentials -> Service Accounts
const storage = new Storage({
  projectId,
  keyFilename,
});
const bucket = storage.bucket("car-rental");
exports.read = (req, res) => {
  const userId = req.params.id;
  User.findById(userId).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User not found",
      });
    }
    user.hashed_password = undefined;
    user.salt = undefined;
    res.json(user);
  });
};

exports.update = async (req, res) => {
  try {
    console.log('asdfasdf');
    let profileImage = "";
    const user = await User.findById({ _id: req.user._id });

    let bodyresult = req.body;

    Object.assign(user, bodyresult);

    if (req.file) {
      const element = req.file;

      let elementData = element.originalname;
      elementData = elementData.split(".");
      console.log(elementData[1]);

      profileImage =
        "https://storage.googleapis.com/car-rental/" + element.originalname;

      const blob = bucket.file(element.originalname);

      const blobStream = blob.createWriteStream();

      blobStream.on("finish", () => {
        console.log("Success");
      });
      blobStream.end(element.buffer);
      bodyresult["profileImage"] = profileImage;
    }
    

    Object.assign(user, bodyresult);
    user.save();
    res.send({ data: user });
  } catch {
    res.status(404).send({ error: "Book is not found!" });
  }
};

//change password
exports.changePassword = async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user._id });
    console.log(user);
    let { currentpassword, password } = req.body;

    if (!user.authenticate(currentpassword)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }

    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { _id, firstname, email, role } = user;

    /*  res.send({ _id, firstname, email, role, token });
    Object.assign(_id, firstname, email, role, { password }); */
    Object.assign(user, { password });
    user.save();
    //res.send({ data: user });
    res.status(200).send({ success: "updated successfully" });
  } catch {
    res.status(404).send({ error: "Book is not found!" });
  }
};
