export default function Input(props) {
  return (
    <input
      {...props}
      className="w-full p-3 rounded-xl bg-black border border-gray-600 focus:border-gold outline-none"
    />
  );
}