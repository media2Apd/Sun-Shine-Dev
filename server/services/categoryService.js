import * as categoryRepo from "../repositories/categoryRepo.js";
import {
  uploadToCloudinary,
  deleteFromCloudinary,
} from "../utils/Cloudinary.js";

/**
 * Create a new category with optional icon/image upload
 */
export const createCategory = async (body, files) => {
  const categoryData = { ...body };

  // Upload icon if provided
  if (files?.icon?.[0]) {
    const result = await uploadToCloudinary(
      files.icon[0].buffer,
      "categories/icons"
    );
    categoryData.icon = { url: result.url, publicId: result.publicId };
  }

  // Upload image if provided
  if (files?.image?.[0]) {
    const result = await uploadToCloudinary(
      files.image[0].buffer,
      "categories/images"
    );
    categoryData.image = { url: result.url, publicId: result.publicId };
  }

  // Check URL uniqueness
  if (body.url) {
    const existing = await categoryRepo.findCategoryByUrl(body.url);
    if (existing) throw new Error("Category URL already exists");
  }

  return await categoryRepo.createCategory(categoryData);
};

/**
 * Get all categories — optionally filter by status or visibility
 */
export const getAllCategories = async (query = {}) => {
  const filter = {};
  if (query.status) filter.status = query.status;
  if (query.showOnWebsite !== undefined)
    filter.showOnWebsite = query.showOnWebsite === "true";
  return await categoryRepo.getAllCategories(filter);
};

/**
 * Get single category by ID
 */
export const getCategoryById = async (id) => {
  const category = await categoryRepo.getCategoryById(id);
  if (!category) throw new Error("Category not found");
  return category;
};

/**
 * Update category — replaces Cloudinary assets if new files uploaded
 */
export const updateCategory = async (id, body, files) => {
  const existing = await categoryRepo.getCategoryById(id);
  if (!existing) throw new Error("Category not found");

  const updateData = { ...body };

  // Handle icon update
  if (files?.icon?.[0]) {
    await deleteFromCloudinary(existing.icon?.publicId);
    const result = await uploadToCloudinary(
      files.icon[0].buffer,
      "categories/icons"
    );
    updateData.icon = { url: result.url, publicId: result.publicId };
  }

  // Handle image update
  if (files?.image?.[0]) {
    await deleteFromCloudinary(existing.image?.publicId);
    const result = await uploadToCloudinary(
      files.image[0].buffer,
      "categories/images"
    );
    updateData.image = { url: result.url, publicId: result.publicId };
  }

  // Handle icon removal (frontend sends removeIcon=true)
  if (body.removeIcon === "true" && existing.icon?.publicId) {
    await deleteFromCloudinary(existing.icon.publicId);
    updateData.icon = { url: null, publicId: null };
  }

  // Handle image removal
  if (body.removeImage === "true" && existing.image?.publicId) {
    await deleteFromCloudinary(existing.image.publicId);
    updateData.image = { url: null, publicId: null };
  }

  // Check URL uniqueness on update
  if (body.url) {
    const duplicate = await categoryRepo.findCategoryByUrl(body.url, id);
    if (duplicate) throw new Error("Category URL already exists");
  }

  return await categoryRepo.updateCategoryById(id, updateData);
};

/**
 * Delete category and clean up Cloudinary assets
 */
export const deleteCategory = async (id) => {
  const existing = await categoryRepo.getCategoryById(id);
  if (!existing) throw new Error("Category not found");

  await deleteFromCloudinary(existing.icon?.publicId);
  await deleteFromCloudinary(existing.image?.publicId);

  return await categoryRepo.deleteCategoryById(id);
};