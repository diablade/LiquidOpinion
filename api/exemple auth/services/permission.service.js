export function adminOnly(req, res, next) {
    if (!req.user || !req.user.roles.includes('admin')) {
        return res.status(403).json({message: 'Access denied'});
    }
    next();
}
