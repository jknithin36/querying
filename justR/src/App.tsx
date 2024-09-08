import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { useEffect, useState } from "react";

// Define the shape of the data you're fetching
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Fixing typo in queryClient
const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DataFetching />
    </QueryClientProvider>
  );
}

// Fetch function
const fetchData = async (): Promise<Todo> => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
  if (!response.ok)
    throw new Error("Something went wrong, please try again later.");
  const data = await response.json();
  return data;
};

function DataFetching() {
  const { data, error, isSuccess } = useQuery<Todo, Error>({
    queryKey: ["todo"],
    queryFn: fetchData,
  });
  const [showData, setShowData] = useState(false); // State to control delayed rendering

  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setShowData(true); // Show data after the delay
      }, 2000); // Delay of 2 seconds

      return () => clearTimeout(timer); // Clean up the timer on unmount
    }
  }, [isSuccess]);

  if (!showData) return <p>Loading......</p>;
  if (error) return <p>Something Went Wrong....</p>;

  return (
    <>
      <p>User ID: {data?.userId}</p>
      <h2>Title: {data?.title}</h2>
    </>
  );
}
