const Category = require('../models/categoryModel')
const asyncHandler = require('express-async-handler')
const validateMongoDbId = require("../utils/validateMongodbld");
const { get } = require('mongoose');

const createCategory = asyncHandler(async(req,res)=>{
    try{
        const newCategory = await Category.create(req.body);
        res.json(newCategory)
    }
    catch(error){
        throw new Error(error)
    }
})

const updateCategory = asyncHandler(async (req, res) => {
    try {
        const categoryId = req.params.id; // Assuming category ID is passed as a route parameter
        validateMongoDbId(categoryId)
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, req.body, { new: true });
        

        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        res.json(updatedCategory);
    } catch (error) {
        // Handle any errors that occur during the update process
        throw new Error(error);
    }
});

const deleteCategory = asyncHandler(async (req, res) => {
    try {
        const categoryId = req.params.id; // Assuming category ID is passed as a route parameter
        validateMongoDbId(categoryId)

        // Find the category by ID and delete it
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        // If the category is not found, return a 404 status and a corresponding message
        if (!deletedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Return a success message if the category is successfully deleted
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        // Handle any errors that occur during the deletion process
        throw new Error(error);
    }
});

const getCategoryById = asyncHandler(async (req, res) => {
    try {
        const categoryId = req.params.id; // Assuming category ID is passed as a route parameter

        // Find the category by ID
        const category = await Category.findById(categoryId);

        // If the category is not found, return a 404 status and a corresponding message
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        // Return the category object if found
        res.json(category);
    } catch (error) {
        // Handle any errors that occur during the retrieval process
        throw new Error(error);
    }
});

const getAllCategories = asyncHandler(async (req, res) => {
    try {
        // Fetch all categories from the database
        const categories = await Category.find();

        // Return the array of categories
        res.json(categories);
    } catch (error) {
        // Handle any errors that occur during the retrieval process
        throw new Error(error);
    }
});





module.exports = { createCategory, updateCategory, deleteCategory, getCategoryById, getAllCategories }