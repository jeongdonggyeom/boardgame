import React from "react";
import Weather from "../weather.json";

export default function navbar(){
    console.log(Weather.response.body.dataType);
    return(
        <h1>HI</h1>
    )
}