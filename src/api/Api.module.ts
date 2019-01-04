import { IApiModule } from './Api.imports'
export const getApi = async (): Promise<IApiModule> => {
  const mod = await import(/* webpackChunkName: "api" */ './Api.imports')
  return mod as IApiModule
}
