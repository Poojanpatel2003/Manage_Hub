// server.js
const express = require('express'); // Import Express
const mongoose = require('mongoose'); // Import Mongoose for MongoDB
const dotenv = require('dotenv'); // Import dotenv for environment variables
const cors = require('cors'); // Import CORS
const path=require('path')
// Load environment variables from .env file
dotenv.config();

const app = express(); // Create an Express application
const PORT = process.env.PORT || 3000; // Set the port

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Import routes (we will create these routes in the next steps)
const authRoutes = require('./routes/auth');
const invoiceRoutes = require('./routes/invoice');
const inventoryRoutes = require('./routes/inventory');
const userInfoRoutes = require('./routes/userInfo');
const transactionRoutes = require('./routes/transaction');

// Use routes

app.use('/api/auth', authRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/userinfo', userInfoRoutes);
app.use('/api/transactions', transactionRoutes);
console.log("\n\n\nThis is outside deployment code >> \n");
// --------------------- deployment ------------------------
const __dirname1= path.resolve();


if(process.env.NODE_ENV=="development"){
  console.log("Reached here");
  app.use(express.static(path.join(__dirname1,"/client/dist")));
  console.log("\n\n\n\n");
  console.log(__dirname1);
  console.log("\n\n\n\n");
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname1,"client","dist","index.html"))
  })
  console.log("Inside deployment code");

}else{
  app.get('/',(req,res)=>{
    res.send("Welcome to managehub !!!");
  })
}
// --------------------- deployment ------------------------
// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
