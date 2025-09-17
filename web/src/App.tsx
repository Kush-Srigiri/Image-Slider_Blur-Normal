import { useState } from "react";

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [dividerX, setDividerX] = useState(50); // percentage

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    setDividerX(Math.min(100, Math.max(0, x)));
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-600 to-purple-800 flex items-center justify-center">
      {!image ? (
        // Upload placeholder
        <label className="w-96 h-64 border-2 border-dashed border-white rounded-xl flex flex-col items-center justify-center text-white cursor-pointer gap-2 transition-transform duration-500 ease-in-out hover:scale-105 hover:shadow-2xl hover:bg-white/5">
          <input type="file" accept="image/*" className="hidden" onChange={handleUpload} />
          <img src="/add.svg" alt="Add" className="w-16 h-16" />
          Add an Image to Blur
        </label>
      ) : (
        <div
          className="relative w-[500px] h-[300px] overflow-hidden rounded-xl cursor-ew-resize"
          onMouseMove={handleDrag}
        >
          {/* Base Image */}
          <img
            src={image}
            alt="uploaded"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />

          {/* Blurred Mask */}
          <div className="absolute top-0 left-0 h-full backdrop-blur-md border-r-2 border-white/60" style={{ width: `${dividerX}%` }}>
            <img
              src={image}
              alt="blurred"
              className="w-full h-full object-cover opacity-0"
            />
          </div>

          {/* Slider handle */}
          <div className="absolute top-1/2" style={{ left: `${dividerX}%`, transform: "translate(-50%, -50%)" }}>
            <div className="bg-black/50 text-white px-3 py-2 rounded-full text-sm font-bold select-none pointer-events-none">
              {"< >"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
