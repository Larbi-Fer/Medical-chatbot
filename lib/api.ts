export const sendMsg = async(message: string | FormData, sessionId: string) => {
  let response: Response;

  if (typeof message === "string") {
    // 🟢 Handle TEXT message
    response = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        sessionId,
      }),
    });
  } else {
    // 🟣 Handle AUDIO message (FormData)
    message.append("sessionId", sessionId);

    response = await fetch("/api/chat", {
      method: "POST",
      body: message, // no headers, browser sets multipart boundary automatically
    });
  }

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`);
  }

  const data = await response.json();
  return data as Message;
}