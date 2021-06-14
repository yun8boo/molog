import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client'
import { getSession } from "next-auth/client";

const prisma = new PrismaClient()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if(!session) return res.status(401).end('Please sign in')

  const userId = session.user.id;
  const { id } = req.query

  console.log('method', req.method);

  if(req.method === 'GET') {
    try {
      const movieLog = await prisma.movieLog.findUnique({
        where: {
          id: id as string
        }
      })
      if(!movieLog) {
        res.status(404).json(null); 
      }
      res.status(201).json(movieLog); 
    } catch (error) {
      console.log('error', error);
    }
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
    try {
      const deleteMovieLog = await prisma.movieLog.delete({
        where: {
          id: id as string
        },
      })
      res.status(201).end('success'); 
    } catch (error) {
      res.status(500).end()
    }
  }
}