import type { Request, Response } from "express";

const signin = async (req: Request, res: Response) => {
  try {
    console.log("came here to signin -----------");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

const signup = async (req: Request, res: Response) => {
  try {
    console.log("came here to signup -----------");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

export default {
  signin,
  signup,
};
