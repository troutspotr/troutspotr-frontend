export const VERSION = 'v6'
export interface IApiConfig {
  apiRoot: string
  version: string
}
export const config = (): IApiConfig => {
  if (process.env.NODE_ENV === 'development') {
    return { apiRoot: '', version: VERSION }
  }

  if (process.env.NODE_ENV === 'test') {
    return { apiRoot: '/', version: VERSION }
  }

  return { apiRoot: '/', version: VERSION }
}
