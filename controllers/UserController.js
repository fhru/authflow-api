import { User } from "../models/index.js";
import argon2 from 'argon2'

export const getUsers = async (req, res) => {
    try {
        const response = await User.findAll({
            attributes: ['uuid', 'name', 'email', 'role']
        })
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const getUserById = async (req, res) => {
    try {
        const response = await User.findOne({
            where: {
                uuid: req.params.id
            },
            attributes: ['uuid', 'name', 'email', 'role']
        });
        res.status(200).json(response)
    } catch (error) {
        res.status(500).json({ msg: error.message })
    }
}

export const createUser = async (req, res) => {
    const { name, email, password, confirmPassword, role } = req.body;
    if (password !== confirmPassword) return res.status(400).json({ msg: 'Password Dan Confirm Password Tidak Cocok!' });
    const hashedPassword = await argon2.hash(password);

    try {
        await User.create({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        });
        res.status(201).json({ msg: 'Register Berhasil' })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}

export const updateUser = async (req, res) => {
    const userExist = await User.findOne({
        where: {
            uuid: req.params.id
        },
    });
    if (!userExist) return res.status(404).json({ msg: 'User Tidak Ditemukan' });
    const { name, email, password, confirmPassword, role } = req.body;
    let hashPassword;
    if (password == "" || password == null) {
        hashPassword = userExist.password
    } else {
        hashPassword = await argon2.hash(password)
    }
    if (password !== confirmPassword) return res.status(400).json({ msg: 'Password Dan Confirm Password Tidak Sama' });

    try {
        await User.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        }, {
            where: {
                id: userExist.id
            }
        });
        res.status(200).json({ msg: 'User Updated' })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }

}

export const deleteUser = async (req, res) => {
    const userExist = await User.findOne({
        where: {
            uuid: req.params.id
        },
    });
    if (!userExist) return res.status(404).json({ msg: 'User Tidak Ditemukan' });

    try {
        await User.destroy({
            where: {
                id: userExist.id
            }
        });
        res.status(200).json({ msg: 'User Deleted Successfuly' })
    } catch (error) {
        res.status(400).json({ msg: error.message })
    }
}
