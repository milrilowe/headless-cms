import { createFileRoute, Outlet, redirect, useRouter } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
    beforeLoad: ({ context }) => {
        console.log(context)
        if (!context.user) {
            throw redirect({ to: "/login" })
        }
    }
})