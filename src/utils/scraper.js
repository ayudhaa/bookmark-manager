export const fetchMetadata = async (url) => {
  try {
    const proxyUrl = 'https://api.allorigins.win/raw?url=';
    const response = await fetch(`${proxyUrl}${encodeURIComponent(url)}`);
    const html = await response.text();
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const title = doc.querySelector('title')?.textContent || 
                  doc.querySelector('meta[property="og:title"]')?.content ||
                  'No Title';
    
    const description = doc.querySelector('meta[name="description"]')?.content ||
                       doc.querySelector('meta[property="og:description"]')?.content ||
                       '';
    
    // Extract favicon
    let favicon = doc.querySelector('link[rel="icon"]')?.href ||
                  doc.querySelector('link[rel="shortcut icon"]')?.href ||
                  `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`;
    if (favicon && !favicon.startsWith('http')) {
      const baseUrl = new URL(url);
      favicon = new URL(favicon, baseUrl.origin).href;
    }
    
    return {
      title: title.trim(),
      description: description.trim().substring(0, 150),
      favicon,
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return {
      title: new URL(url).hostname,
      description: '',
      favicon: `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}&sz=64`,
    };
  }
};