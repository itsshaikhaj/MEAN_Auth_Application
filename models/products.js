const express = require('express');
const config = require('../config/database');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// User Schema
const ProductSchema = new Schema({
        "act_date":Date,
        "action": String,
        "msisdn": String,
        "media_source": String,
        "bid": Number,
        "optimization": Number,
        "ebid": Number,
        "biller_name": String,
        "territory_name": String,
        "operator_name": String,
        "pack_type": String,
        "service_id": String,
        "act_rev": String,
        "renewal_count": String,
        "total_renew_revenue": String,
        "total_revenue": String,
        "currency": String,
        "conversion_rate":String,
        "total_revenue_dollar": Number,
        "revenue_share": String,
        "bad_debt":String,
        "topline": Number,
        "net_revenue": Number,
        "act_roi": String,
        "renew_revenue_roi": Number,
        "total_roi": String,
        "current_status": String,
        "mod_of_dct": String,
        "dct_date": String,
        "mode": String,
        "days_in_system": {
            "$numberLong": String
        },
        "total_retries": String,
        "total_retries_per_day":String,
        "last_updated_date": Date,
        "last_transaction_mode": String,
        "offerid": String
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

// fetch all products
module.exports.getAllProducts = function(callback) {
    Product.find(callback);
}

// get products by aggregation
module.exports.getProductsByAggregation = function(aggregation, callback) {
    Product.aggregate(aggregation, callback);
}