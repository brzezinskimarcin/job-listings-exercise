import { describe, expect, it, vi } from 'vitest';
import { useFetch } from '@/composables/fetch';

describe('@/composables/fetch.vue', () => {
  const mockFetch = (response: Response) => {
    window.fetch = vi.fn(() => new Promise((resolve) => {
      resolve(response);
    }));
  };

  it('toggles loading while executing the fetch', async () => {
    mockFetch(new Response(null));
    const { execute, loading } = useFetch({ url: 'test' });
    expect(loading.value).toBe(false);
    const request = execute();
    expect(loading.value).toBe(true);
    await request;
    expect(loading.value).toBe(false);
  });

  it('sets data after successful the fetch', async () => {
    mockFetch(new Response(JSON.stringify({ hello: 'world' })));
    const { execute, data } = useFetch({ url: 'test' });
    expect(data.value).toBeUndefined();
    await execute();
    expect(data.value).toEqual({ hello: 'world' });
  });

  it('maps data after successful the fetch if mapResponse option is passed', async () => {
    mockFetch(new Response(JSON.stringify({ hello: 'world' })));
    const { execute, data } = useFetch({ url: 'test', mapResponse: () => ({ mapped: 'world' })});
    expect(data.value).toBeUndefined();
    await execute();
    expect(data.value).toEqual({ mapped: 'world' });
  });

  it('does not set data after failing fetch', async () => {
    mockFetch(new Response(null, { status: 404, statusText: 'Not found' }));
    const { execute, data } = useFetch({ url: 'test' });
    expect(data.value).toBeUndefined();
    await execute();
    expect(data.value).toBeUndefined();
  });

  it('sets error after failing fetch', async () => {
    mockFetch(new Response(null, { status: 404, statusText: 'Not found' }));
    const { execute, error } = useFetch({ url: 'test' });
    expect(error.value).toBeUndefined();
    await execute();
    expect(error.value).toEqual(new Error('Not found'));
  });
});
