import { describe, it, expect } from 'vitest';

describe('N8N Webhook Configuration', () => {
  it('should have a valid N8N webhook URL configured', () => {
    const webhookUrl = process.env.VITE_N8N_WEBHOOK_URL;
    
    // Check if the environment variable exists
    expect(webhookUrl).toBeDefined();
    expect(webhookUrl).not.toBe('');
    
    // Check if it's a valid URL structure
    // We don't make an actual network call to avoid side effects in tests
    // but we validate the format
    try {
      const url = new URL(webhookUrl as string);
      expect(url.protocol).toMatch(/^https?:$/);
    } catch (e) {
      throw new Error(`Invalid URL format: ${webhookUrl}`);
    }
  });
});
