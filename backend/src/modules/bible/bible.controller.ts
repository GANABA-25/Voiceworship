import type { Request, Response } from "express";

const getAllBible = async (req: Request, res: Response) => {
  try {
    console.log("came here to getAllBible -----------");
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message:
        "An error occurred while processing your request. Please try again later.",
    });
  }
};

export default {
  getAllBible,
};
