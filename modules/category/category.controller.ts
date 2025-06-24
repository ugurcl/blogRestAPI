import { Request, Response } from "express";
import Category from "./category.models";
import slugify from "slugify";
import { successResponse, errorResponse } from "../../utils/response";


export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;
  if (!name) return errorResponse(res, 'Name is required', 400);

  const slug = slugify(name, { lower: true });
  const existing = await Category.findOne({ slug });
  if (existing) return errorResponse(res, 'Category already exists', 400);

  const category = await Category.create({ name, slug });
  return successResponse(res, category, 'Category created', 201);
};


export const getAllCategories = async (_req: Request, res: Response) => {
  const categories = await Category.find().sort({ createdAt: -1 });
  return successResponse(res, categories, 'Categories fetched');
};


export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const category = await Category.findByIdAndDelete(id);
  if (!category) return errorResponse(res, 'Category not found', 404);

  return successResponse(res, category, 'Category deleted');
};


export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) return errorResponse(res, 'Name is required', 400);

  const category = await Category.findById(id);
  if (!category) return errorResponse(res, 'Category not found', 404);

  category.name = name;
  await category.save();

  return successResponse(res, category, 'Category updated');
};