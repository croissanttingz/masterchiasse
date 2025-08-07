import { toast } from 'sonner'

export const onError = (error: any) => {
  const message = error?.data?.message ?? error?.message ?? 'Something went wrong'

  toast.error(message)
}
