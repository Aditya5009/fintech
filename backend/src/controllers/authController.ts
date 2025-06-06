import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// export const register = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   const hashed = await bcrypt.hash(password, 10);

//   try {
//     const user = await prisma.user.create({
//       data: { email, password: hashed },
//     });
//     res.json(user);
//   } catch {
//     res.status(400).json({ message: 'Email already in use' });
//   }
// };

// export const login = async (req: Request, res: Response) => {
//   const { email, password } = req.body;
//   const user = await prisma.user.findUnique({ where: { email } });

//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(401).json({ message: 'Invalid credentials' });
//   }

//   const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
//     expiresIn: '1h',
//   });

//   res.json({ token });
// };



export async function register(req: Request, res: Response) {
  const { email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashed },
    });
    res.json(user);
  } catch {
    res.status(400).json({ message: 'Email already in use' });
  }
};

export async function login(req: Request, res: Response): Promise<any> {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  res.json({ token });
};
