import React, { useState, useRef, useEffect } from "react";

interface TextProps {
  initialPosition?: { x: number; y: number };
  onDrag?: (x: number, y: number) => void;
}

const Text: React.FC<TextProps> = ({ initialPosition = { x: 20, y: 20 } }) => {
  const [editMode, setEditMode] = useState(false);
  const [val, setVal] = useState("Double Click to Edit");
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const textRef = useRef<HTMLDivElement>(null);

  // Обработка перетаскивания
  useEffect(() => {
    if (!textRef.current || !isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX - (textRef.current?.offsetWidth || 0) / 2,
        y: e.clientY - (textRef.current?.offsetHeight || 0) / 2,
      });
    };

    const handleMouseUp = () => setIsDragging(false);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={textRef}
      style={{
        position: "absolute",
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        background: editMode ? "rgba(255,255,255,0.7)" : "transparent",
        padding: "2px",
      }}
      onMouseDown={() => !editMode && setIsDragging(true)}
      onDoubleClick={() => setEditMode(true)}
    >
      {editMode ? (
        <input
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onBlur={() => setEditMode(false)}
          autoFocus
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            fontSize: "16px",
            fontFamily: "Arial, sans-serif",
            width: "100%",
          }}
        />
      ) : (
        <div style={{ fontSize: "16px", fontFamily: "Arial, sans-serif" }}>
          {val}
        </div>
      )}
    </div>
  );
};

export default Text;