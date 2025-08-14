export default function LoadingSpinner({ message }) {
  return (
    <div className="flex flex-col gap-3 h-screen text-stone-600 items-center justify-center">
      <img src="/tube-spinner.svg" alt="Loading spinner" className="w-12 h-12" />
      {message}
    </div>
  );
}
