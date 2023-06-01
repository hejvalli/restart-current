
import React  from "react";
import VideoStream from "../components/videostream";
import LogicHandlerLevent from "../components/logicHandler";
import Layout from "../components/layout";


export default function Levent() {
  return (
      <div>
        <LogicHandlerLevent/>
        <VideoStream/>
        <h1>          hello    </h1>
     </div>
    );
}