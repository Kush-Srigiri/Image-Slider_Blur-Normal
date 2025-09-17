import { useState } from "react";

function App() {
  const [image, setImage] = useState<string | null>(null);
  const [divider, setDivider] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [direction, setDirection] = useState<"lr" | "rl" | "tb" | "bt">("lr");

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const backbutton = () => {
    setImage(null);
    setDivider(50);
    setDirection("lr");
  };

  const handleMouseDown = () => setDragging(true);
  const handleMouseUp = () => setDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!dragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    let perc = 50;

    if (direction === "lr" || direction === "rl") {
      let offsetX = e.clientX - rect.left;
      offsetX = Math.max(0, Math.min(offsetX, rect.width));
      perc = (offsetX / rect.width) * 100;
    } else {
      let offsetY = e.clientY - rect.top;
      offsetY = Math.max(0, Math.min(offsetY, rect.height));
      perc = (offsetY / rect.height) * 100;
    }

    setDivider(perc);
  };

  const [download] = useState(true);

  const downloadbutton = () =>
    download ? (
      <div className="fixed bottom-28 left-1/2 -translate-x-1/2 bg-[rgba(30,30,40,0.95)] text-white px-8 py-6 rounded-2xl text-lg shadow-xl z-[1000] flex items-center gap-4">
        <span>
          To keep it press <b>Shift</b> + <b>Windows</b> + <b>S</b>
        </span>
        {/* Direction Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setDirection("lr")}
            className="px-3 py-3 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-transform duration-200 group"
          >
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-2">
              →
            </span>
          </button>
          <button
            onClick={() => setDirection("rl")}
            className="px-3 py-3 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-transform duration-200 group"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-2">
              ←
            </span>
          </button>
          <button
            onClick={() => setDirection("tb")}
            className="px-3 py-3 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-transform duration-200 group"
          >
            <span className="inline-block transition-transform duration-200 group-hover:translate-y-2">
              ↓
            </span>
          </button>
          <button
            onClick={() => setDirection("bt")}
            className="px-3 py-3 bg-blue-600 hover:bg-blue-700 rounded text-sm transition-transform duration-200 group"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-y-2">
              ↑
            </span>
          </button>
        </div>
      </div>
    ) : null;

  return (
    <div className="w-full h-screen bg-gradient-to-b from-blue-600 to-purple-800 flex items-center justify-center">
      {!image ? (
        <label className="w-96 h-64 border-2 border-dashed border-white rounded-xl flex flex-col items-center justify-center text-white cursor-pointer gap-2 transition-transform duration-300 hover:scale-105 hover:shadow-xl hover:bg-white/10">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />
          <img src="/add.svg" alt="Add" className="w-16 h-16" />
          Upload Image
        </label>
      ) : (
        <div
          className="relative w-[800px] h-[500px] overflow-hidden rounded-xl cursor-pointer"
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
            className={
              direction === "lr"
                ? "absolute top-0 left-0 h-full border-r-2 border-transparent/60 backdrop-blur-md"
                : direction === "rl"
                ? "absolute top-0 right-0 h-full border-l-2 border-transparent/60 backdrop-blur-md"
                : direction === "tb"
                ? "absolute top-0 left-0 w-full border-b-2 border-transparent/60 backdrop-blur-md"
                : "absolute bottom-0 left-0 w-full border-t-2 border-transparent/60 backdrop-blur-md"
            }
            style={
              direction === "lr"
                ? { width: `${divider}%`, height: "100%" }
                : direction === "rl"
                ? {
                    width: `${100 - divider}%`,
                    height: "100%",
                    left: `${divider}%`,
                  }
                : direction === "tb"
                ? { width: "100%", height: `${divider}%` }
                : {
                    width: "100%",
                    height: `${100 - divider}%`,
                    top: `${divider}%`,
                  }
            }
          >
            <img
              src={image}
              alt="blurred"
              className="w-full h-full object-cover opacity-0"
            />
          </div>
        </div>
      )}

      {/* Download + Buttons */}
      <div className="absolute bottom-8 right-8">{downloadbutton()}</div>

      {/* Back Button */}
      {image && (
        <button
          onClick={backbutton}
          className="fixed bottom-13 left-1/2 -translate-x-1/2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-2xl text-lg shadow-xl z-[1000] transition-transform duration-200"
        >
          Back
        </button>
      )}
    </div>
  );
}

export default App;
