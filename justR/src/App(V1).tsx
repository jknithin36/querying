import { useEffect, useState } from "react";

// Define the shape of the data you're fetching
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export default function App() {
  return (
    <div>
      <DataFetchingComponent />
    </div>
  );
}

function DataFetchingComponent() {
  // Declare the types for useState
  const [data, setData] = useState<Todo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  // Fetch data function with proper typing for response
  const fetchData = async (): Promise<void> => {
    try {
      const api = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
      if (!api.ok) throw new Error("Failed to fetch");
      const apiData: Todo = await api.json(); // Cast response to Todo type

      // setData(data);
      setTimeout(() => {
        setData(apiData);
        setIsLoading(!isLoading);
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  // Conditional rendering
  if (isLoading) return <p>Loading......</p>;
  if (error) return <p>Something Went Wrong....</p>;

  return (
    <div>
      <p>{data?.userId}</p>
      <h2>{data?.title}</h2>
    </div>
  );
}
