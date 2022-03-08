const uniqid = require('uniqid');
const URL = require('url').URL;
const dns = require('dns');

const catchAsync = require('./../utils/catchAsync');
const appError = require('./../utils/appError');
const urlModel = require('./../models/urlModel');

exports.createShortUrl = catchAsync(async (req, res, next) => {
  //const urlLong = req.body.urlLong;

  const { original_url } = req.body;
  const short_url = uniqid();

  const urlObject = new URL(original_url);
  dns.lookup(urlObject.hostname, (err, address, family) => {
    if (err) {
      return res.json({
        originalURL: originalURL,
        shortenedURL: 'Invalid URL'
      });
    }
  });
  const doc = await urlModel.create({ original_url, short_url });

  res.status(200).json({
    original_url,
    short_url
  });
});

exports.getRedirect = catchAsync(async (req, res, next) => {
  const urlShort = req.params.short_url;
  const doc = await urlModel.findOne({ short_url: urlShort });

  if (doc) {
    return res.redirect(doc.original_url);
  } else
    res.status(404).json({
      status: 'No url found with this id'
    });
});
