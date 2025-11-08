
const Privacy = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">🔒 Privacy Policy</h1>

      <p className="mb-4">
        This chatbot is an academic project created for university coursework. It
        is not intended for clinical or commercial use.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Data Collection</h2>
        <p>
          The chatbot temporarily processes user input to generate responses
          through the Dialogflow API, which may transmit data to Google Cloud
          servers.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">No Personal Data Storage</h2>
        <p>
          The project does not intentionally collect, store, or analyze personal
          information. Users are advised not to share personal or sensitive health
          details.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Third-Party Services</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>
            <span className="font-medium">Dialogflow (Google Cloud):</span>{" "}
            Processes and interprets user input to generate chatbot replies.
          </li>
          <li>
            <span className="font-medium">Vercel:</span> Hosts the web application
            and may collect standard analytics or access logs as part of normal web
            hosting operations.
          </li>
          <li>
            <span className="font-medium">Kaggle Dataset Use:</span> The medical
            dataset used to train or inform the chatbot comes from publicly
            available Kaggle sources and is used strictly for academic research and
            demonstration purposes.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Data Retention</h2>
        <p>
          User input is not permanently stored. Any temporary data exists only for
          the duration of the chat session.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Educational Use Only</h2>
        <p>
          Data processing and chatbot interactions are conducted solely for learning
          and assessment within the scope of this university project.
        </p>
      </section>

      <p className="mt-8 font-medium">
        By using this chatbot, you consent to this privacy policy and acknowledge
        the academic, non-commercial nature of the project.
      </p>
    </div>
  )
}

export default Privacy
