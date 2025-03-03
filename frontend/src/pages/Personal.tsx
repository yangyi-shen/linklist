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
            <h1>Personal Page</h1>
        </main>
    )
}

export default Personal;