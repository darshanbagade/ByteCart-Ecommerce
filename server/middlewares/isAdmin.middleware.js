import { ApiError } from "../utils/ApiError.js";

export const isAdmin = (req, res, next) => {
    if (!req.user || !req.user.role || req.user.role !== 'ADMIN') {
        throw new ApiError(403, "Access Denied. Admins only.");
    }
    next();
};
