import { Request, Response } from "express";
import { Comment } from "./comment.model";
import { successResponse, errorResponse } from "../../utils/response";

export const addComment = async (req: Request, res: Response) => {
  try {
    const { content, postId, parentCommentId } = req.body;
    const author = (req as any).user.userId;

    const newComment = new Comment({
      content,
      author,
      post: postId,
      parentComment: parentCommentId || null,
    });

    await newComment.save();

    return successResponse(res, newComment, "Comment added successfully", 201);
  } catch (err: any) {
    return errorResponse(res, "Failed to add comment", 500, err);
  }
};

export const deleteComment = async (req: Request, res: Response) => {
  try {
    const commentId = req.params.id;
    const userId = (req as any).user.userId;
    const userRole = (req as any).user.role;

    const comment = await Comment.findById(commentId);
    if (!comment) return errorResponse(res, "Comment not found", 404);

    if (comment.author.toString() !== userId && userRole !== "admin") {
      return errorResponse(res, "Not authorized to delete this comment", 403);
    }

    await (comment as any).remove();

    return successResponse(res, [], "Comment deleted successfully", 200);
  } catch (err: any) {
    return errorResponse(res, "Failed to delete comment", 500, err);
  }
};

export const getCommentsByPost = async (req: Request, res: Response) => {
  try {
    const postId = req.params.postId;

    const comments = await Comment.find({ post: postId })
      .populate("author", "username email")
      .sort({ createdAt: 1 })
      .lean();

    const nestedComments = buildNestedComments(comments);

    return successResponse(res, nestedComments, "Comments fetched");
  } catch (err: any) {
    return errorResponse(res, "Failed to get comments", 500, err);
  }
};

const buildNestedComments = (comments: any[]) => {
  const map = new Map();
  const roots: any[] = [];

  comments.forEach((comment) => {
    comment.children = [];
    map.set(comment._id.toString(), comment);
  });

  comments.forEach((comment) => {
    if (comment.parentComment) {
      const parent = map.get(comment.parentComment.toString());
      if (parent) parent.children.push(comment);
    } else {
      roots.push(comment);
    }
  });

  return roots;
};
