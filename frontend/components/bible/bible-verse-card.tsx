import React from "react";

export default function BibleVerseCard() {
  return (
    <div className="flex items-center gap-4 border border-border rounded-md bg-card hover:bg-card-light hover:border-primary-light p-4 cursor-pointer">
      <h1 className="font-bold">1</h1>
      <p className="text-sm">
        In the beginning God created the heaven and the earth.
      </p>
    </div>
  );
}
