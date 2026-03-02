import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight, Settings } from "lucide-react";

const Pagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  onItemsPerPageChange,
}) => {
  const buttonRef = useRef(null);
  const dropdownRef = useRef(null);

  const [open, setOpen] = useState(false);
  const [styles, setStyles] = useState({ opacity: 0 });

  const perPageOptions = [10, 25, 50, 75, 100, 200, "All"];

  /* ---------- Pagination Logic ---------- */

  const totalPages =
    itemsPerPage === "All"
      ? 1
      : Math.ceil(totalItems / itemsPerPage);

  const startItem =
    itemsPerPage === "All"
      ? 1
      : (currentPage - 1) * itemsPerPage + 1;

  const endItem =
    itemsPerPage === "All"
      ? totalItems
      : Math.min(currentPage * itemsPerPage, totalItems);

  /* ---------- Dropdown Position ---------- */

  const calculatePosition = useCallback(() => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();

    const vh = window.innerHeight;
    const vw = window.innerWidth;

    const optionHeight = 36;
    const dropdownHeight =
      perPageOptions.length * optionHeight + 12;

    const width = rect.width;
    const gap = 6;

    let style = {
      position: "fixed",
      width,
      left: rect.left,
      zIndex: 9999,
      opacity: 1,
    };

    /* Vertical */

    const spaceBelow = vh - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow > dropdownHeight || spaceBelow > spaceAbove) {
      style.top = rect.bottom + gap;
      style.transformOrigin = "top";
    } else {
      style.bottom = vh - rect.top + gap;
      style.transformOrigin = "bottom";
    }

    /* Horizontal Safety */

    if (style.left + width > vw) {
      style.left = vw - width - 8;
    }

    if (style.left < 8) {
      style.left = 8;
    }

    setStyles(style);
  }, [perPageOptions.length]);

  /* ---------- Layout Sync ---------- */

  useLayoutEffect(() => {
    if (!open) return;

    // First sync
    calculatePosition();

    // Second sync AFTER paint (fixes first-load shift)
    const raf = requestAnimationFrame(() => {
      calculatePosition();
    });

    window.addEventListener("resize", calculatePosition);
    window.addEventListener("scroll", calculatePosition, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", calculatePosition);
      window.removeEventListener("scroll", calculatePosition, true);
    };
  }, [open, calculatePosition]);


  /* ---------- Outside Click ---------- */

  useEffect(() => {
    const handler = (e) => {
      if (
        open &&
        !buttonRef.current?.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);

    return () =>
      document.removeEventListener("mousedown", handler);
  }, [open]);

  /* ---------- Select ---------- */

  const handleSelect = (value) => {
    onItemsPerPageChange(value === "All" ? "All" : value);
    setOpen(false);
  };

  /* ---------- Render ---------- */

  return (
    <div className="flex flex-wrap items-center justify-between mt-4 gap-4 w-full">

      {/* Left Info */}
      <div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Showing {startItem} - {endItem} of {totalItems}
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">

        {/* Dropdown Button */}
        <button
          ref={buttonRef}
          onClick={() => setOpen((p) => !p)}
          className="
            flex items-center gap-2
            px-3 py-2 text-sm
            bg-gray-50 dark:bg-neutral-800
            hover:bg-gray-100 dark:hover:bg-neutral-700
            border border-gray-200 dark:border-neutral-700
            rounded-md
            text-gray-700 dark:text-gray-200
          "
        >
          <Settings size={16} />

          {itemsPerPage === "All"
            ? "All per page"
            : `${itemsPerPage} per page`}
        </button>

        {/* Page Controls */}
        <div
          className="
            flex items-center
            border border-gray-200 dark:border-neutral-700
            rounded-md
            px-2 py-1
            bg-white dark:bg-neutral-800
          "
        >
          <button
            onClick={() =>
              onPageChange(Math.max(1, currentPage - 1))
            }
            disabled={currentPage === 1 || itemsPerPage === "All"}
            className="p-1 disabled:opacity-40"
          >
            <ChevronLeft size={20} />
          </button>

          <span className="px-2 text-sm font-medium">
            {startItem} - {endItem}
          </span>

          <button
            onClick={() =>
              onPageChange(
                Math.min(totalPages, currentPage + 1)
              )
            }
            disabled={
              currentPage === totalPages ||
              itemsPerPage === "All"
            }
            className="p-1 disabled:opacity-40"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Dropdown (Portal) */}
      {open &&
        createPortal(
          <div
            ref={dropdownRef}
            style={styles}
            className="
              bg-white dark:bg-neutral-800
              border border-gray-200 dark:border-neutral-700
              shadow-xl
              rounded-md
              overflow-hidden
            "
          >
            {perPageOptions.map((opt) => (
              <div
                key={opt}
                onClick={() => handleSelect(opt)}
                className="
                  px-4 py-2 text-sm
                  cursor-pointer
                  hover:bg-gray-50 dark:hover:bg-neutral-700
                  text-gray-700 dark:text-gray-200
                "
              >
                {opt === "All"
                  ? "All per page"
                  : `${opt} per page`}
              </div>
            ))}
          </div>,
          document.body
        )}
    </div>
  );
};

export default Pagination;


