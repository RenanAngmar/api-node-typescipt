import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { ICidade } from '../../database/models';

interface IParamsProps {
  id?: string;
}

interface IBodyProps extends Omit<ICidade, 'id'> {}

// Schema para validação da entidade
const bodyValidationUpdate: yup.Schema<IBodyProps> = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório").min(3, ' Nome com mínimo de 3 caracteres'),
  quantidade: yup.number().required('Campo Quantidade é obrigatória'),
  ativa: yup.boolean().typeError('Campo deve ser do tipo boolean').required('Campo ativo é obrigatório'),
});

const paramsValidationUpdate: yup.Schema<IParamsProps> = yup.object().shape({
  id: yup.string().required("Id é obrigatório"),
});

// export const createBodyValidator = async (req: Request<{}, {}, ICidade>, res: Response) => {
export const updateBodyValidator: RequestHandler = async (req, res, next) => {

  try {
    await bodyValidationUpdate.validate(req.body, { abortEarly: false }); // Aqui ele valida os campos
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

export const updateParamsValidator: RequestHandler = async (req, res, next) => {

  try {
    await paramsValidationUpdate.validate(req.params, { abortEarly: false }); // Aqui ele valida os campos
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
  export const updateById: RequestHandler = async (req, res) => {
  // const data = req.body;
  // console.log("Dados da Requisição: ", data); 
  // let validatedData: ICidade | undefined = undefined;
  console.log(req.body);
  console.log(req.params);
  

  return res.json('Registro atualizado com sucesso');
};
