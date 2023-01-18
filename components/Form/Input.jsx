export function Input(props) {
  return (
    <input
      { ...props }
      className="text-sm bg-zinc-900 py-3 px-4 rounded placeholder:text-zinc-500"
    />
  )
}