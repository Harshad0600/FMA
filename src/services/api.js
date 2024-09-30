export const fetchFeedback = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/comments');
    const data = await response.json();
  
    const limitedData = data.slice(0, 10);
  
    const feedbackWithDates = limitedData.map((item) => ({
      ...item,
      timestamp: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
      status: ['acknowledged', 'addressed', 'ignored'][Math.floor(Math.random() * 3)],
    }));
  
    return feedbackWithDates;
  };
  