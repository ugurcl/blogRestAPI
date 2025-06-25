/**
 * @openapi
 * tags:
 *   - name: Users
 *     description: User profile and admin management
 */

/**
 * @openapi
 * /api/users/me:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get current authenticated user's profile
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile retrieved
 *       404:
 *         description: User not found
 */

/**
 * @openapi
 * /api/users/me:
 *   put:
 *     tags:
 *       - Users
 *     summary: Update current user's profile (username, email, password, avatar)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johnUpdated
 *               email:
 *                 type: string
 *                 example: john@updated.com
 *               password:
 *                 type: string
 *                 example: newPassword123
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 */

/**
 * @openapi
 * /api/users/all:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users (admin only)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @openapi
 * /api/users/{id}:
 *   delete:
 *     tags:
 *       - Users
 *     summary: Delete a user by ID (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

/**
 * @openapi
 * /api/users/{id}/role:
 *   patch:
 *     tags:
 *       - Users
 *     summary: Update user's role (admin only)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 enum: [admin, user]
 *                 example: admin
 *     responses:
 *       200:
 *         description: User role updated
 *       400:
 *         description: Invalid role provided
 *       404:
 *         description: User not found
 */
