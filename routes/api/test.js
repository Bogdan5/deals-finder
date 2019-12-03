const express = require('express');
const { Pool } = require('pg');
const jwt = require('jsonwebtoken');
const Auth = require('../../authentication/authenticate');

const router = express.Router();


require('custom-env').env();

const pool = new Pool({
  connectionString: process.env.connectionString,
});

router.get('/', Auth.verifyToken, (req, res, next) => {
    // const token = req.headers.authorization.split(' ')[1];
    // const tokenPayload =  jwt.verify(token, process.env.secretOrKey);
    // pool.connect((err, client, done) => {
    //   if (err) {
    //     console.error('Database connection failed', err);
    //   } else {
    //     client.query('SELECT * FROM users WHERE user_id=$1', [tokenPayload._id],
    //     (error, result) => {
    //       console.log('result is ', result)
    //       // if (error) {
    //       //   console.error('Error in connection selecting ', error);
    //       //   return res.status(400).send(err);
    //       // }
    //       // if (!result.rows.length) {
    //       //   console.log('User not found');
    //       //   return res.status(404).json({ usernotfound: 'User not found' });
    //       // }
    //       // return res.status(200).json({ username: response});
    //     })
      // }
    // });
    console.log('User ', req.user);
    res.status(200).json({});
  });

  module.exports = router;