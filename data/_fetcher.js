const fetcher = async (...args) => {
    const res = await fetch(...args);
  
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text}`);
    }
  
    return res.json();
  };
  
  export default fetcher;
  
  