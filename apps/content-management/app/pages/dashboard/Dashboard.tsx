import { IUser } from "@/types"
import { UserDashboard } from "../user"

interface Props {
    user: IUser;
    isAdmin: boolean;
}

export function Dashboard({ user, isAdmin }: Props) {

    return (
        <>
            <UserDashboard user={user} sites={[]} />
        </>
    )
}