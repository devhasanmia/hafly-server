import { Request, Response } from "express";
import { StatusCode } from "../utils/statusCode";


const notFound = (req: Request, res: Response) => {
    res.status(StatusCode.NotFound).json({
        success: false,
        message: "Route Not Found"
    })
}

export default notFound