import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface IQueryPropsPagination {
  page?: number;
  limit?: number;
  filter?: string;
}

// Schema para validação da entidade
const getAllValidationPagination: yup.Schema<IQueryPropsPagination> = yup.object().shape({
  page: yup.number().moreThan(0, "Valor precisa ser maior que 0").typeError("Valor precisa ser numérico"),
  limit: yup.number().moreThan(0, "Valor precisa ser maior que 0").typeError("Valor precisa ser um numérico"),
  ativa: yup.string()
});



// export const createBodyValidator = async (req: Request<{}, {}, ICidade>, res: Response) => {
export const getAllQueryValidatorPagination: RequestHandler = async (req, res, next) => {

  try {
    await getAllValidationPagination.validate(req.query, { abortEarly: false }); // Aqui ele valida os campos
    return next(); // se a validação passar será executado o outro handle do arquivo routes.index
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {};

    yupError.inner.forEach((error) => {
      if (error.path === undefined) return;
      errors[error.path] = error.message;
    });

    return res.status(StatusCodes.BAD_REQUEST).json({ errors });
  }

}
// export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
  export const getAll: RequestHandler<{},{},{}, IQueryPropsPagination> = async (req, res) => {
  // const data = req.body;
  // console.log("Dados da Requisição: ", data); 
  // let validatedData: ICidade | undefined = undefined;
  console.log(req.query); 

  return res.json('Buscando todos os registros!');
};
