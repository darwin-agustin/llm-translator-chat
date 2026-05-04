const API_BASE_URL = 'http://localhost:8080/v1';

export const translateText = async (text: string, targetLanguage: string) => {
  const response = await fetch(`${API_BASE_URL}/translator/translate`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ targetLanguage: targetLanguage, text: text })
  });
  const data = await response.json();
  console.log(data);
  return data;
};

export const getLanguages = async (phDialects: boolean) => {
  let endpoint = `${API_BASE_URL}/language/`;

  if (phDialects) {
    endpoint += 'ph-dialects';
  } else {
    endpoint += 'major-languages';
  }
  const response = await fetch(endpoint, {
    method: 'GET',
    cache: 'no-store'
  });

  const data = await response.json();
  console.log(data);
  return data;
};