const express = require("express");
const mailer = require("express-mailer");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
mailer.extend(app, {
  from: "no-reply@example.com",
  host: "smtp.gmail.com",
  secureConnection: true,
  port: 465,
  transportMethod: "SMTP",
  auth: {
    user: process.env.MAIL,
    pass: process.env.MAILPASS,
  },
});
app.use(cors());
app.use(express.json());
app.set("views", __dirname + "/views");
app.set("view engine", "jade");
app.post("/send-message", (req, res) => {
  app.mailer.send(
    "email",
    {
      to: "nunetarun2001@gmail.com",
      subject: "From Portfolio",
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    },
    (err) => {
      if (err) res.send({ success: false, err });
      else res.send({ success: true });
    }
  );
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server is listening at http://localhost:${PORT}`)
);
