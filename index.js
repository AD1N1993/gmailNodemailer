const express = require('express');
const nodemailer = require("nodemailer");
const port =process.env.PORT || 3010;
const smtp_login =process.env.SMTP_LOGIN || "___";
const smtp_password =process.env.SMTP_PASSWORD || "___";
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  service: "gmail",
  tls:{
	rejectUnauthorized:false
  },
  auth: {
	user: smtp_login, // generated ethereal user
	pass: smtp_password, // generated ethereal password
  },
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/sendMessage', async (req, res) => {
let {mail, message,name} = req.body
  // send mail with defined transport object
  let info = await transporter.sendMail({
	from: "yourdeveloperone@gmail.com", // sender address
	to: "griv1993@gmail.com", // list of receivers
	subject: "Important", // Subject line
	text: "Hello Yura send mails", // plain text body
	html: `<div>
<h2>From HR</h2>
<p>name:${name}</p> 
<p>mail:${mail}</p> 
<p>message:${message}</p> 
</div>`, // html body
  });
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})