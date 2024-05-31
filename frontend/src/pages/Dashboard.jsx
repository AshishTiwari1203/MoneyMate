import { useState } from "react"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"

export default function Users(){
    // Replace with backend call
    const [users, setUsers] = useState([{
        firstName: "Ashish",
        lastName: "Tiwari",
        _id: 1
    }]);

    return <>
        <div className="p-1 m-2">
            <Heading label="Users"/>
        </div>
        <div className="m-2">
            <input type="text" placeholder="Search Users..." className="w-full px-2 py-1 border rounded border-solid border-slate-200"></input>
        </div>
        <div>
            {users.map(user =><User user={user} />)}
        </div>
    </>
}

function User({user}) {
    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 m-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful m-2">
            <Button label={"Send Money💰"} />
        </div>
    </div>
}