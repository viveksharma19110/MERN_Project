const mongoose = require("mongoose");
const User = require("../models/userModel");
const router = require("express").Router();

//post or create
router.post("/", async (req, res) => {
    const { name, email, age } = req.body;

    try {
        const userAdded = await User.create({
            name: name,
            email: email,
            age: age,
        });
        res.status(201).json(userAdded);
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: error.message });
    }
});

//to get the data
router.get("/get", async (req, res) => {
    try {
        const showAll = await User.find();
        res.status(200).json(showAll);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

//to get the data of one
router.get("/getOne/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const singleUser = await User.findById(id);
        res.status(200).json(singleUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

//to delete
router.delete("/delete/:id", async (req, res) => {
    const {id} = req.params;
    try {
        const deleteUser = await User.findByIdAndDelete(id);
        res.status(200).json(deleteUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

//to update
router.patch("/user/:id", async (req, res) => {
    const {id} = req.params;
    const {name,email,age}=req.body;
    try {
        const updateUser = await User.findByIdAndUpdate(id,req.body,{new:true});
        res.status(200).json(updateUser);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;