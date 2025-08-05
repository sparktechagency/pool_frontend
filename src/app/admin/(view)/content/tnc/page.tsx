"use client";
import React, { useState } from "react";
import { Editor } from "primereact/editor";
import { EditorTextChangeEvent } from "primereact/editor";
import { Button } from "@/components/ui/button";

export default function Page() {
  const [text, setText] = useState<string>("");

  return (
    <div className="!pb-12 !pr-6 !space-y-6">
      <h2 className="text-3xl font-bold">Terms and conditions</h2>
      <Editor
        value={text || ""}
        onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue ?? "")}
        style={{ height: "320px" }}
      />
      <Button>Confirm Update</Button>
    </div>
  );
}
