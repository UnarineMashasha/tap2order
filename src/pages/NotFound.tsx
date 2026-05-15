import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">404</h1>
      <p>Page not found</p>
      <Link to="/" className="mt-3 text-blue-500">
        Go Home
      </Link>
    </div>
  );
}
