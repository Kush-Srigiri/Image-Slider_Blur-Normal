import { useState } from "react";

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [divider, setDivider] = useState(50); // percentage position of blur divider
  const [dragging, setDragging] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => setDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    offsetX = Math.max(0, Math.min(offsetX, rect.width));
    const perc = (offsetX / rect.width) * 100;
    setDivider(perc);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-600 to-purple-800 flex items-center justify-center">
      {!image ? (
        <label className="w-96 h-64 border-2 border-dashed border-white rounded-xl flex flex-col items-center justify-center text-white cursor-pointer gap-2 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/10">
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          <img src="/add.svg" alt="Add" className="w-16 h-16" />
          Upload Image
        </label>
      ) : (
        <div
          className="relative w-[800px] h-[500px] overflow-hidden rounded-xl cursor-ew-resize"
          onMouseMove={handleMouseMove}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Base Image */}
          <img
            src={image}
            alt="original"
            className="absolute w-full h-full object-cover"
          />

          {/* Blurred Block */}
          <div
            className="absolute top-0 left-0 h-full border-r-2 border-white/60 backdrop-blur-md"
            style={{ width: `${divider}%` }}
          >
            <img
              src={image}
              alt="blurred"
              className="w-full h-full object-cover opacity-0"
            />
          </div>

          {/* Handle (instead of < >) */}
          <div
            className="absolute top-0 h-full w-1 bg-white"
            style={{ left: `${divider}%`, transform: "translateX(-50%)" }}
          />
        </div>
      )}
    </div>
  );
}

export default App;
