import { User } from "../models/index.js";

export const verifyUser = async (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: 'Mohon Login ke Akun Anda!' })
    }
    const userExist = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!userExist) return res.status(404).json({ msg: 'User Tidak Ditemukan' });
    req.userId = userExist.id
    req.role = userExist.role
    next();
}

export const adminOnly = async (req, res, next) => {
    const userExist = await User.findOne({
        where: {
            uuid: req.session.userId
        }
    });
    if (!userExist) return res.status(404).json({ msg: 'User Tidak Ditemukan' });
    if (userExist.role !== 'admin') return res.status(403).json({ msg: 'Akses Ditolak' })
    next();
}
