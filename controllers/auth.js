const User = require("../models/user");
const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const sgMail = require("@sendgrid/mail");
const nodemailer = require("nodemailer");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
// exports.signup = (req, res) => {

//     const { name, email, password } = req.body;

//     User.findOne({ email }).exec((err, user) => {
//         if (user) {
//             return res.status(400).json({
//                 error: 'Email is taken'
//             });
//         }
//     });

//     let newUser = new User({ name, email, password });

//     newUser.save((err, success) => {
//         if (err) {
//             console.log('SIGNUP ERROR', err);
//             return res.status(400).json({
//                 error: err
//             });
//         }
//         res.json({
//             message: 'Signup success! Please signin'
//         });
//     });
// };
exports.signup = async (req, res) => {
  const { firstname, lastname, role, email, password } = req.body;

  User.findOne({ email }).exec(async (err, user) => {
    if (user) {
      return res.status(400).json({
        error: "Email is taken",
      });
    }

    const token = jwt.sign(
      { firstname, lastname, role, email, password },
      process.env.JWT_ACCOUNT_ACTIVATION,
      { expiresIn: "10m" }
    );
    let transporter = nodemailer.createTransport({
      service: "gmail",
      //host: "https://mail.google.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "itechverser22@gmail.com", // generated ethereal user
        pass: "aewy jnpz stlw zpgl", // generated ethereal password
      },
    });
    const emailData = await transporter.sendMail({
      from: "itechverser22@gmail.com", // sender address
      to: email, // list of receivers
      subject: `Account activation link`,
      html: `
        <h1>Please use the following link to activate your account</h1>
        <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
        <hr />
        <p>This email may contain sensitive information</p>
        <p>${process.env.CLIENT_URL}</p>
      `,
    });

    console.log("emailData ", emailData);
    return res.status(200).json({
      message: `Email has been sent to ${email}. Follow the instruction to activate your account`,
    });
  });
};
exports.accountActivation = (req, res) => {
  const { token } = req.body;

  if (token) {
    jwt.verify(
      token,
      process.env.JWT_ACCOUNT_ACTIVATION,
      function (err, decoded) {
        if (err) {
          console.log("JWT VERIFY IN ACCOUNT ACTIVATION ERROR", err);
          return res.status(401).json({
            error: "Expired link. Signup again",
          });
        }

        const { firstname, lastname, role, email, password } =
          jwt.decode(token);

        const user = new User({ firstname, lastname, role, email, password });

        user.save((err, user) => {
          if (err) {
            console.log("SAVE USER IN ACCOUNT ACTIVATION ERROR", err);
            return res.status(401).json({
              error: "Error saving user in database. Try signup again",
            });
          }
          return res.json({
            message: "Signup success. Please signin.",
          });
        });
      }
    );
  } else {
    return res.json({
      message: "Something went wrong. Try again.",
    });
  }
};
/* exports.signin = (req, res) => {
  const { email, password } = req.body;
  // check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
    // generate a token and send to client
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    const { _id, firstname, email, role } = user;

    return res.json({
      token,
      user: { _id, firstname, email, role },
    });
  });
};
 */

exports.signin = (req, res) => {
  const { email, password } = req.body;

  // check if user exist
  User.findOne({ email }).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "User with that email does not exist. Please signup",
      });
    }
    const roles = user.role;

    // authenticate
    if (!user.authenticate(password)) {
      return res.status(400).json({
        error: "Email and password do not match",
      });
    }
    if (user.accountType !== "suspended") {
      if (
        roles === "host" ||
        roles === "seller" ||
        roles === "super-admin" ||
        roles === "renter"
      ) {
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
          expiresIn: "7d",
        });
        const { _id, firstname, email, role } = user;

        return res.json({
          token,
          user: { _id, firstname, email, role },
        });
      } else {
        return res.status(400).json({
          error: "role do not match",
        });
      }
    } else {
      return res.status(400).json({
        error: "suspended account",
      });
    }

    // generate a token and send to client
  });
};

exports.requireSignin = expressJwt({
  secret: process.env.JWT_SECRET, // req.user._id
  algorithms: ["sha1", "RS256", "HS256"],
});
