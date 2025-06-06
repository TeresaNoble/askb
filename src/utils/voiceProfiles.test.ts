import { describe, it, expect } from 'vitest';
import { buildInstructions, UserProfile } from './voiceProfiles';

describe('buildInstructions', () => {
  it('Ultra-direct mode returns only the ultra-direct instructions', () => {
    const profile: UserProfile = {
      communicationStyle: 'Direct',
      contentFormat: 'Quick Summary',
      generation: 'Gen Z (b.1997–2012)',
      length: 'Short',
      toneFlair: 'Nip',
      ultraDirect: true,
    };

    const result = buildInstructions(profile);
    expect(result).toContain('Ultra-Direct Mode is ON.');
    expect(result).not.toContain('Blaze Mode — Executive edition.');
    expect(result).not.toContain('## Core Tone Rules');
  });

  it('Blaze + Professional/Direct profiles return the Blaze-specific section', () => {
    const profile: UserProfile = {
      communicationStyle: 'Professional',
      contentFormat: 'Quick Summary',
      generation: 'Gen Z (b.1997–2012)',
      length: 'Short',
      toneFlair: 'Blaze',
      ultraDirect: false,
    };

    const result = buildInstructions(profile);
    expect(result.startsWith('Blaze Mode — Executive edition.')).toBe(true);
    expect(result).not.toContain('## Core Tone Rules');
    expect(result).not.toContain('Ultra-Direct Mode is ON.');
  });
});
