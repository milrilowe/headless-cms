import { useSession } from '@tanstack/react-start/server'
import { SessionUser } from '@/types'

export function useAppSession() {
    return useSession<SessionUser>({
        password: process.env.SESSION_SECRET || 'ChangeThisBeforeShippingToProdOrYouWillBeFired',
    })
}