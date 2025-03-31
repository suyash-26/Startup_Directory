import StartupCard from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const query = (await searchParams).query;
  const posts = [
    {
      _createdAt: new Date(),
      views: 55,
      author: {_id:1,name:"Sushi"},
      description:"this is description",
      image:"https://tse2.mm.bing.net/th?id=OIP.7cRYFyLoDEDh4sRtM73vvwHaDg&pid=Api&P=0&h=180",
      category:"Robots",
      title: "My robots",
    }
  ]
  return (
    <>
      <section className="pink_container">
        <h1 className="heading">
          Pitch Your Startup, <br />
          Connect With Entreprenuers
        </h1>
        <p className="sub-heading !max-w-3xl">
          Submit ideas,Vote on pitches and Get noticed on virtual startup world.
        </p>
        <SearchForm query={query} />
      </section>
      <section className="section_container">
        <p className="text-30-semibold">
          {query?`Search Results for ${query}: `:"All Startups"}
        </p>
        <ul className="mt-7 card_grid">
          {
            posts?.length ? (
              posts.map((post:StartupCardType,index:number)=>{
                return <StartupCard key={post._id} post={post} />
              })
            ):(
              <p className="no-results">No Startups found</p>
            )
          }
        </ul>
      </section>
    </>
  );
}
