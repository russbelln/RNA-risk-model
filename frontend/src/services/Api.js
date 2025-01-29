const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const fetchData = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/endpoint`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default fetchData;
