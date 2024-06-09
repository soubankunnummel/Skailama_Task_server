

// trycatch middleware
export const tryCatch = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    } catch (error) {
      console.log(`Erro in try-catch middleware :${error.message} `);
        res.status(res.statusCode < 400 ? 400 : res.statusCode || 500).send(error.message);
        next(error);
    }
}