import * as React from 'react'
import axios, { AxiosError } from 'axios'

export const useLoading = (): [boolean, (aPromise: Promise<any>) => any] => {
  const [isLoading, setState] = React.useState<boolean>(false)
  const mount = React.useRef(false)

  React.useEffect(() => {
    mount.current = true
    return () => {
      mount.current = false
    }
  }, [])

  const load = async (aPromise: Promise<any>): Promise<any> => {
    setState(true)
    return await aPromise.finally(() => {
      if (mount.current) {
        setState(false)
      }
    })
  }
  return [isLoading, load]
}

export interface APIPost<R, P> {
  response?: R
  error?: HttpError
  posting: boolean
  posted: boolean
  lastPosted: P
  post: (data?: P, headers?: any) => void
  reset: () => void
}

export class HttpError extends Error {
  code: number
  payload?: any

  // @ts-ignore
  constructor(code: number, payload?: any) {
    super()
    this.name = 'HttpError'
    this.code = code
    this.payload = payload
  }
}

export const useAPIPost = <R, P>(
  endpoint: string,
  getToken?: () => Promise<string>
): APIPost<R, P> => {
  const [response, setResponse] = React.useState<R>()
  const [error, setError] = React.useState<HttpError>()
  const [posted, setPosted] = React.useState(false)
  const [lastPosted, setLastPosted] = React.useState<P>(null)

  const [posting, loadingPost] = useLoading()

  const handleError = (error: AxiosError): void => {
    setResponse(null)
    if (error.response) {
      const data = error.response.data
      setError(new HttpError(error.response.status, data))
    } else {
      setError(new HttpError(500, { error: error.message }))
    }
  }

  const post = async (data?: P, headers?: any): Promise<void> => {
    try {
      setLastPosted(data)
      const token = getToken ? await getToken() : null
      const response = await loadingPost(
        axios.post<R>(endpoint, data, {
          ...(token && { Authorization: `Bearer ${token}` }),
          ...headers
        })
      )

      setResponse(response.data)
      setError(null)
      setPosted(true)
    } catch (ex) {
      handleError(ex)
    }
  }

  const reset = (): void => {
    setLastPosted(null)
    setResponse(undefined)
    setError(undefined)
    setPosted(false)
  }

  return {
    posted,
    response,
    error,
    posting,
    lastPosted,
    post,
    reset
  }
}

export type Fetcher<R> = (path: string) => Promise<R>

export function secureLoader<R>(apiUrl?: string, getToken?: () => Promise<string>): Fetcher<R> {
  return async (path: string): Promise<R> => {
    const token = getToken ? await getToken() : null
    const response = await axios.get<R>(`${apiUrl || ''}${path}`, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` })
      }
    })
    return response.data
  }
}
