"use client";
export type EventName = "session_start"|"intro_view"|"quiz_start"|"quiz_answer"|"quiz_complete"|"step_view"|"cta_click"|"form_start"|"form_field_blur"|"form_submit"|"funnel_complete"|"page_exit";
export type ABEvent = { variant: string; sessionId: string; ts: string; path: string; stepIndex: number; event: EventName; props: Record<string, unknown> };
const KEY = "ab_events_v1";
const getSessionId = () => { let id=sessionStorage.getItem("ab_session_id"); if(!id){id=crypto.randomUUID();sessionStorage.setItem("ab_session_id",id)} return id };
export function track(event: EventName, props: Record<string, unknown> = {}, stepIndex = 0) {
  if (typeof window === "undefined") return;
  const item: ABEvent={variant:process.env.NEXT_PUBLIC_VARIANT||"A",sessionId:getSessionId(),ts:new Date().toISOString(),path:location.pathname,stepIndex,event,props};
  try { const events:ABEvent[]=JSON.parse(localStorage.getItem(KEY)||"[]"); events.push(item); localStorage.setItem(KEY,JSON.stringify(events.slice(-1000))); } catch {}
  fetch("/api/track",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify(item),keepalive:true}).catch(()=>{});
  window.dispatchEvent(new Event("ab-event"));
}
export const readEvents = (): ABEvent[] => { try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]} };
export const clearEvents = () => { localStorage.removeItem(KEY); window.dispatchEvent(new Event("ab-event")); };
