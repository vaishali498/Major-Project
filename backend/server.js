


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');

const multer = require('multer');
require('dotenv').config();
const farmerRoutes = require('./routes/farmerRoutes');
// const Farmer = require('./models/Farmer');  // Make sure you import the model!
const authRoutes = require('./routes/authRoutes');

// const express = require('express');
// const session = require('express-session');


const app = express();

// Middleware
// app.use(cors());

// app.use(cors({
//   // origin: 'http://127.0.0.1:5500',  // ✅ Use your exact frontend URL
//   // origin: 'http://localhost:5500',
//   credentials: true                // ✅ Allow cookies
// }));
app.use(cors({
  // origin: ['http://127.0.0.1:5500', 'http://localhost:5500'],
  //  origin: 'http://127.0.0.1:5500',  // ✅ Use your exact frontend URL
   origin: 'http://localhost:5500',
  credentials: true
}));


app.use(express.json());

// app.use('/uploads', express.static('uploads'));
// app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Session middleware setup
app.use(
  session({
    secret: 'ecf14527c621ebfe9a030b4300993d067654b992e64b70d3a667da43f713c64220ab01e6193e7886c4b8337e1c2e35c6fc97d4908c6cc8e54ff7dc6894e9d1c4', // 🔒 change this to a strong secret
    resave: false,
    saveUninitialized: false,
     store: MongoStore.create({ mongoUrl: 'mongodb://127.0.0.1:27017/farmersMarketplace',
      ttl: 14 * 24 * 60 * 60 // optional: 14 days expiration
      }),
    // cookie: { secure: false } // Set true only if using HTTPS
    cookie: {
    secure: false,                 // true if using HTTPS
    httpOnly: true,
     sameSite: 'lax',
     maxAge: 1000 * 60 * 60 * 24,  // 1 day
  }
  })
);
// app.use((req, res, next) => {
//   console.log('🌐 Origin:', req.headers.origin);
//   console.log('🍪 Cookies:', req.headers.cookie);
//   console.log('📦 Session:', req.session);
//   next();
// });
// app.get('/api/check-session', (req, res) => {
//   console.log("Session in /api/check-session:", req.session);
//   res.json(req.session);
// });

// Serve static files (HTML, CSS, JS, images)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/farmer', farmerRoutes);
app.use('/api/auth', authRoutes);


// app.get('/api/check-session', (req, res) => {
//   console.log('👀 Session:', req.session);
//   res.json(req.session);
// });


// // Add this test route to verify session is working
// app.get('/api/set-session', (req, res) => {
//   req.session.user = { name: 'Test User', role: 'farmer' };
//   res.send('✅ Session data set successfully');
// });
app.get('/api/check-session', (req, res) => {
  console.log('🔍 Session check:', req.session);
  res.json(req.session);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'Home.html'));
});


// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/farmersMarketplace')
.then(async () => {
  console.log('MongoDB Connected');

  // Create a test farmer
//   const testFarmer = new Farmer({
//     name: 'Test Farmer',
//     location: 'Test Village',
//     products: ['Wheat', 'Rice'],
//     phone: '1234567890'
//   });

//   await testFarmer.save();
//   console.log('Test farmer saved successfully!');

})
.catch(err => console.error('MongoDB connection error:', err));


// Routes
// app.get('/', (req, res) => {
//   res.send('Welcome to Farmers Marketplace Backend!');
// });

// Start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
