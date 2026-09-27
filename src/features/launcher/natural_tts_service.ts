/**
 * natural_tts_service.ts
 *
 * Lightweight, natural female voice synthesizer using:
 * 1. Web Speech Synthesis with high-quality natural female voice prioritization
 *    (e.g., Google US English Female, Samantha, Microsoft Jenny/Aria/Zira, Victoria)
 * 2. Natural female acoustic pitch and rate shaping
 * 3. Graceful fallback with zero external API key requirements (free, no token waste)
 */

export class NaturalTtsService {
  private static cachedVoice: SpeechSynthesisVoice | null = null;
  private static isInitialized = false;

  private static getBestFemaleVoice(): SpeechSynthesisVoice | null {
    if (typeof window === 'undefined' || !window.speechSynthesis) return null;
    const voices = window.speechSynthesis.getVoices();
    if (!voices || voices.length === 0) return null;

    // Prioritized list of high-quality natural female voices across Chrome, Edge, Safari, and Windows/Mac
    const preferredFemaleNames = [
      'Google US English',
      'Microsoft Jenny Online (Natural) - English (United States)',
      'Microsoft Aria Online (Natural) - English (United States)',
      'Samantha',
      'Microsoft Zira - English (United States)',
      'Victoria',
      'Karen',
      'Moira',
      'Tessa',
      'Fiona'
    ];

    for (const name of preferredFemaleNames) {
      const match = voices.find(v => v.name.toLowerCase().includes(name.toLowerCase()));
      if (match) return match;
    }

    // Fallback: search for any voice labeled with "female" or "natural" in English
    const genericFemale = voices.find(
      v => v.lang.startsWith('en') && (v.name.toLowerCase().includes('female') || v.name.toLowerCase().includes('natural'))
    );
    if (genericFemale) return genericFemale;

    // Fallback to first English voice
    return voices.find(v => v.lang.startsWith('en')) || voices[0] || null;
  }

  static speak(text: string, onEnd?: () => void): void {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;

    // Cancel any running speech to avoid overlapping/stuck audio
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voice = this.getBestFemaleVoice();
    if (voice) {
      utterance.voice = voice;
    }

    // Natural, soothing acoustic tuning (slightly higher pitch, smooth warm rate)
    utterance.pitch = 1.15;
    utterance.rate = 1.02;
    utterance.volume = 0.95;

    if (onEnd) {
      utterance.onend = onEnd;
      utterance.onerror = onEnd;
    }

    window.speechSynthesis.speak(utterance);
  }

  static stop(): void {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
  }
}
