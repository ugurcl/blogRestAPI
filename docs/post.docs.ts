/**
 * @openapi
 * tags:
 *   - name: Posts
 *     description: Blog post management endpoints
 */

/**
 * @openapi
 * /api/posts:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get all posts with pagination, filtering and search
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           example: 10
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: 60d21b4667d0d8992e610c85
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           example: javascript
 *     responses:
 *       200:
 *         description: Posts fetched with pagination
 */

/**
 * @openapi
 * /api/posts/{slug}:
 *   get:
 *     tags:
 *       - Posts
 *     summary: Get a post by its slug
 *     parameters:
 *       - in: path
 *         name: slug
 *         required: true
 *         schema:
 *           type: string
 *           example: building-rest-api
 *     responses:
 *       200:
 *         description: Post fetched successfully
 *       404:
 *         description: Post not found
 */

/**
 * @openapi
 * /api/posts:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Create a new post
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - category
 *             properties:
 *               title:
 *                 type: string
 *                 example: My First Blog Post
 *               content:
 *                 type: string
 *                 example: This is the content of the post.
 *               category:
 *                 type: string
 *                 example: 60d21b4667d0d8992e610c85
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["tech", "nodejs"]
 *               headerImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Post created successfully
 *       400:
 *         description: Invalid data
 */

/**
 * @openapi
 * /api/posts/{id}:
 *   put:
 *     tags:
 *       - Posts
 *     summary: Update a post by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Updated title
 *               content:
 *                 type: string
 *                 example: Updated content
 *               category:
 *                 type: string
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *               headerImage:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       404:
 *         description: Post not found
 */

/**
 * @openapi
 * /api/posts/{id}:
 *   delete:
 *     tags:
 *       - Posts
 *     summary: Delete a post by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Post deleted
 *       404:
 *         description: Post not found
 */

/**
 * @openapi
 * /api/posts/{id}/like:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Like or unlike a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Like toggled successfully
 *       404:
 *         description: Post not found
 */

/**
 * @openapi
 * /api/posts/{id}/dislike:
 *   post:
 *     tags:
 *       - Posts
 *     summary: Dislike or remove dislike from a post
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Post ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Dislike toggled successfully
 *       404:
 *         description: Post not found
 */
