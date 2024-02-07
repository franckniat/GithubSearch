import Link from "next/link";

export type Repos = {
    name: string
    description: string
    html_url: string
    full_name : string
    language : string
    contributors : number
}
export default function CardRepos(props:Repos) {
  return (
    <div className="flex gap-2 flex-col border-b border-neutral-400 py-2">
        <Link href={props.html_url ? props.html_url : ""}>
            <h1 className="text-xl hover:text-sky-600 font-bold">{props.name}</h1>
        </Link>
        <h3 className="text-neutral-600 dark:text-neutral-500">{props.full_name}</h3>
        <p className="text-sm line-clamp-2" title={props.description}>{props.description}</p>
        <p className="text-sky-600 font-bold">{props.language}</p>
    </div>
  )
}
