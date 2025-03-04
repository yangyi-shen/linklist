import Link from "@/components/Link";
import { LinkData } from "@/utils/schemas"
import { useEffect, useState } from "react"

const Home: React.FC = () => {
    const [latestLinks, setLatestLinks] = useState<{ [key: string]: LinkData }>({});

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
                <h2 className="text-xl mb-2 font-semibold">Most recently added links:</h2>
                <ul className="list-disc ml-4">
                    {
                        Object.entries(latestLinks).map(([linkId, linkData]) => {
                            return (
                                <li key={linkId}>
                                    <Link linkData={linkData} />
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