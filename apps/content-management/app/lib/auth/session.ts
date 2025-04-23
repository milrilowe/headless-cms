import { useSession } from '@tanstack/react-start/server'
import { ISession } from '@/types'

export function useAppSession() {
    return useSession<ISession>({
        password: process.env.SESSION_SECRET || 'ChangeThisBeforeShippingToProdOrYouWillBeFired',
    })
}