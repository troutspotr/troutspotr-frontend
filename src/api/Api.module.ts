import { IApiModule } from './Api.imports'
// tslint:disable-next-line:no-any
export const getApi = async (): Promise<IApiModule> => {
  const mod = await import(/* webpackChunkName: "api" */ './Api.imports')
  return mod
}
