const mongoose = require('mongoose')

const url =
'mongodb+srv://sathviksai:sathviksai@cluster0.fnj1c.mongodb.net/KLH?retryWrites=true&w=majority'


mongoose.connect(url)

const Customer = new mongoose.Schema({
  customerid: String,
  customername: String,
  customeremailid:String,
});

const Customers = mongoose.model("CustomerData", Customerdata);

const Customers1 = new Customers({
  customerid:'1111',
  customername:'ABC',
  customeremailid:'ABC@gmail.com',
});
const Customers2 = new Customers({
  customerid:'2222',
  customername:'XYZ',
  customeremailid:'XYZ@gmail.com',
});


Customers1.save().then((result)=>{
  console.log("Customer1 saved!")
  mongoose.connection.close();
});

Customers2.save().then((result)=>{
  console.log("Customer2 saved!")
  mongoose.connection.close();
});


