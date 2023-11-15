import { Request, RequestHandler, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import * as yup from 'yup';
import { ICidade } from '../../database/models';
import { CidadesProvider } from '../../database/providers/cidades';

// interface ICidade {
//   id?: string;
//   nome: string;
//   quantidade: number;
//   ativa: boolean;
// }

interface IBodyProps extends Omit<ICidade, 'id'> {}

// Schema para validação da entidade
const bodyValidation: yup.Schema<IBodyProps> = yup.object().shape({
  // id: yup.string(),
  nome: yup
    .string()
    .required()
    .min(3, ' Nome com mínimo de 3 caracteres')
    .max(150, 'Máximo de 150 caracteres')
    .required('Campo nome é obrigatório'),
  quantidade: yup.number().required('Campo Quantidade é obrigatória'),
  ativa: yup.boolean().typeError('Campo deve ser do tipo boolean').required('Campo ativo é obrigatório'),
});

// export const createBodyValidator = async (req: Request<{}, {}, ICidade>, res: Response) => {
export const createBodyValidator: RequestHandler = async (req, res, next) => {
  try {
    await bodyValidation.validate(req.body, { abortEarly: false }); // Aqui ele valida os campos
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
};

// export const create = async (req: Request<{}, {}, ICidade>, res: Response) => {
export const create: RequestHandler = async (req, res) => {
  // const data = req.body;
  // console.log("Dados da Requisição: ", data);
  // let validatedData: ICidade | undefined = undefined;
  console.log(req.body);

  const result = await CidadesProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
