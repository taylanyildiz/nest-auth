import { NextFunction, Request, Response } from "express";


declare global {
    namespace Express {
        interface Request {
            /**
             * Berear Access Token
             */
            accessToken?: string | null;
        }
    }
}


/**
 * Express Extensions Initialize
 * @param req 
 * @param res 
 * @param next 
 */
export const expressExtInit = (req: Request, res: Response, next: NextFunction) => {
    req.accessToken = extractTokenFromHeader(req);
    next();
}


/**
 * Get Beraer Token
 * @param request 
 * @returns 
 */
function extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
}