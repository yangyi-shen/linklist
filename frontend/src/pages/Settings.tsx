import { useEffect, useState } from "react";

import { InitUserData, LinkListData, UserData } from "@/utils/schemas";

const Settings: React.FC = () => {
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

        setUserData(userData);
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    return (
        <main>
            <div className="mb-4">
                <p className="text-xl font-semibold">Account details</p>
                <p><span className="text-slate-500">Username:</span> {userData ? userData.name : 'loading...'}</p>
                <p><span className="text-slate-500">Password:</span> {userData ? userData.password : 'loading...'}</p>
            </div>
            <div className="mb-4">
                <p className="text-xl font-semibold">Statistics</p>
                <p><span className="text-slate-500">Link lists created:</span> {userData ? Object.keys(userData.linkLists).length : 'loading...'}</p>
            </div>
        </main>
    )
}

export default Settings;