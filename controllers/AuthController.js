import { User } from "../models/index.js";
import argon2 from 'argon2'

export const Login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ msg: 'Semua field harus diisi!' });
    }

    const userExist = await User.findOne({
        where: {
            email: req.body.email
        }
    });
    if (!userExist) return res.status(404).json({ msg: 'User Not Found!' });

    const match = await argon2.verify(userExist.password, req.body.password);
    if (!match) return res.status(400).json({ msg: 'Your Credentials Didnt Match With Our Database' });

    req.session.userId = userExist.uuid
    const uuid = userExist.uuid
    const name = userExist.name
    const userEmail = userExist.email
    const role = userExist.role

    res.status(200).json({
        uuid: uuid,
        name: name,
        email: userEmail,
        role: role
    });
}

export const Me = async (req, res) => {
    if (!req.session.userId) {
        return res.status(401).json({ msg: 'Mohon Login ke Akun Anda!' })
    }
    const userExist = await User.findOne({
        attributes: ['uuid', 'name', 'email', 'role'],
        where: {
            uuid: req.session.userId
        }
    });
    if (!userExist) return res.status(404).json({ msg: 'User Tidak Ditemukan' });
    res.status(200).json(userExist)
}

export const Logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) return res.status(400).json({ msg: 'Tidak Dapat Logout' });
        res.status(200).json({ msg: 'Anda Telah logout' })
    })
}
