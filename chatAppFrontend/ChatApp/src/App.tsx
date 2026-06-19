import { useEffect, useState } from "react"

function App() {

  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() =>{
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event)=>{
      setMessages((prevMessages) => [...prevMessages, event.data]);//Add new message to the message array
    }
  })

  return (
    <div className="h-screen flex flex-col">
      <div className="h-16 bg-gray-800 flex items-center justify-center text-white font-bold text-2xl">Whatsapp</div>
      <div className="flex-1 overflow-y-auto bg-amber-200">
        {messages.map(message => (
          <div className="p-4 mb-3 mt-3 rounded-r-lg bg-gray-800 text-white">{message}</div>
        ))}
      </div>
      <div className="h-16 bg-gray-800 flex justify-center">
        <input type="text" className="flex-1 bg-amber-50 rounded-2xl border-green-600 p-4 m-4 mr-2" placeholder="Type a message..." />
        <button className="rounded-full mr-4 mt-4 mb-4 items-center bg-green-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-8 text-white p-2">
            <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default App
