import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';

interface IParamsProps {
  id?: string;
}


// Schema para validação da entidade

const paramsValidationDelete: yup.Schema<IParamsProps> = yup.object().shape({
  id: yup.string().required("Id é obrigatório"),
});

// export const createBodyValidator = async (req: Request<{}, {}, ICidade>, res: Response) => {
export const deleteParamsValidator: RequestHandler = async (req, res, next) => {

  try {
    await paramsValidationDelete.validate(req.params, { abortEarly: false }); // Aqui ele valida os campos
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
  export const deleteById: RequestHandler = async (req, res) => {
  // const data = req.body;
  // console.log("Dados da Requisição: ", data); 
  // let validatedData: ICidade | undefined = undefined;
  console.log(req.params);

  return res.json('Registro Deletado com sucesso');
};
