const jwt = require('jsonwebtoken')

module.exports = async (req, res , next)=>{
 try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({
        message: "Authorization token missing",
        success: false,
      });
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.userId = decoded.id;

    next();

  } catch (error) {
    res.status(401).send({
      message: "Invalid or expired token",
      success: false,
      error
    });
  }
}