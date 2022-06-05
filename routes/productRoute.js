const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
// User model
const User = require('../models/user');
const Product = require('../models/products');

// fetch all products
router.get('/', (req, res, next) => {
    Product.find(function(err, products) {
    console.log('products :', products);
        if(err) {
            res.json({success: false, msg:'Failed to fetch products'});
        } else {
            res.json({success: true, msg:'Products fetched', data: products});
        }
    });
});

// get products by aggregation
router.post('/filter', (req, res, next) => {
console.log('req :', req.body);
    let body = req.body;
    // const page = parseInt(body.page)
    // const limit = 5;
    // const skipIndex = (page - 1) * limit;
    let query = {};
        if (typeof body != undefined && body != null && body != "") {
            if (body.act_date) {
                query['$or'] = [{ "act_date": { $eq: body.act_date ? new Date(body.act_date) : 0 } }]
            }
            if (body.action) {
                query['$or'] = [{ "act_date": { $eq: body.act_date ? new Date(body.act_date) : 0 } }, { "action": { $eq: body.action ? body.action : 0 } }]
            }
            if (body.territory_name) {
                query['$or'] = [{ "act_date": { $eq: body.act_date ? new Date(body.act_date) : 0 } }, { "action": { $eq: body.action ? body.action : 0 } }, { "territory_name": { $eq: body.territory_name ? body.territory_name : "" } }]
            }
            if (body.pack_type) {
                query['$or'] = [{ "act_date": { $eq: body.act_date ? new Date(body.act_date) : 0 } }, { "action": { $eq: body.action ? body.action : 0 } }, { "territory_name": { $eq: body.territory_name ? body.territory_name : "" } }, { "pack_type": { $eq: body.pack_type ? body.pack_type : 0 } }]
            }
            if (body.current_status) {
                query['$or'] = [{ "act_date": { $eq: body.act_date ? new Date(body.act_date) : 0 } }, { "action": { $eq: body.action ? body.action : 0 } }, { "territory_name": { $eq: body.territory_name ? body.territory_name : "" } }, { "pack_type": { $eq: body.pack_type ? body.pack_type : 0 } }, { "current_status": { $eq: body.current_status ? body.current_status : 0 } }]
            }
            if (body.operator_name) {
                query['$or'] = [{ "act_date": { $eq: body.act_date ? new Date(body.act_date) : 0 } }, { "action": { $eq: body.action ? body.action : 0 } }, { "territory_name": { $eq: body.territory_name ? body.territory_name : "" } }, { "pack_type": { $eq: body.pack_type ? body.pack_type : 0 } }, { "operator_name": { $eq: body.operator_name ? body.operator_name : 0 } }]
            }
            console.log('query :', query);
        }
    Product.aggregate([
        {
            $match: query
        },
        // {
        //     $sort: {
        //         "total_revenue_dollar": -1
        //     }
        // }
    ], function(err, products) {
        if(err) {
            res.json({success: false, msg:'Failed to fetch products'});
        } else {
            res.json({success: true, msg:'Products fetched', data: products});
        }
    })
    // .limit(limit)
    // .skip(skipIndex);
});


module.exports = router;