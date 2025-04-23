import { useSession } from '@tanstack/react-start/server'
import { ISessionUser } from '@/types'

export function useAppSession() {
    return useSession<ISessionUser>({
        password: process.env.SESSION_SECRET || 'ChangeThisBeforeShippingToProdOrYouWillBeFired',
    })
}