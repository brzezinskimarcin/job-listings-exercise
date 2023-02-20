import { ref } from 'vue';

interface FetchOptions<T, U> {
  url: string;
  mapResponse?: (res: T) => U;
}

export function useFetch<T, U = T>(options: FetchOptions<T, U>) {
  const { url, mapResponse } = options;
  const loading = ref(false);
  const error = ref<Error>();
  const data = ref<U>();

  async function execute() {
    try {
      loading.value = true;
      const response = await fetch(`api/${url}`);
      if (response.ok) {
        const responseData = await response.json();
        data.value = mapResponse ? mapResponse(responseData) : responseData;
      } else {
        throw new Error(response.statusText);
      }
    } catch (err) {
      if (err instanceof Error) {
        error.value = err;
      }
    } finally {
      loading.value = false;
    }
  }

  return { execute, data, loading, error };
}
