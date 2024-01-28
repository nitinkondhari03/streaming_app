"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [videodata, setVideodata] = useState([]);
  const [searchinvideo, setsearchinvideo] = useState("");
  const router = useRouter();
  useEffect(() => {
    mostpopular();
  }, []);

  // Default videos
  const mostpopular = async () => {
    let url =
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=60";
    try {
      let res = await fetch(`${url}&key=${process.env.NEXT_PUBLIC_API_KEY}`);
      let data = await res.json();
      let most = data.items;
      setVideodata(most);
    } catch (err) {
      console.log("err:", err);
    }
  };

  // Serching Video
  const handleSubmit = async (event) => {
    event.preventDefault();
    setVideodata([]);
    let searchurl =
      "https://youtube.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=20";
    try {
      let res = await fetch(
        `${searchurl}&q=${searchinvideo}&key=${process.env.NEXT_PUBLIC_API_KEY}`
      );

      let data = await res.json();
      let serchin_data = data.items;
      setVideodata(serchin_data);
      
      setsearchinvideo("");
    } catch (err) {
      console.log("err:", err);
    }
  };
  return (
    <div>
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-lg">
          <form
            className="mt-5 sm:flex sm:items-center"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              value={searchinvideo}
              onChange={(e) => setsearchinvideo(e.target.value)}
              placeholder="search videos ...."
              className="inline w-full rounded-md border border-gray-300 bg-white py-2 pl-3 pr-3 leading-5 placeholder-gray-500 focus:border-indigo-500 focus:placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
            />
            <button
              type="submit"
              className="mt-3 inline-flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 w-5/6 m-auto md:grid-cols-2 lg:grid-cols-4">
        {videodata &&
          videodata.map((el) => (
            <div key={el.id} onClick={() => router.push(`videoplay/${el.id.videoId || el.id}`)}>
              <img src={el.snippet.thumbnails.high.url} />
              <h4 className="text-black-600/100">{el.snippet.title}</h4>
            </div>
          ))}
      </div>
    </div>
  );
}
