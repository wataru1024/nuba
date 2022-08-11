import React from "react";
import { useState, useEffect } from "react";

export default function SendSheet (pps) {
    // console.log("totalling",pps.totallingData)
    let tnew = pps.totallingData
    let newObj = {}
    tnew.forEach(el => {
        newObj[el.orderedFoodName] = el.count
    });
    console.log("newObj",newObj)
    const url = "https://script.google.com/macros/s/AKfycbz1Ed2vUUKfw67iHD8sRK-cAnt3rC3OvBH0G6VV-cvAgMr4SVUZng9c_-0Vwd6UsI_f/exec";
    const App = () => {
        const [stars, setStars] = useState(0);
        useEffect(() => {
          fetch(url,{
                method: "POST",
                body:JSON.stringify({sumTotal:pps.sumTotal,totallingData:tnew})
            })
            .then((r) => r.json())
            .then((j) => {
                setStars(j.data)
                console.log(j)
            })
        }, [stars]);
        return <div>{stars}</div>;
      };
    
      App()
    return (<>


    </>)
}

//Next.jsで外部APIを叩く３つのパターン
//https://blog.narumium.net/2020/10/01/next-js%E3%81%A7%E5%A4%96%E9%83%A8api%E3%82%92%E5%8F%A9%E3%81%8F%EF%BC%93%E3%81%A4%E3%81%AE%E3%83%91%E3%82%BF%E3%83%BC%E3%83%B3/