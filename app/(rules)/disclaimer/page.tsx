
const Disclaimer = () => {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-200">
      <h1 className="text-3xl font-bold mb-6 text-center">🩺 Medical Disclaimer</h1>

      <p className="mb-4">
        This chatbot is part of a university project developed for educational and
        research purposes only.
      </p>

      <section className="mb-6">
        <p>
          The system uses Google Dialogflow as a conversational AI platform and
          incorporates information derived from publicly available medical datasets
          on Kaggle.
        </p>
      </section>

      <section className="mb-6">
        <p>
          The chatbot is not a licensed medical professional and should not be
          relied upon for diagnosis, treatment, or professional medical advice.
          Responses are automatically generated based on training data and may be
          inaccurate, incomplete, or outdated.
        </p>
      </section>

      <section className="mb-6">
        <p className="font-medium">
          Always consult a qualified healthcare provider regarding any questions you
          may have about a medical condition or treatment.
        </p>
      </section>

      <section className="mb-6">
        <p className="font-medium text-red-600">
          If you are experiencing a medical emergency, contact your local emergency
          services immediately.
        </p>
      </section>

      <p className="mt-8">
        The developers and the university assume no responsibility or liability for
        any actions taken based on the chatbot’s responses.
      </p>
    </div>
  )
}

export default Disclaimer
