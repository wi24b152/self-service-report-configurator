function MessageBox({ messages }) {
  if (!messages || messages.length === 0) {
    return null;
  }

  return (
    <div className="message-box">
      <strong>Hinweis:</strong>

      <div>
        {messages.map((message, index) => (
          <div key={index}>{message}</div>
        ))}
      </div>
    </div>
  );
}

export default MessageBox;