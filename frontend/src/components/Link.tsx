import { LinkData } from "@/utils/schemas"

interface LinkProps {
    linkData: LinkData
}

const Link: React.FC<LinkProps> = ({ linkData }) => {
    return (
        <div>
            <p>{linkData.name}</p>
            <a className="font-light text-sm text-blue-500 hover:underline" href={linkData.url} target="_blank">{linkData.url}</a>
        </div>
    )
}

export default Link;