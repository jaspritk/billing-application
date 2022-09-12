const express = require('express');
const app = express();
const mongoose = require('./configs/database');
const cors = require('cors');
const nodemailer = require('nodemailer');
const routes = require("./routes/routes");
var bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use("/", routes);
app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
})
)
let data = '';

app.get("/data", (req, res) => {
    res.render("data", {
        data: data
    })
});

app.post('/data', (req, res) => {
    data = req.body;
    console.log("🚀 ~ file: app.js ~ line 28 ~ app.post ~ data", data)

    var from = "'Jasprit Kaur'<test.jaspritk@gmail.com>"
    var to = req.body.customer.customerEmail
    var subject = "Invoice"
    var message = `Invoice`

    var transporter = nodemailer.createTransport({
        host: "mail.google.com",
        port: 587,
        secure: false,
        service: 'gmail',
        auth: {
            user: "test.jaspritk@gmail.com",
            pass: "ihstrqochozuxnpb"
        }
    });

    const ejs = require("ejs");

    ejs.renderFile(__dirname + "/views/data.ejs", { data: data }, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            var mailOptions = {
                from: from,
                to: to,
                subject: subject,
                text: message,
                html: data
            }
            transporter.sendMail(mailOptions, function (err, info) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('Message sent: ' + info.response);
                }
            });
        }

    });
});

app.listen(3000, () => {
    console.log("Server connected");
})