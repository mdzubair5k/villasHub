// const Listing = require("../models/listing");
// const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// const mapToken = process.env.MAP_TOKEN;
// const geocodingClient = mbxGeocoding({ accessToken : mapToken });

// module.exports.index = async (req, res) => {
//   const allListings = await Listing.find({});
//   res.render("listings/index.ejs", { allListings });
// };

// module.exports.renderNewForm = (req, res) => {
//   res.render("listings/new.ejs");
// };

// module.exports.showListing = async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id)
//     .populate({
//       path: "reviews", // Corrected the path from 'Review' to 'reviews'
//       populate: { path: "author" }, // Populate the author field within reviews
//     })
//     .populate("owner"); // Populate owner as well
//   if (!listing) {
//     req.flash("error", "Listing you requested for does not exist!");
//     return res.redirect("/listings");
//   }
//   console.log(listing);
//   res.render("listings/show.ejs", { listing });
// };

// // module.exports.createListing = async (req, res, next) => {
// //   let url = req.file.path;
// //   let filename = req.file.filename;
// //   newListing.owner = req.user._id;
// //   newListing.image = { url, filename };
// //   await newListing.save();
// //   req.flash("success", "New Listing Created!");
// //   res.redirect("/listings");
// // };


// module.exports.createListing = async (req, res, next) => {
// let response = await geocodingClient.forwardGeocode({
//   query:'New Delhi, India',
//   limit:req.body.listing.location,
// }).send();
// const { listing } = req.body; // Body se listing data extract karein
//   const newListing = new Listing(listing); // Listing model ka instance create karein
//   if (req.file) {
//     let url = req.file.path;
//     let filename = req.file.filename;
//     newListing.image = { url, filename }; // Image data ko assign karein
//   }
//   newListing.geometry = response.body.features[0].geometry;
//   newListing.owner = req.user._id; // Owner ID assign karein
//   let savedListing = await newListing.save(); // Listing ko database me save karein
//   console.log(savedListing);
//   req.flash("success", "New Listing Created!");
//   res.redirect("/listings");
// };


// module.exports.renderEditForm = async (req, res) => {
//   let { id } = req.params;
//   const listing = await Listing.findById(id);
//   if (!listing) {
//     req.flash("error", "Listing you requested for does not exist!");
//     return res.redirect("/listings");
//   }
//   let originalImageUrl = listing.image.url
//   originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250")
//   res.render("listings/edit.ejs", { listing,  originalImageUrl });
// };

// // module.exports.updateListing = async (req, res) => {
// //   let { id } = req.params;
// //   let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
// //   if (typeof req.file !=="undefined") {
// //   let url = req.file.path;
// //   let filename = req.file.filename;
// //   listing.image  = { url, filename};
// //   await listing.save();
// //   }
// //   req.flash("success", "Listing Updated!");
// //   res.redirect(`/listings/${id}`);
// // };

// module.exports.updateListing = async (req, res, next) => {
//   const { id } = req.params;
//   const { listing } = req.body;
//   const updatedListing = await Listing.findByIdAndUpdate(id, { ...listing }, { new: true });

//   if (req.file) {
//     const url = req.file.path;
//     const filename = req.file.filename;
//     updatedListing.image = { url, filename }; // Image ko update karein
//   }
  
//   await updatedListing.save();
//   req.flash("success", "Listing Updated!");
//   res.redirect(`/listings/${id}`);
// };


// module.exports.destroyListing = async (req, res) => {
//   let { id } = req.params;
//   let deletedListing = await Listing.findByIdAndDelete(id);
//   console.log(deletedListing);
//   req.flash("success", "Listing Deleted !");
//   res.redirect("/listings");
// };



//copy code

const Listing = require("../models/listing"); 


module.exports.index = async (req, res) => { 
    const allListings = await Listing.find({})
    res.render ("listings/index.ejs", {allListings});
};


module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};


module.exports.showListing = async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById(id)
        .populate({ 
            path: "reviews", 
            populate: { path: "author"}})
        .populate("owner");
    if(!listing) {
        req.flash("error", "listing you requested for does not exist")
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};


module.exports.createListing = async (req, res, next) => {
    let url = req.file.path;
    let filename = req.file.filename;

    const newListing = new Listing( req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = { url, filename };
    await newListing.save();
    res.redirect("/listings");
};


module.exports.renderEditForm = async (req, res ) => {
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing) {
        req.flash("error", "listing you requested for does not exist")
        res.redirect("/listings");
    }
 
    let originalImageUrl = listing.image.url; 
        originalImageUrl= originalImageUrl.replace("upload", "/upload/w_250")
        res.render("listings/edit.ejs", { listing, originalImageUrl });
};


module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id, {...req.body.listing});

    if(typeof req.file !== "undefined") {
        let url = req.file.path; 
        let filename = req.file.filename;  
        listing.image = { url, filename }; 
        await listing.save();    
    }
    req.flash("success","Listing Updated!!");
    res.redirect(`/listings/${id}`);
};


module.exports.destroyListing = async (req, res) => {
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id);
    console.log(deletedListing);
    req.flash("success", "listing deleted");
    res.redirect("/listings");
};