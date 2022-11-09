import { QueryClient } from '@tanstack/react-query'

export default new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
      keepPreviousData: true,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 0,
    },
  },
})
