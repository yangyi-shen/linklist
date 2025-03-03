import { LinkData } from "@/utils/schemas"
import { useEffect, useState } from "react"

const Home: React.FC = () => {
    const [latestLinks, setLatestLinks] = useState<LinkData[]>([]);

    async function fetchLatestLinks() {
        const response = await fetch(`http://localhost:6900/links/latest`)
            .then(response => response.json())

        setLatestLinks(response);
    }

    useEffect(() => {
        fetchLatestLinks();
    }, [])

    return (
        <main>
            <div className="flex flex-col items-center mt-4 mb-8">
                <h1 className="text-4xl font-extrabold">Welcome to LinkList!</h1>
                <p className="text-slate-500">A greatly simplified remake of del.icio.us</p>
            </div>
            <div>
                <h2 className="text-2xl mb-2 font-extrabold">Most recently added links:</h2>
                <ul className="list-disc ml-4">
                    {
                        latestLinks.map((link, index) => {
                            return (
                                <li key={index}>
                                    <div>
                                        <p>{link.name}</p>
                                        <a className="font-light text-sm text-blue-500 hover:underline" href={link.url}>{link.url}</a>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </main>
    )
}

export default Home;