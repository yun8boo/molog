import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/client";

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if(!session) return res.status(401).end('Please sign in')

  const userId = session.user.id;

  if(req.method === 'GET') {
    const movieLogs = await prisma.movieLog.findMany({
      where: {
        userId
      }
    })
    res.status(200).json(movieLogs);
  }

  if(req.method === 'POST') {
    const { title, body } = JSON.parse(req.body)
    const createMovieLog = await prisma.movieLog.create({
      data: {
        body,
        title,
        user: {
          connect: {
            id: userId
          }
        }
      }
    })
    res.status(201).json(createMovieLog);
  }
}