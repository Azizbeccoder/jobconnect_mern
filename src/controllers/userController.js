import { asyncHandler } from '../middleware/errorHandler.js';

export const getMe = asyncHandler(async (req, res) => {
  res.json({ user: req.user });
});

export const updateMe = asyncHandler(async (req, res) => {
  const allowed = ['name', 'headline', 'location', 'skills', 'avatarUrl'];
  for (const key of allowed) {
    if (key in req.body) req.user[key] = req.body[key];
  }
  await req.user.save();
  res.json({ user: req.user });
});
