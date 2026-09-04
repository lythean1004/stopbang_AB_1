"use client";
import { usePathname, useRouter } from "next/navigation";
import { BackIcon } from "./icons";
const steps:Record<string,number>={"/":1,"/result":2,"/low-risk":2,"/request":3,"/done":3};
export function AppShell({children}:{children:React.ReactNode}){const path=usePathname();const router=useRouter();const showBack=path!=="/"&&path!=="/done"&&path!=="/debug";return <div className="app-shell"><header><div className="header-inner">{showBack?<button className="icon-button" onClick={()=>router.back()} aria-label="이전 화면으로"><BackIcon/></button>:<span className="icon-space"/>}<span className="header-title">수면 건강 체크</span><span className="icon-space"/></div><div className="progress" aria-label={`3단계 중 ${steps[path]||1}단계`}><span style={{width:`${steps[path]===1?33:steps[path]===2?66:100}%`}}/></div></header><main>{children}</main>{path!=="/debug"&&<footer>본 페이지는 테스트용 목업이며, 의학적 진단이나 의료행위를 대체하지 않습니다.</footer>}</div>}
