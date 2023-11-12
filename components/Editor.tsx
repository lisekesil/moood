"use client";

import { updateEntry } from "@/utils/api";
import { useState } from "react";
import { useAutosave } from "react-autosave";

const Editor = ({ entry }) => {
  const [value, setValue] = useState(entry.content);
  const [isSaving, setIsSaving] = useState(false);

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsSaving(true);
      const updated = await updateEntry(entry.id, _value);
      setIsSaving(false);
    },
  });
  return (
    <div className="w-full h-full">
      {isSaving && <div>...saving</div>}
      <textarea
        className="w-full h-full p-8 text-xl outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};

export default Editor;
