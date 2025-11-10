import { sendMsg } from '@/lib/api';
import { v4 as uuid_v4 } from 'uuid'
import { RefObject } from 'react';
import { create } from 'zustand';

type MsgProps = { id: number; message: string; sender: 'user'; audio?: Blob } | { id: number; message: Message; sender: 'bot'; };

interface MyStore {
  messages: MsgProps[];
  input: string;
  loading: boolean;
  objectRef: RefObject<HTMLDivElement | null>;
  sessionId?: string,
  setObjectRef: (ref: RefObject<HTMLDivElement | null>) => void;
  setInput: (input: string) => void;
  setMessages: (messages: MsgProps[]) => void;
  setLoading: (loading: boolean) => void;
  sendMessage: (e: React.FormEvent, msg?: string) => void;
  scrollButtom: () => void;
  sendMsg: (msg: string, sessionId: string) => Promise<Message>;
  loadSession: () => void;
}

export const useMessage = create<MyStore>((set, get) => ({
  messages: [],
  input: '',
  loading: false,
  setInput: (input) => set({ input }),
  setMessages: (messages) => set({ messages }),
  objectRef: { current: null },
  setObjectRef: (ref) => set({ objectRef: ref }), 
  setLoading: (loading) => set({ loading }),

  sendMessage: async (e, msg) => {
    e.preventDefault();
    const { input, messages, setMessages, setInput, setLoading, scrollButtom, sendMsg, sessionId } = get();

    if (!msg && !input.trim()) return;

    const newMsgId = Date.now();
    const newMessage: MsgProps = { sender: 'user', message: msg || input, id: newMsgId };

    // Update local message state with new user message
    setMessages([...messages, newMessage]);
    setInput('');

    scrollButtom();

    // Submit the message and handle response from bot
    try {
      setLoading(true);

      const data: any = await sendMsg(msg || input, sessionId!);

      setMessages([
        ...messages,
        newMessage,
        { message: data, id: Date.now(), sender: 'bot' },
      ]);
      setLoading(false);
      scrollButtom();
    } catch (error) {
      console.error('Error sending message:', error);
      setLoading(false);
    }
  },

  sendMsg: async (message, sessionId) => {
    return await sendMsg(message, sessionId);
  },

  scrollButtom: () => {
    const {objectRef} = get()
    
    setTimeout(() => objectRef.current?.scroll({ behavior: 'smooth', top: objectRef.current.scrollHeight }), 150)
  },

  loadSession: () => {
    let sessionId = localStorage.getItem('sessionId');
    
    if (!sessionId) {
      sessionId = uuid_v4()
      localStorage.setItem('sessionId', sessionId)
    }
    
    set({ sessionId })

  }
}));