export const runtime = "nodejs";

import { v2 } from "@google-cloud/dialogflow";
import {GoogleAuth} from 'google-auth-library'
import { NextResponse } from "next/server";
import {v4 as uuidV4} from 'uuid'

export async function POST(req: Request) {
  try {
    const contentType = req.headers.get("content-type") || "";

    // Auth to console.google
    const projectId = process.env.DIALOGFLOW_PROJECT_ID!;
    const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON!);

    const auth = new GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/cloud-platform']
    });
  
    const sessionClient = new v2.SessionsClient({ auth });

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("audio") as File;
      const sessionId = formData.get("sessionId") as string;

      if (!file) {
        return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
      }

      // Convert file to Buffer
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = Buffer.from(arrayBuffer);

      const sessionPath = sessionClient.projectAgentSessionPath(
        projectId,
        sessionId ?? uuidV4()
      );

      // @ts-ignore
      const [response] = await sessionClient.detectIntent({
        session: sessionPath,
        queryInput: {
          audioConfig: {
            // @ts-ignore
            audioEncoding: "AUDIO_ENCODING_WEBM_OPUS",
            sampleRateHertz: 48000,
            languageCode: "en-US",
          },
        },
        inputAudio: audioBuffer,
      });
      const result = response.queryResult;

      return NextResponse.json({
        reply: result?.fulfillmentText || "(no reply)",
        intent: result?.intent?.displayName || "Unknown",
        queryText: result.queryText ? `${result.queryText}  | ${Math.round(result.speechRecognitionConfidence*100)}%` : "(Not available)",
        result: result?.fulfillmentMessages
      });
    }

    const body = await req.json();
    const {message, sessionId} = body

    // ✅ Build session path (correct for @google-cloud/dialogflow)
    const sessionPath = sessionClient.projectAgentSessionPath(
      projectId,
      sessionId || uuidV4()
    );

    // Request body
    const request = {
      session: sessionPath,
      queryInput: {
        text: {
          text: message,
          languageCode: "en",
        },
      },
    };

    // Detect intent
    const [response] = await sessionClient.detectIntent(request);
    const result = response.queryResult;

    return NextResponse.json({
      reply: result?.fulfillmentText || "(no reply)",
      intent: result?.intent?.displayName || "Unknown",
      result: result?.fulfillmentMessages
    });
  } catch (error) {
    console.error("Dialogflow Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to Dialogflow." },
      { status: 500 }
    );
  }
}