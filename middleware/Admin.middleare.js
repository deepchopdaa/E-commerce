const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) next();
    else res.status(403).json({ message: "Admins only" });
};
module.exports = admin