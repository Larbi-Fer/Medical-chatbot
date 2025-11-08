
const Terms = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">📘 Terms of Use</h1>

      <p className="mb-6">
        By accessing or using this chatbot, you agree to the following terms:
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Academic Purpose</h2>
        <p>
          This chatbot was created as part of a university assignment for
          educational purposes and research into conversational AI.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">No Professional Advice</h2>
        <p>
          The chatbot’s responses are automatically generated and do not constitute
          medical, legal, or professional advice.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Responsible Use</h2>
        <p>
          Do not share personal identifiers, medical histories, or confidential
          information in your conversations.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Third-Party Processing</h2>
        <p>
          User input is processed via Dialogflow, a Google Cloud AI service, which
          may handle data according to Google’s privacy policy.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Dataset Limitation</h2>
        <p>
          The chatbot’s responses are informed by Kaggle datasets, which may contain
          inaccuracies and are not verified for medical reliability.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">No Warranties</h2>
        <p>
          The chatbot is provided “as is” without any warranties regarding accuracy,
          completeness, or suitability for any purpose.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Limitation of Liability</h2>
        <p>
          Neither the project creators nor the university shall be held liable for
          any decisions, actions, or outcomes resulting from the use of this
          chatbot.
        </p>
      </section>

      <p className="mt-8 font-medium">
        By using this site, you acknowledge that this is a student project and agree
        to use it responsibly and for educational purposes only.
      </p>
    </div>
  )
}

export default Terms
