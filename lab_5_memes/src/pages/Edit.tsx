import React, { useState, useRef } from "react";
import Text from "../components/Text";
import { Button } from "react-bootstrap";
import { useSearchParams } from "react-router-dom";
import { toJpeg } from "html-to-image";

interface TextElement {
  id: number;
  x: number;
  y: number;
}

const EditPage = () => {
  const [params] = useSearchParams();
  const [textElements, setTextElements] = useState<TextElement[]>([]);
  const memeRef = useRef<HTMLDivElement>(null);

  const addText = () => {
    setTextElements((prev) => [
      ...prev,
      { id: Date.now(), x: 20, y: 20 + prev.length * 30 },
    ]);
  };

  const handleExport = () => {
    if (!memeRef.current) return;

    toJpeg(memeRef.current, {
      quality: 1,
      backgroundColor: "#ffffff",
    })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "meme.jpeg";
        link.href = dataUrl;
        link.click();
      })
      .catch(console.error);
  };

  const updateTextPosition = (id: number, x: number, y: number) => {
    setTextElements((prev) =>
      prev.map((el) => (el.id === id ? { ...el, x, y } : el))
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <div
        ref={memeRef}
        style={{
          position: "relative",
          display: "inline-block",
          marginBottom: "20px",
        }}
      >
        <img
          src={params.get("url") || ""}
          width="300px"
          alt="Meme template"
          style={{ display: "block" }}
        />
        {textElements.map((el) => (
          <Text
            key={el.id}
            initialPosition={{ x: el.x, y: el.y }}
            onDrag={(x, y) => updateTextPosition(el.id, x, y)}
          />
        ))}
      </div>
      <div>
        <Button onClick={addText} className="m-2">
          Add Text
        </Button>
        <Button variant="success" onClick={handleExport}>
          Save as JPEG
        </Button>
      </div>
    </div>
  );
};

export default EditPage;