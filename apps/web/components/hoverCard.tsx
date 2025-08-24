export default function HoverCard() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="relative group">
        {/* Trigger */}
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded">
          Hover Me
        </button>

        {/* Card (hidden until hover) */}
        <div className="absolute top-14 left-0 w-64 bg-white shadow-lg rounded-lg p-4 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-200">
          <h3 className="text-lg font-bold mb-2">Card Title</h3>
          <p className="text-gray-700 text-sm">
            This card appears when you hover over the button.
          </p>
        </div>
      </div>
    </div>
  );
}
