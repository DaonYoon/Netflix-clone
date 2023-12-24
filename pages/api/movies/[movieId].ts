import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";
import prismadb from "@/libs/prismadb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    await serverAuth(req, res);

    const { movieId } = req.query;

    console.log(movieId);
    if (typeof movieId !== "string") {
      throw new Error("없는 영화입니다.");
    }

    if (!movieId) {
      throw new Error("존재하지 않는 영화입니다.");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      throw new Error("존재하지 않는 영화입니다.");
    }

    return res.status(200).json(movie);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
}
