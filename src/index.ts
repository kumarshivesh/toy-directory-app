import express, { Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 3000;
const JWT_SECRET = 'your_jwt_secret';

app.use(express.json());

app.post('/register', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
  res.json(user);
});

app.post('/login', async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }
  const token = jwt.sign({ userId: user.id }, JWT_SECRET);
  res.json({ token });
});

// Extending the Request type to include userId
interface AuthenticatedRequest extends Request {
  userId?: number;
}

// Middleware to authenticate and extract user ID from token
const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({ error: 'Authorization header is missing' });
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }
  try {
    const payload: any = jwt.verify(token, JWT_SECRET);
    req.userId = payload.userId;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

app.post('/toys', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  const { name, description, price } = req.body;
  const toy = await prisma.toy.create({
    data: {
      name,
      description,
      price,
      userId: req.userId!,
    },
  });
  res.json(toy);
});

app.get('/toys/:name', async (req: Request, res: Response) => {
  const { name } = req.params;
  const toy = await prisma.toy.findUnique({ where: { name } });
  if (!toy) return res.status(404).json({ error: 'Toy not found' });
  res.json(toy);
});

app.put('/toys/:id', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { name, description, price } = req.body;
  const toy = await prisma.toy.update({
    where: { id: Number(id) },
    data: { name, description, price },
  });
  res.json(toy);
});

app.delete('/toys/:id', authenticate, async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  await prisma.toy.delete({ where: { id: Number(id) } });
  res.json({ message: 'Toy deleted' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
