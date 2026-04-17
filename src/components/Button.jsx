export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-yellow-500 px-6 py-3 rounded"
    >
      {children}
    </button>
  );
}