const jwt = require("jsonwebtoken")

const middleware = async (req, res, next) => {
  try {
    const authToken = req.header("Authorization")
    if (!authToken) {
      return res.status(401).json({ err: "Access denied: No token provided" })
    }

    const parts = authToken.split(" ")
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res
        .status(401)
        .json({ err: "Access denied: Invalid token format" })
    }

    const verifiedToken = jwt.verify(parts[1], "123456")
    req.userId = verifiedToken.userId
    next()
  } catch (error) {
    return res
      .status(401)
      .json({ err: "Access denied: Token validation failed" })
  }
}

module.exports = middleware
