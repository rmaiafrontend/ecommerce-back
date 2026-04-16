function notFound(req, res) {
  res.status(404).json({
    error: {
      code: "NOT_FOUND",
      message: "Rota não encontrada"
    }
  });
}

function errorHandler(err, req, res, next) {
  const status = Number(err?.status || err?.statusCode) || 500;
  const code = err?.code || (status === 500 ? "INTERNAL" : "ERROR");
  const message = err?.message || "Erro interno";

  const payload = { error: { code, message } };
  if (err?.details !== undefined) payload.error.details = err.details;

  if (status >= 500) {
    // log mínimo em produção
    // eslint-disable-next-line no-console
    console.error(err);
  }

  res.status(status).json(payload);
}

module.exports = { notFound, errorHandler };

