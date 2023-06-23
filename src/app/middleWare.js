const { redisClient } = require('../redis');
const jwt = require('jsonwebtoken');


const authenticateUser = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ error: 'Authorization header missing' });
    }
    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    if(!decoded) return res.status(401).send({ error: "Error verifying token"});
    req.user = decoded;
    req.token = token;

    let refresh_token = await redisClient.get('BL_' + decoded.email);
    if(refresh_token && refresh_token === token ) return res.status(401).send({ error: "Invalid token"}); 
    next();
  } catch (error) {
    return res.status(401).send({ message: "Unable To Authenticate User.", data: error});
  }
};

const authorizeUser = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ error: 'Access denied' });
    }
    next();
  };
};

async function verifyRefreshToken(req, res, next) {
  const token = req.body.token;
  if(!token) return res.status(401).send({ error: "Token cannot be empty."});
  try {
      const decoded = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
      if(!decoded) return res.status(401).send({ error: "Error verifying token"}); 
      req.user = decoded;

      // verify if refresh token is in store or not
      let refresh_token = await redisClient.get(decoded.email);
      if(!refresh_token) return res.status(401).send({ error: "Error validating token"});      
      next();
  } catch (error) {
      return res.status(401).send({ message: "Session expired.", data: error});
  }
}

module.exports = {
    authenticateUser,
    authorizeUser,
    verifyRefreshToken
}