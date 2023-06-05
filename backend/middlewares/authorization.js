const jwt = require('jsonwebtoken');

module.exports = function checkToken(req, res, next) {
  try {
    let token = req.header('auth');
    return !token
      ? res.status(401).send({ message: 'Access denied' })
      : jwt.verify(token, process.env.SECRET_TOKEN, (err, decoded) => {
          return (err && err.name === 'TokenExpiredError')
            ? res.status(401).send('Unauthorized User')
            : (req.user = decoded, next());
        });
  } catch (err) {
    return res.status(400).send(err);
  }
}
