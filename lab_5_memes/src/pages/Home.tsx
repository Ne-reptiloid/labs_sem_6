import React, { useEffect, useState } from "react";
import MemeCard from "../components/Card";
import { getAllMemes } from "../api/memes";

interface Meme {
  url: string;
  name: string;
  id: string;
}

const Homepage = () => {
  const [data, setData] = useState<Meme[]>([]);

  useEffect(() => {
    getAllMemes().then((memes) => setData(memes.data.memes));
  }, []);

  return (
    <div className="row">
      {data.map((el) => (
        <MemeCard key={el.id} img={el.url} title={el.name} /> 
      ))}
    </div>
  );
};

export default Homepage;