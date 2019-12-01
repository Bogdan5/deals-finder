const jwt = require('jsonwebtoken');
// import db from '../db';
const { Pool } = require('pg');
require('custom-env').env();

const pool = new Pool({
  connectionString: process.env.connectionString,
});

const Auth = {
  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  async verifyToken(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    console.log('Req.headers ', req.headers.authorization);
    console.log('Token in authenticate is ', token);
    if(!token) {
      console.log('Token not provided');
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      pool.connect((err, client) => {
        if (err) {
          console.log('Error connecting to the database');
        } else {
          console.log('Before decoded ', token);
          const decoded = jwt.verify(token, process.env.secretOrKey);
          console.log('Decoded is ', decoded);
          pool.query('SELECT * FROM users WHERE id = $1', [decoded.userId],
            async (error, result) => {
              if (error) {
                console.error('Error in connection selecting ', error);
                return res.status(400).send(err);
              }
              if(!result.rows[0]) {
                return res.status(400).send({ 'message': 'The token you provided is invalid' });
              }
              req.user = { id: decoded.userId };
              next();
            }
          );
          // const text = 'SELECT * FROM users WHERE id = $1';
          // const { rows } = await db.query(text, [decoded.userId]);
          // if(!rows[0]) {
          //   return res.status(400).send({ 'message': 'The token you provided is invalid' });
          // }
          // req.user = { id: decoded.userId };
          // next();
        }
      })
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

module.exports = Auth;
