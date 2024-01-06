import { AppProps } from "next/app";
import Image from "next/image";
import Link from "next/link";
export type User = {
    login: string,
    avatar_url : string,
    url : string,
    html_url : string,
    name : string,
    bio : string | undefined,
    public_repos : number,
    followers : number,
    following : number,
    location : string,
    repos_url : string
}
export default function CardUser(props:User) {
    const {login, avatar_url, html_url, name, bio, public_repos, followers, following, location, repos_url} = props;
  return (
    <div className="flex items-start gap-3">
        <Image src={avatar_url} alt={`${login}'s picture`} className="w-[200px] h-[202px] rounded-lg contrast-100" width={1400} height={1200}/>
        <div className="flex flex-col gap-2">
            <Link href={html_url} className="hover:text-sky-600 w-fit">
                <h1 className="text-xl font-bold">{name}</h1>
            </Link>
            <h3 className="text-neutral-500 dark:text-neutral-500">{login}</h3>
            <h2 className="text-sm line-clamp-2" title={bio}>{bio}</h2>
            <p>Repos number : <span className="text-sky-600">{public_repos}</span></p>
            <div className="flex gap-2">
                <p>{followers} followers</p>
                |
                <p>{following} following</p>
            </div>
            <p className="text-sm text-sky-600">{location}</p>
        </div>
    </div>
  )
}
