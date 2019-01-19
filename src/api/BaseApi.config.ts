export interface IApiConfig {
  apiRoot: string
  version: string
}
export const config = (): IApiConfig => {
  if (process.env.NODE_ENV === 'development') {
    return { apiRoot: '', version: 'v5' }
  }

  if (process.env.NODE_ENV === 'test') {
    return { apiRoot: '/', version: 'v5' }
  }

  return { apiRoot: '/', version: 'v5' }
}
