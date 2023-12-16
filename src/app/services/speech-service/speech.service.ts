import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SpeechService {

  // recognition: SpeechRecognition;

  // constructor() {
  //   this.recognition = new SpeechRecognition();
  //   this.recognition.continuous = true;
  //   this.recognition.lang = 'en-US';
  //   this.recognition.interimResults = true;
  //   this.recognition.maxAlternatives = 1;
  // }

  // startRecognition(): void {
  //   this.recognition.start();
  // }

  // stopRecognition(): void {
  //   this.recognition.stop();
  // }

  // onResult(callback: (event: SpeechRecognitionEvent) => void): void {
  //   this.recognition.onresult = callback;
  // }
}
