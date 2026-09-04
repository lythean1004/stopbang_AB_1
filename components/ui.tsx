"use client";
import { motion, useReducedMotion } from "framer-motion";
export const Card=({children,className=""}:{children:React.ReactNode;className?:string})=><div className={`card ${className}`}>{children}</div>;
export function Button({children,secondary=false,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>&{secondary?:boolean}){return <button {...props} className={`${secondary?"button secondary":"button"} ${props.className||""}`}>{children}</button>}
export function PageMotion({children}:{children:React.ReactNode}){const reduced=useReducedMotion();return <motion.div initial={reduced?false:{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={reduced?{duration:0}:{duration:.22,ease:[.22,1,.36,1]}}>{children}</motion.div>}
export const Spinner=()=> <span className="spinner" aria-hidden="true"/>;
