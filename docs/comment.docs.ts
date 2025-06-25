/**
 * @openapi
 * tags:
 *   - name: Comments
 *     description: Comment management endpoints
 */

/**
 * @openapi
 * /api/comments:
 *   post:
 *     tags:
 *       - Comments
 *     summary: Add a new comment
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Comment data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - content
 *               - postId
 *             properties:
 *               content:
 *                 type: string
 *                 example: This is a comment.
 *               postId:
 *                 type: string
 *                 example: 60d21b4667d0d8992e610c85
 *               parentCommentId:
 *                 type: string
 *                 nullable: true
 *                 example: 60d21b4667d0d8992e610c86
 *     responses:
 *       201:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Comment added successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: 60d21b4667d0d8992e610c87
 *                     content:
 *                       type: string
 *                       example: This is a comment.
 *                     author:
 *                       type: string
 *                       example: 60d21b4667d0d8992e610c80
 *                     post:
 *                       type: string
 *                       example: 60d21b4667d0d8992e610c85
 *                     parentComment:
 *                       type: string
 *                       nullable: true
 *                       example: 60d21b4667d0d8992e610c86
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2023-06-01T12:00:00Z
 */

/**
 * @openapi
 * /api/comments/{id}:
 *   delete:
 *     tags:
 *       - Comments
 *     summary: Delete a comment by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Comment ID to delete
 *         schema:
 *           type: string
 *           example: 60d21b4667d0d8992e610c87
 *     responses:
 *       200:
 *         description: Comment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Comment deleted successfully
 *                 data:
 *                   type: array
 *                   example: []
 *       403:
 *         description: Not authorized to delete this comment
 *       404:
 *         description: Comment not found
 */

/**
 * @openapi
 * /api/comments/post/{postId}:
 *   get:
 *     tags:
 *       - Comments
 *     summary: Get comments by post ID (nested structure)
 *     parameters:
 *       - in: path
 *         name: postId
 *         required: true
 *         description: Post ID to get comments for
 *         schema:
 *           type: string
 *           example: 60d21b4667d0d8992e610c85
 *     responses:
 *       200:
 *         description: Comments fetched successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Comments fetched
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       _id:
 *                         type: string
 *                         example: 60d21b4667d0d8992e610c87
 *                       content:
 *                         type: string
 *                         example: This is a comment.
 *                       author:
 *                         type: object
 *                         properties:
 *                           username:
 *                             type: string
 *                             example: johndoe
 *                           email:
 *                             type: string
 *                             example: john@example.com
 *                       post:
 *                         type: string
 *                         example: 60d21b4667d0d8992e610c85
 *                       parentComment:
 *                         type: string
 *                         nullable: true
 *                         example: 60d21b4667d0d8992e610c86
 *                       children:
 *                         type: array
 *                         items:
 *                           $ref: '#/components/schemas/Comment'
 */
