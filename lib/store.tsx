"use client";
import { createContext, useContext, useEffect, useState } from "react";
type State={started:boolean;answers:Record<string,number>;quizComplete:boolean;requestComplete:boolean};
const initial:State={started:false,answers:{},quizComplete:false,requestComplete:false};
type Store=State&{ready:boolean;start:()=>void;answer:(id:string,value:number)=>void;completeQuiz:()=>void;completeRequest:()=>void;reset:()=>void;hydrateDemo:()=>void};
const Context=createContext<Store|null>(null);
export function StoreProvider({children}:{children:React.ReactNode}){
 const [state,setState]=useState(initial); const [ready,setReady]=useState(false);
 useEffect(()=>{try{const saved=sessionStorage.getItem("stopbang_state");if(saved)setState(JSON.parse(saved))}finally{setReady(true)}},[]);
 useEffect(()=>{if(ready)sessionStorage.setItem("stopbang_state",JSON.stringify(state))},[state,ready]);
 const value:Store={...state,ready,start:()=>setState(s=>({...s,started:true})),answer:(id,value)=>setState(s=>({...s,answers:{...s.answers,[id]:value}})),completeQuiz:()=>setState(s=>({...s,quizComplete:true})),completeRequest:()=>setState(s=>({...s,requestComplete:true})),reset:()=>setState(initial),hydrateDemo:()=>setState({started:true,answers:{snoring:1,tired:1,observed:1,pressure:1,bmi:1,age:0,neck:0,gender:0},quizComplete:true,requestComplete:false})};
 return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useStore=()=>{const v=useContext(Context);if(!v)throw new Error("StoreProvider가 필요합니다");return v};
