import swaggerJSDoc from "swagger-jsdoc";

const options = {
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [{ bearerAuth: [] }],
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Blog REST API Documentation",
      version: "1.0.0",
        description: "Automatically generated Swagger documentation for the Blog REST API project. This API provides endpoints for authentication, posts, comments, categories, and user management.",

    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Local Server",
      },
    ],
  },
  apis: [
    "./docs/*.ts",
    "./modules/auth/controllers/*.ts",
    "./modules/category/*.ts",
    "./modules/comment/*.ts",
    "./modules/post/*.ts",
    "./modules/user/*.ts",
  ],
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
