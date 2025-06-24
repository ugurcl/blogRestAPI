import { Request, Response } from 'express';
import Post from './post.model';
import { successResponse, errorResponse } from '../../utils/response';

export const createPost = async (req: Request, res: Response) => {
  try {
    const { title, content, category, tags } = req.body;
    const headerImage = req.file ? `/uploads/${req.file.filename}` : undefined;
    const author = (req as any).user.userId;

    const newPost = new Post({
      title,
      content,
      category,
      tags,
      headerImage,
      author,
    });

    await newPost.save();

    return successResponse(res, newPost, 'Post created successfully', 201);
  } catch (err:any) {
    return errorResponse(res, 'Failed to create post', 500, err);
  }
};


export const getAllPosts = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 10;
  const category = req.query.category as string;
  const search = req.query.search as string;

  const filter: any = {};

  if (category) {
    filter.category = category;
  }

  if (search) {
    filter.title = { $regex: search, $options: 'i' }; 
  }

  const skip = (page - 1) * limit;

  const [posts, total] = await Promise.all([
    Post.find(filter)
      .populate('author', 'username email')
      .populate('category', 'name slug')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Post.countDocuments(filter)
  ]);

  const totalPages = Math.ceil(total / limit);

  return successResponse(res, {
    posts,
    total,
    page,
    totalPages
  }, 'Posts fetched with pagination');
};


export const getPostBySlug = async (req: Request, res: Response) => {
  const { slug } = req.params;
  const post = await Post.findOne({slug:slug})
    .populate('author', 'username email')
    .populate('category', 'name slug');

  if (!post) return errorResponse(res, 'Post not found', 404);
  return successResponse(res, post, 'Post fetched');
};



export const updatePost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.id;
    const { title, content, category, tags } = req.body;
    const headerImage = req.file ? `/uploads/${req.file.filename}` : undefined;

    const updateData: any = { title, content, category, tags };
    if (headerImage) updateData.headerImage = headerImage;

    const updatedPost = await Post.findByIdAndUpdate(postId, updateData, { new: true });

    if (!updatedPost) return errorResponse(res, 'Post not found', 404);

    return successResponse(res, updatedPost, 'Post updated successfully');
  } catch (err:any) {
    return errorResponse(res, 'Failed to update post', 500, err);
  }
};

export const deletePost = async (req: Request, res: Response) => {
  const { id } = req.params;
  const reqUser = (req as any).user;

  const post = await Post.findById(id);
  if (!post) return errorResponse(res, 'Post not found', 404);

  await Post.findByIdAndDelete(id);

  return successResponse(res, {}, 'Post deleted');
};


export const likePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const userId = (req as any).user.userId;

  const post = await Post.findById(postId);
  if (!post) return errorResponse(res, 'Post not found', 404);

  const liked = post.likes.some((id) => id.toString() === userId);
  const disliked = post.dislikes.some((id) => id.toString() === userId);

  if (liked) {
    post.likes = post.likes.filter((id) => id.toString() !== userId);
  } else {
    post.likes.push(userId);
    if (disliked) {
      post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
    }
  }

  await post.save();

  return successResponse(res, {
    liked: !liked,
    likesCount: post.likes.length,
    dislikesCount: post.dislikes.length
  }, liked ? 'Like removed' : 'Post liked');
};



export const dislikePost = async (req: Request, res: Response) => {
  const postId = req.params.id;
  const userId = (req as any).user.userId;

  const post = await Post.findById(postId);
  if (!post) return errorResponse(res, 'Post not found', 404);

  const liked = post.likes.some((id) => id.toString() === userId);
  const disliked = post.dislikes.some((id) => id.toString() === userId);

  if (disliked) {
    post.dislikes = post.dislikes.filter((id) => id.toString() !== userId);
  } else {
    post.dislikes.push(userId);
    if (liked) {
      post.likes = post.likes.filter((id) => id.toString() !== userId);
    }
  }

  await post.save();

  return successResponse(res, {
    disliked: !disliked,
    likesCount: post.likes.length,
    dislikesCount: post.dislikes.length
  }, disliked ? 'Dislike removed' : 'Post disliked');
};

