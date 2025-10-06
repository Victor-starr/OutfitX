import { Link, useNavigate } from "react-router";
import Button from "@/components/Button";

function NotFound() {
  const navigate = useNavigate();
  return (
    <main className="flex flex-col justify-center items-center bg-bg px-4 h-[85vh] text-center">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="mb-4 font-bold text-primary text-6xl md:text-8xl">
            404
          </h1>
          <h2 className="mb-6 text-title text-2xl md:text-3xl">
            Page Not Found
          </h2>
          <p className="mx-auto mb-8 max-w-lg text-muted text-lg md:text-xl leading-relaxed">
            Oops! The page you're looking for doesn't exist. It might have been
            moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        <div className="flex sm:flex-row flex-col justify-center items-center gap-4 md:gap-6">
          <Link to="/">
            <Button
              type="button"
              version="v1"
              color="primary"
              size="lg"
              className="px-8 py-3 w-full sm:w-auto"
            >
              Go Home
            </Button>
          </Link>
          <Button
            type="button"
            version="v2"
            color="secondary"
            size="lg"
            className="px-8 py-3 w-full sm:w-auto"
            onClick={() => navigate(-1)}
          >
            Go Back
          </Button>
        </div>
      </div>
    </main>
  );
}

export default NotFound;
