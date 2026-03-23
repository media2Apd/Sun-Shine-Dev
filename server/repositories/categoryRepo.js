import Category from "../models/Category.js";

/**
 * Create a new category
 */
export const createCategory = async (data) => {
  const category = new Category(data);
  return await category.save();
};

/**
 * Get all categories with optional filters
 */
export const getAllCategories = async (filter = {}) => {
  return await Category.find(filter).sort({ createdAt: -1 });
};

/**
 * Get a single category by ID
 */
export const getCategoryById = async (id) => {
  return await Category.findById(id);
};

/**
 * Update category by ID
 */
export const updateCategoryById = async (id, updateData) => {
  return await Category.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
};

/**
 * Delete category by ID
 */
export const deleteCategoryById = async (id) => {
  return await Category.findByIdAndDelete(id);
};

/**
 * Check if a category URL already exists (for uniqueness)
 */
export const findCategoryByUrl = async (url, excludeId = null) => {
  const query = { url };
  if (excludeId) query._id = { $ne: excludeId };
  return await Category.findOne(query);
};