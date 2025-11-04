import { v4 as uuid_v4 } from 'uuid'
import { useEffect, useRef } from "react"

export const useSession = () => {
  const session = useRef<string>(null);

  useEffect(() => {
    let sid = localStorage.getItem('sessionId');
    
    if (!sid) {
      sid = uuid_v4()
      localStorage.setItem('sessionId', sid)
    }
    
    session.current = sid
  }, [])
  
  
  return session.current
}