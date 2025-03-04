import Link from "@/components/Link";
import { InitUserData, LinkListData, UserData } from "@/utils/schemas";
import { useEffect, useState } from "react";

const Personal: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);

    const userId = '-OK0Nnaz9EYruWntRA_d'; // temporary user id for testing

    async function fetchUserData() {
        const initUserData: InitUserData = await fetch(`http://localhost:6900/users/${userId}`)
            .then(response => response.json());

        let userLinkLists: { [key: string]: LinkListData } = await fetch(`http://localhost:6900/linklists/${userId}`)
            .then(response => response.json());

        async function populateUserLinkLists(userLinkLists: { [key: string]: LinkListData }) {
            const promises = Object.keys(userLinkLists).map(async (linkListId) => {
                const response = await fetch(`http://localhost:6900/links/${linkListId}`)
                    .then(response => response.json());

                userLinkLists[linkListId].links = response;
            });

            await Promise.all(promises);
            return userLinkLists;
        }

        userLinkLists = await populateUserLinkLists(userLinkLists);

        const userData: UserData = {
            ...initUserData,
            linkLists: {
                ...userLinkLists
            }
        }

        console.log(userData)

        setUserData(userData);
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <main>
            <div className="mb-4">
                <h1 className="text-xl font-semibold">Account details</h1>
                <p><span className="text-slate-500">Username:</span> {userData ? userData.name : 'loading...'}</p>
                <p><span className="text-slate-500">Password:</span> {userData ? userData.password : 'loading...'}</p>
            </div>
            <div>
                <h2 className="text-xl font-semibold">Your link lists:</h2>
                {
                    userData ?
                        Object.entries(userData.linkLists).map(([linkListId, linkListData]) =>
                            <div key={linkListId}>
                                <h2 className="font-semibold">{linkListData.name}</h2>
                                <ul className="list-disc ml-4">
                                    {
                                        Object.entries(linkListData.links).map(([linkId, linkData]) =>
                                            <li>
                                                <Link key={linkId} linkData={linkData} />
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        )
                        :
                        <p>loading...</p>
                }
                <ul className="list-disc ml-4">
                </ul>
            </div>
        </main>
    )
}

export default Personal;