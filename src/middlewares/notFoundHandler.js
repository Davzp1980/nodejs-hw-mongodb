export function notFoundHandler(req, res, next) {
  res.status(404).json({
    message: 'Not found',
  });
  next();
}
