import CardUser from "@/components/CardUser";
import Navigation from "@/components/Navigation";
import { Code, Loader, Search } from "lucide-react";
import { NextSeo } from "next-seo";
import Link from "next/link";
import { User } from "@/components/CardUser";
import CardRepos, { Repos } from "@/components/CardRepos";
import { useRef, useState } from "react";

export default function Organizations() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(false);
  const [orgs, setOrgs] = useState("");
  const [orgdata, setOrgdata] = useState<User>();
  const [orgRepos, setOrgRepos] = useState([]);
  const [filteredText, setFilteredText] = useState<string>("");
  const message = useRef<HTMLParagraphElement>(null);

  const handleUserSearch = async(e:React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setResult(true);
      await fetch(`https://api.github.com/orgs/${orgs}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((response)=>{
        if(!response.ok){
          message.current?.innerHTML ?? "Network problem";
        }
        return response.json();
      }).then((data)=>{
        setTimeout(() => {
          setOrgdata(data);
        }, 1000);
      }).catch((error)=>{
        console.error(error);
        message.current?.innerHTML ?? "Error : " + error;
        return null;
      })
      await fetch(`https://api.github.com/orgs/${orgs}/repos`,{
        method : "GET",
      }).then((response)=>{
        if(!response.ok){
          message.current?.innerHTML ?? "Network problem"
        }
        return response.json()
      }).then((data)=>{
        setTimeout(() => {
          setOrgRepos(data);
        }, 1000);
      }).catch((error)=>{
        console.error(error);
      })
      setLoading(false)
  }
  return (
    <>
      <NextSeo
        title="Search Organizations"
        description="Search organizations Page of GithubApi"
      />
      <Navigation />
      <main className='max-w-[700px] mx-auto px-2 pt-[90px]'>
        <section className="mt-5 max-w-xl mx-auto">
          <h1 className="font-extrabold text-2xl tracking-tight text-neutral-900 dark:text-neutral-50 mb-2">
            Organizations
          </h1>
          <p className="text-lg leading-6 text-neutral-900 dark:text-neutral-50 mb-3">
            Get information about an entreprise. You can use the following parameters in the query parameter to get specific
            information.
          </p>
        </section>
        <section className="my-5 max-w-xl mx-auto">
          <form onSubmit={handleUserSearch}>
            <div className="flex flex-col gap-4 relative">
              <input type="text" className="px-2 py-3 placeholder:text-gray-500 dark:placeholder:text-neutral-400 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 border-opacity-60" placeholder="Search an organization here ..." value={orgs} onChange={(e)=>{setOrgs(e.target.value)}} required/>
              <button type="submit" role="button" className="absolute right-1.5 top-1.5 bottom-1.5 bg-sky-600 rounded-lg py-3 px-2 flex items-center justify-center gap-2 text-white hover:bg-sky-600/90 group border border-neutral-300 focus:outline focus:outline-neutral-400 active:scale-95 transition-all"><Search/><span className="scale-x-0 hidden origin-left group-hover:scale-x-100 group-hover:block transition-all">Search</span></button>
            </div>
            <div className="my-4">
              <p ref={message} className="text-sm"></p>
            </div>
          </form>
        </section>
        <section className={`my-8 max-w-xl mx-auto ${result ? "block" : "hidden"}`}>
          <h1 className="font-extrabold text-2xl tracking-tight text-neutral-900 dark:text-neutral-50 mb-3">
            Results
          </h1>
          {loading ?
            <Loader className="animate-spin"/>
            : null
          }
            { orgdata && 
              <CardUser url={orgdata.url} login={orgdata.login} name={orgdata.name} avatar_url={orgdata.avatar_url} html_url={orgdata.html_url} bio={orgdata.bio} public_repos={orgdata.public_repos} followers={orgdata.followers} following={orgdata.following} location={orgdata.location} repos_url=""/>
            }

          <h2 className="font-extrabold text-2xl tracking-tight text-neutral-900 dark:text-neutral-50 my-3 border-b">Repositories</h2>
          <div className="flex flex-col gap-2 px-2">
            <div className="flex gap-2 w-full">
              <input value={filteredText} onChange={(e)=>{setFilteredText(e.target.value)}} type="text" className="px-2 py-2 placeholder:text-gray-500 dark:placeholder:text-neutral-400 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 border-opacity-60 w-full my-2" placeholder="Search a repository"/>
            </div>
            
            {orgRepos && (orgRepos.filter((repos:Repos)=>repos.full_name.toLowerCase().includes(filteredText.toLowerCase()))).map((item:Repos)=>(
              <>
                <CardRepos key={item.name} name={item.name} description={item.description} html_url={item.html_url} full_name={item.full_name} language={item.language} contributors={10}/>
              </>
            ))}
          </div>
          
        </section>
      </main>
    </>
  )
}

