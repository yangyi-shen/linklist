import Link from "@/components/Link";
import { InitUserData, LinkData, LinkListData, UserData } from "@/utils/schemas";
import { FormEvent, useEffect, useRef, useState } from "react";

const Personal: React.FC = () => {
    const [userData, setUserData] = useState<UserData | null>(null);

    const newLinkLinkList = useRef<HTMLSelectElement>(null);
    const newLinkNameRef = useRef<HTMLInputElement>(null);
    const newLinkUrlRef = useRef<HTMLInputElement>(null);

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

    async function createNewLink() {
        if (!newLinkLinkList.current || !newLinkNameRef.current || !newLinkUrlRef.current) {
            return;
        }

        const newLinkData: LinkData = {
            userId: userId,
            linkListId: newLinkLinkList.current.value,
            name: newLinkNameRef.current.value,
            url: newLinkUrlRef.current.value,
        }

        await fetch(`http://localhost:6900/links`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newLinkData),
        })
    }

    useEffect(() => {
        fetchUserData();
    }, [])

    async function handleNewLinkSubmit(event: FormEvent) {
        event.preventDefault();

        if (!newLinkLinkList.current || !newLinkNameRef.current || !newLinkUrlRef.current) {
            return;
        }

        await createNewLink();

        newLinkNameRef.current.value = '';
        newLinkUrlRef.current.value = '';
    }

    return (
        <main>
            <div className="mb-4">
                <p className="text-xl font-semibold">Account details</p>
                <p><span className="text-slate-500">Username:</span> {userData ? userData.name : 'loading...'}</p>
                <p><span className="text-slate-500">Password:</span> {userData ? userData.password : 'loading...'}</p>
            </div>
            <div className="mb-4">
                <p className="text-xl font-semibold mb-2">Create a new link</p>
                {
                    userData ?
                        <form onSubmit={handleNewLinkSubmit} className="lg:w-sm grid grid-cols-2 lg:grid-cols-1 gap-2">
                            <select ref={newLinkLinkList} className="lg:col-span-1 col-span-2 bg-slate-300 font-medium rounded-sm text-sm p-1" required>
                                {
                                    Object.entries(userData.linkLists).map(([linkListId, linkListData]) =>
                                        <option key={linkListId} value={linkListId}>{linkListData.name}</option>
                                    )
                                }
                            </select>
                            <input ref={newLinkNameRef} className="border-1 border-slate-300 rounded-sm text-sm p-1" type="text" placeholder="Nut shots compilation" required />
                            <input ref={newLinkUrlRef} className="border-1 border-slate-300 rounded-sm text-sm p-1" type="url" placeholder="https://www.youtube.com/watch?v=kN-6KiWl260" required />
                            <button type="submit" className="lg:col-span-1 col-span-2 bg-slate-300 font-semibold rounded-sm text-sm p-0.5">Create new link</button>
                        </form>
                        :
                        <p>loading...</p>
                }
            </div>
            <div>
                <p className="text-xl font-semibold">Your link lists:</p>
                {
                    userData ?
                        Object.entries(userData.linkLists).map(([linkListId, linkListData]) =>
                            <div key={linkListId}>
                                <h2 className="font-semibold">{linkListData.name}</h2>
                                <ul className="list-disc ml-4">
                                    {
                                        Object.entries(linkListData.links).map(([linkId, linkData]) =>
                                            <li key={linkId}>
                                                <Link linkData={linkData} />
                                            </li>
                                        )
                                    }
                                </ul>
                            </div>
                        )
                        :
                        <p>loading...</p>
                }
            </div>
        </main>
    )
}

export default Personal;