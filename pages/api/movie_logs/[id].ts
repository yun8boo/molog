import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/client";

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if(!session) return res.status(401).end('Please sign in')

  const userId = session.user.id;
  const { id } = req.query

  if(req.method === 'GET') {
    const movieLog = await prisma.movieLog.findUnique({
      where: {
        id: id as string
      }
    })
    console.log(movieLog);
    res.status(201).json(movieLog);
  }

  if(req.method === 'PATCH') {
    const { title, body } = JSON.parse(req.body)
    console.log({title, body});
    const updateMovieLog = await prisma.movieLog.update({
      where: {
        id: id as string
      },
      data: {
        title,
        body
      }
    })
    res.status(201).json(updateMovieLog);
  }

  if(req.method === 'DELETE') {
    const updateMovieLog = await prisma.movieLog.delete({
      where: {
        id: id as string
      },
    })
    res.status(201).json(updateMovieLog);
  }
}