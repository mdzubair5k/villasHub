if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
};

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const mongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");
const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");
//const { isLoggedIn } = require("./middleware.js");


//const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
 const dbUrl = process.env.ATLASDB_URL;


// Connect to MongoDB
async function main() {
  await mongoose.connect(dbUrl);
}

main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.error(err); // Log the actual error
  });

// Set up view engine and static files
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "public")));


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));


const store = mongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
    secret: process.env.SECRET,
  },
  touchAfter: 24*3600,
});

store.on("error", () => {
  console.log("ERROR IN MONGO SESSION STORE", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};



app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

// Routes
// app.get("/", (req, res) => {
//   res.send("Hi, I'm root");
// });

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

// Handle 404 errors
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "page not found!"));
});

// General error handling middleware
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "something went wrong" } = err;
  console.error(err);
  res.status(statusCode).render("error.ejs", { message });
  // res.status(statusCode).send(message); // Optional: Use this if you prefer sending plain text
});

// Start server
//const PORT = process.env.PORT || 1222;

app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
