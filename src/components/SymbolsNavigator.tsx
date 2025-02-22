import { useEffect, useRef, useState } from "react";

type HeadingData = {
  text: string | undefined;
  id: string | undefined;
}[];

export default function SymbolNavigator() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [headings, setHeadings] = useState<HeadingData>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const close = () => {
    setIsOpen(false)
    setSearch("")
    setSelectedIndex(0)
  }
  // fetch headings
  useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll(
        "article h2, article h3, article h4, article h5, article h6"
      )
    );

    const headingData = headingElements.map((heading) => ({
      text: heading.textContent?.replace("#", ""),
      id:
        heading.id ||
        heading.textContent?.replace(/\s+/g, "-").toLowerCase(),
    }));

    setHeadings(headingData);
  }, []);

  const filteredHeadings = headings.filter((h) =>
    h.text?.toLowerCase().includes(search.toLowerCase())
  );
  useEffect(() => {
    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "/" && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        close()
      } else if (isOpen) {
        if (e.key === "ArrowDown" || e.key === "j") {
          e.preventDefault();
          setSelectedIndex((prev) =>
            Math.min(prev + 1, filteredHeadings.length - 1)
          );
        } else if (e.key === "ArrowUp" || e.key === "k") {
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
        }
      }
    }

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isOpen, filteredHeadings.length]);

  return (
    <>
      {isOpen && (
        <div className="z-10 fixed top-10 right-5 p-4 rounded shadow-lg w-80 bg-skin-fill text-[#ebdbb2]">
          <input
            autoFocus
            type="text"
            className="block w-full placeholder-[#ebddb299] rounded border border-skin-fill/40 bg-skin-fill py-2 px-5 pr-3 placeholder:italic focus:border-skin-accent focus:outline-none"
            placeholder="Search headings..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setSelectedIndex(0)
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                if (filteredHeadings[selectedIndex]) {
                  window.location.hash = `#${filteredHeadings[selectedIndex].id}`;
                  close()
                }
              }
            }}
          />
          <ul ref={listRef} className="overflow-y-hidden">
            {filteredHeadings.map((h, index) => (
              <li key={h.id} className="first:mt-5" onClick={() => close()}>
                <a
                  href={`#${h.id}`}
                  className={`block w-full my-2 text-left p-1 rounded ${index === selectedIndex
                    ? "bg-[#3D3935]"
                    : "hover:bg-[#453d39]"
                    }`}
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

