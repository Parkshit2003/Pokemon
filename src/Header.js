import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Items from "./Items";

function Header() {
const [results, setresults] = useState([]);

const fetchdata = async () => {
  const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=20");
  const jsondata = await response.json();
  console.log(jsondata);
  setresults(jsondata.results);
};

useEffect(() => {
  fetchdata();
},[]);
console.log(results)
return (
  <div className="main">
       <div className='container'>
            {results.map((Item,index)=>(
                <Item key={index} name={Item.name} link={Item.url}/>
                // img ={item.urlToImage} url = {item.url}/>
            ))}
        </div>
  </div>
);
}

export default Header;