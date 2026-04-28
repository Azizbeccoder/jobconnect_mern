import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { HttpError, asyncHandler } from '../middleware/errorHandler.js';

const ACCESS_TTL = '15m';
const REFRESH_TTL = '7d';

function signAccess(user) {
  return jwt.sign({ sub: user._id.toString(), role: user.role }, process.env.JWT_ACCESS_SECRET, {
    expiresIn: ACCESS_TTL,
  });
}

function signRefresh(user) {
  return jwt.sign({ sub: user._id.toString() }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: REFRESH_TTL,
  });
}

function setAuthCookies(res, user) {
  const secure = process.env.NODE_ENV === 'production';
  res.cookie('accessToken', signAccess(user), {
    httpOnly: true,
    secure,
    sameSite: secure ? 'none' : 'lax',
    maxAge: 15 * 60 * 1000,
  });
  res.cookie('refreshToken', signRefresh(user), {
    httpOnly: true,
    secure,
    sameSite: secure ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export const register = asyncHandler(async (req, res) => {
  const { email, password, name, role } = req.body;
  if (!email || !password || !name) throw new HttpError(400, 'email, password, and name are required');
  if (password.length < 8) throw new HttpError(400, 'Password must be at least 8 characters');

  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) throw new HttpError(409, 'Email already in use');

  const user = await User.createWithPassword({
    email,
    password,
    name,
    role: role === 'employer' ? 'employer' : 'seeker',
  });
  setAuthCookies(res, user);
  res.status(201).json({ user });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new HttpError(400, 'email and password are required');

  const user = await User.findOne({ email: email.toLowerCase() });
  if (!user) throw new HttpError(401, 'Invalid credentials');
  const ok = await user.verifyPassword(password);
  if (!ok) throw new HttpError(401, 'Invalid credentials');

  setAuthCookies(res, user);
  res.json({ user });
});

export const logout = asyncHandler(async (_req, res) => {
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ ok: true });
});
