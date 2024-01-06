import CardRepos, { Repos } from "@/components/CardRepos";
import Navigation from "@/components/Navigation";
import { Loader, Search } from "lucide-react";
import { NextSeo } from "next-seo";
import { useState } from "react";

export default function Repository() {
  const [loading, setLoading] = useState(false);
  const [queryRepo, setqueryRepo] = useState("");
  const [queryData, setQueryData] = useState([]);
  const [result, setResult] = useState(false);

  type ReposSearch = {
    items : []
    total_count : number
  }
  const handleReposSearch = async (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    setLoading(true);
    setResult(true);
    await fetch(`https://api.github.com/search/repositories?q=${queryRepo}&per_page=100`)
    .then((response)=>{
      if(!response.ok){
        throw new Error("Network problem");
      }
      return response.json();
    })
    .then((data:ReposSearch)=>{
      console.log(data);
      setQueryData(data.items);
    })
    .catch((error)=>{
      console.log(error);
    })
    setLoading(false);
    
  }
  return (
    <>
      <NextSeo
        title="Search repository"
        description="Search repos Page of GithubApi"
      />
      <Navigation />
      <main className='max-w-[700px] mx-auto px-2 pt-[90px]'>
        <section className="mt-5 max-w-xl mx-auto">
          <h1 className="font-extrabold text-2xl tracking-tight text-neutral-900 dark:text-neutral-50 mb-2">
            Repositories
          </h1>
          <p className="text-lg leading-6 text-neutral-900 dark:text-neutral-50 mb-3">
            Get repositories of a user. You can use the following parameters in the query parameter to get specific
            information.
          </p>
        </section>
        <section className="my-5 max-w-xl mx-auto">
          <form onSubmit={handleReposSearch}>
            <div className="flex flex-col gap-4 relative">
              <input value={queryRepo} onChange={(e)=>{setqueryRepo(e.target.value)}} type="text" className="px-2 py-3 placeholder:text-gray-500 dark:placeholder:text-neutral-400 bg-white dark:bg-neutral-800 rounded-lg border border-neutral-300 border-opacity-60" placeholder="Search an user here ..." />

              <button type="submit" role="button" className="absolute right-1.5 top-1.5 bottom-1.5 bg-sky-600 rounded-lg py-3 px-2 flex items-center justify-center gap-2 text-white hover:bg-sky-600/90 group border border-neutral-300 focus:outline focus:outline-neutral-400 active:scale-95 transition-all"><Search/><span className="scale-x-0 hidden origin-left group-hover:scale-x-100 group-hover:block transition-all">Search</span></button>
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
          <div className="flex flex-col gap-2">
            { queryData && queryData.map((item:Repos,index:number)=>(
              <>
                <CardRepos key={index} name={item.name} description={item.description} html_url={item.html_url} full_name={item.full_name} language={item.language} contributors={10}/>
              </>
            ))}
          </div>
        </section>
      </main>
    </>
  )
}
