import type { Metadata, Viewport } from "next"; import "./globals.css"; import { StoreProvider } from "@/lib/store"; import { AppShell } from "@/components/AppShell";
export const metadata:Metadata={title:"수면 건강 체크",description:"STOP-BANG 문항으로 수면 무호흡 위험도를 확인하는 테스트용 목업입니다.",robots:{index:false,follow:false}};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#FFFFFF",colorScheme:"light"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="ko"><body><StoreProvider><AppShell>{children}</AppShell></StoreProvider></body></html>}
