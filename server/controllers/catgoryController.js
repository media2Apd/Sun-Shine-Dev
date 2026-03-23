import * as categoryService from "../services/categoryService.js";
import { successResponse, errorResponse } from "../utils/response.js";

/**
 * POST /api/categories
 * Create a new category
 */
export const createCategory = async (req, res) => {
  try {
    const category = await categoryService.createCategory(req.body, req.files);
    return successResponse(res, 201, "Category created successfully", category);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

/**
 * GET /api/categories
 * Get all categories (supports ?status=Active&showOnWebsite=true)
 */
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories(req.query);
    return successResponse(res, 200, "Categories fetched successfully", categories);
  } catch (error) {
    return errorResponse(res, 500, error.message);
  }
};

/**
 * GET /api/categories/:id
 * Get single category by ID
 */
export const getCategoryById = async (req, res) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    return successResponse(res, 200, "Category fetched successfully", category);
  } catch (error) {
    return errorResponse(res, 404, error.message);
  }
};

/**
 * PUT /api/categories/:id
 * Update a category
 */
export const updateCategory = async (req, res) => {
  try {
    const category = await categoryService.updateCategory(
      req.params.id,
      req.body,
      req.files
    );
    return successResponse(res, 200, "Category updated successfully", category);
  } catch (error) {
    return errorResponse(res, 400, error.message);
  }
};

/**
 * DELETE /api/categories/:id
 * Delete a category
 */
export const deleteCategory = async (req, res) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    return successResponse(res, 200, "Category deleted successfully", null);
  } catch (error) {
    return errorResponse(res, 404, error.message);
  }
};