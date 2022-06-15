import { ResponseError } from '../types/ResponseError';

export const mapErrors = (error: ResponseError) => (Array.isArray(error.message)
  ? error.message.reduce((acc, message) => ({ ...acc, [message.name]: message.message }), {})
  : {});
