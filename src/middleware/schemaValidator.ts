import { Request, Response, NextFunction, RequestHandler } from "express";
import schemas from "../utils/schema";

const validationOptions = {
  abortEarly: false, // Collect all errors at once
  allowUnknown: false, // Treat unknown keys as errors
};

// Fix: Explicitly defining schemaValidator's type
const schemaValidator = (path: string): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const schema = schemas[path]; // Get schema dynamically

    if (!schema) {
      res.status(500).json({ error: `Schema not found for path: ${path}` });
      return;
    }

    const { error, value } = schema.validate(req.body, validationOptions);

    if (error) {
      res.status(422).json({
        errors: error.details.map((err) => err.message),
      });
      return;
    }

    req.body = value; // Replace body with validated data
    next(); // Proceed to next middleware
  };
};

export default schemaValidator;