import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from 'yup';

interface ICidade {
  id?: string;
  nome: string;
  quantidade: number;
  ativa: boolean;
}

// Schema para validação da entidade
const bodyValidation: yup.Schema<ICidade> = yup.object().shape({
  id: yup.string(),
  nome: yup.string().required().min(3, " Nome com mínimo de 3 caracteres").required("Campo nome é obrigatório"),
  quantidade: yup.number().required("Campo Quantidade é obrigatória"),
  ativa: yup.boolean().typeError("Campo deve ser do tipo boolean").required("Campo ativo é obrigatório")
})

export const create = async (req: Request<{},{}, ICidade>, res: Response) => {

  // const data = req.body;
  // console.log("Dados da Requisição: ", data);

  let validatedData: ICidade | undefined = undefined

  try {
    let validatedData = await bodyValidation.validate(req.body, {abortEarly: false}) // Aqui ele valida os campos
  } catch (err) {
    const yupError = err as yup.ValidationError;
    const errors: Record<string, string> = {}

    yupError.inner.forEach(error => {
      if(error.path ===  undefined) return;
      errors[error.path] = error.message
    });

    return res.status(StatusCodes.BAD_REQUEST).json({errors})
  }
console.log(req.body);

return res.json("Yes, Ohhhh Cadastrou !");
}