const mongoose = require("mongoose");
const uniqid = require("uniqid");

const UrlSchema = new mongoose.Schema({
  original_url: {
    type: String,
    required: true,
  },
  short_url: {
    type: String,
  },
});
UrlSchema.index({ short_url: 1 });

/*
UrlSchema.pre("save", (req, res, next) => {
  const uniqueId = uniqueId();
  console.log(uniqueId);
  //this.short_url = uniqid();
  next();
});*/

module.exports = mongoose.model("Url", UrlSchema);

/*const mongoose = require("mongoose");
const uniqid = require("uniqid");

// review / rating / createdAt / ref to tour / ref user
//const Tour = require('./tourModel');
const urlSchema = new mongoose.Schema({
  longUrl: {
    type: String,
    require: [true, "Please provide a valid url"],
  },
  shortUrl: {
    type: String,
  },
});

urlSchema.pre("save", (req, res, next) => {
  this.shortUrl = uniqid();
  next();
});

const Url = mongoose.model("Url", urlSchema);

module.exports = Url;
*/
