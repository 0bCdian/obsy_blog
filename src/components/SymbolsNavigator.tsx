import { useEffect, useRef, useState } from "react";

type TableItem = {
  text: string;
  href: string;
  level: number;
  children: TableItem[];
};

const SymbolsNavigator = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [toc, setToc] = useState<TableItem[]>([]);
  const [flattenedItems, setFlattenedItems] = useState<TableItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  // Parse existing TOC on mount
  useEffect(() => {
    const parseTableOfContents = (ul: Element, level = 0): TableItem[] => {
      return Array.from(ul.children).map(li => {
        const link = li.querySelector("a");
        const nestedUl = li.querySelector("ul");

        return {
          text: link?.textContent || "",
          href: link?.getAttribute("href")?.replace(/-$/, "").trimEnd() || "",
          level,
          children: nestedUl ? parseTableOfContents(nestedUl, level + 1) : [],
        };
      });
    };

    const tocElement = document.querySelector("details ul");
    if (tocElement) {
      const parsedToc = parseTableOfContents(tocElement);
      setToc(parsedToc);
    }
  }, []);

  // Flatten items for keyboard navigation while preserving hierarchy info
  useEffect(() => {
    const flatten = (items: TableItem[]): TableItem[] => {
      return items.reduce((acc: TableItem[], item) => {
        return [...acc, item, ...flatten(item.children)];
      }, []);
    };

    setFlattenedItems(flatten(toc));
  }, [toc]);

  const close = () => {
    setIsOpen(false);
    setSearch("");
    setSelectedIndex(0);
  };

  // Filter items based on search
  const filteredItems = flattenedItems.filter(item =>
    item.text.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "/" && !isOpen) {
        e.preventDefault();
        setIsOpen(true);
      } else if (e.key === "Escape" && isOpen) {
        close();
      } else if (isOpen) {
        if (e.key === "ArrowDown" || e.key === "j") {
          e.preventDefault();
          setSelectedIndex(prev =>
            Math.min(prev + 1, filteredItems.length - 1)
          );
        } else if (e.key === "ArrowUp" || e.key === "k") {
          e.preventDefault();
          setSelectedIndex(prev => Math.max(prev - 1, 0));
        }
      }
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [isOpen, filteredItems.length]);

  useEffect(() => {
    if (itemRefs.current[selectedIndex]) {
      itemRefs.current[selectedIndex]?.scrollIntoView({
        block: "nearest",
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  const renderItem = (item: TableItem) => {
    const index = filteredItems.indexOf(item);
    const isSelected = index === selectedIndex;

    return (
      <li
        ref={el => {
          if (index !== -1) itemRefs.current[index] = el;
        }}
        key={item.href}
        style={{ paddingLeft: `${item.level * 1}rem` }}
        className="first:mt-2"
        onClick={() => close()}
      >
        <a
          href={item.href}
          className={`block w-full my-1 text-left p-1 rounded ${
            isSelected ? "bg-[#3D3935]" : "hover:bg-[#453d39]"
          }`}
        >
          {item.text}
        </a>
      </li>
    );
  };

  return (
    <>
      {isOpen && (
        <div className="z-10 fixed top-10 right-5 p-4 rounded shadow-lg w-96 bg-skin-fill text-[#ebdbb2]">
          <input
            autoFocus
            type="text"
            className="block w-full placeholder-[#ebddb299] rounded border border-skin-fill/40 bg-skin-fill py-2 px-5 pr-3 placeholder:italic focus:border-skin-accent focus:outline-none"
            placeholder="Search table of contents..."
            value={search}
            onChange={e => {
              setSearch(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={e => {
              if (e.key === "Enter") {
                e.preventDefault();
                const selectedItem = filteredItems[selectedIndex];
                if (selectedItem) {
                  window.location.href = selectedItem.href;
                  close();
                }
              }
            }}
          />
          <ul ref={listRef} className="overflow-y-auto max-h-[42rem] pr-2">
            {filteredItems.map(item => renderItem(item))}
          </ul>
        </div>
      )}
    </>
  );
};

export default SymbolsNavigator;
