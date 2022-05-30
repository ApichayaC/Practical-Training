import React, { useState ,useRef, useEffect} from "react"
import dynamic from "next/dynamic";
import axios from "axios";
const ChartCreate = dynamic(() => import('../components/createChart'), {
    ssr: false
});

export default function Chart() {
    return (
    <div>
        <ChartCreate/>
    </div>
    )
}