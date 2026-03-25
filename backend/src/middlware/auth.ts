import type{ Request, Response, NextFunction } from 'express';

export const apiKeyMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.header('x-api-key');

  if (!apiKey || apiKey !== process.env.API_KEY) {
    console.log("unautorized");
    return res.status(401).json({ 
      status: 'error', 
      message: 'Unauthorized: Invalid or missing API Key' 
    });
  }

  next();
};