const express = require('express')
const User = require('../../models/UserModel')

const getAllUsersController = async (req, res) => {
    let allUsers = await User.find()
    return res.json({
        success: true,
        users: allUsers
    })
}
module.exports = getAllUsersController