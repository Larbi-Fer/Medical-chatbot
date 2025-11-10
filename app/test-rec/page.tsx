'use client'
import { useAudioRecorder } from "@/lib/useAudioRecorder";
import React from "react";

export default function AudioRecorderDemo() {
  const {
    startRecording,
    stopRecording,
    togglePauseResume,
    recordingBlob,
    isRecording,
    isPaused,
    recordingTime,
  } = useAudioRecorder();

  return (
    <div style={{ fontFamily: "sans-serif", color: 'white' }}>
      <h2>🎙️ Audio Recorder</h2>
      <p>Time: {recordingTime}s</p>
      <button onClick={startRecording} disabled={isRecording}>
        Start
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        Stop
      </button>
      <button onClick={togglePauseResume} disabled={!isRecording}>
        {isPaused ? "Resume" : "Pause"}
      </button>

      {recordingBlob && (
        <div>
          <h4>Playback:</h4>
          <audio controls src={URL.createObjectURL(recordingBlob)} />
        </div>
      )}
    </div>
  );
}
