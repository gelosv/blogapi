import { ZodSchema } from "zod";
import { Request, Response, NextFunction } from "express";
import boom from "@hapi/boom";

export function validatorSchema<Q,B,P>(
  origin: "params" | "body" | "query",
  schema: ZodSchema,
) {
  return (req: Request<P, unknown, B, Q>, res: Response, next: NextFunction) => {
    const data = req[origin];
    const payload = schema.safeParse(data);
    console.log(payload, "resultado validación");

    if (!payload.success) {
      const errors = payload.error.formErrors.fieldErrors
      console.log(errors, 'errores')
      throw boom.badRequest(JSON.stringify(errors));
    }
    req[origin] = payload.data;
    return next();
  };
}

export function validatorSchema2({
  body,
  query,
  params,
}: {
  body?: ZodSchema;
  query?: ZodSchema;
  params?: ZodSchema;
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    // Validar `req.body` si se pasa un esquema
    if (body) {
      const result = body.safeParse(req.body);
      if (!result.success) throw boom.badRequest('Mala data');
      req.body = result.data; // ✅ Sobreescribimos `req.body` con los datos validados
    }

    // Validar `req.query` si se pasa un esquema
    if (query) {
      const result = query.safeParse(req.query);
      if (!result.success) throw boom.badRequest('Mala data');
      req.query = result.data; // ✅ Solución segura para `req.query`
    }

    // Validar `req.params` si se pasa un esquema
    if (params) {
      const result = params.safeParse(req.params);
      if (!result.success) throw boom.badRequest('Mala data');
      req.params = result.data; // ✅ Sobreescribimos `req.params` con los datos validados
    }

    next();
  };
}
