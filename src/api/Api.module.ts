export const getApi = async () => {
  return import(/* webpackChunkName: "api" */ './Api.imports')
}
