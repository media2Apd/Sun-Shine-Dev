// import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
// import ReactDOM from "react-dom";
// import { Search, X, Check, ChevronDown } from "lucide-react";

// const SelectDropdown = ({
//   label,
//   options = [],
//   value,
//   onChange,
//   labelKey = "label",
//   valueKey = "id",
//   placeholder = "Select an option",
//   parentClassName = "",
//   ChildClassName = "",
//   inputClassName = "",
//   dropdownClassName = "",
//   itemClassName = "",
//   labelClassName = "",
//   iconSize = 18,
//   disabled = false,
//   disabledOptions = [],
//   error = false,
//   searchable = false,
//   searchPlaceholder = "Search...",
//   multiple = false,
//   maxSelectedItems = null,
//   showSelectedCount = true,
//   footerRenderer,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [dropdownPosition, setDropdownPosition] = useState({
//     top: 0,
//     left: 0,
//     width: 0,
//     maxHeight: '240px',
//     transformOrigin: 'top'
//   });

//   const dropdownRef = useRef(null);
//   const buttonRef = useRef(null);
//   const listRef = useRef(null);
//   const searchInputRef = useRef(null);

//   // Normalize value to array for multiple select
//   const normalizedValue = useMemo(() => {
//     if (!multiple) return value;
//     return Array.isArray(value) ? value : (value !== null && value !== undefined ? [value] : []);
//   }, [value, multiple]);

//   // Helper function to check if a value is "empty"
//   const isValueEmpty = (val) => {
//     return val === null || val === undefined || val === '';
//   };

//   // Helper function to compare values (handles different types)
//   const areValuesEqual = (val1, val2) => {
//     if (val1 === val2) return true;
//     if (typeof val1 !== typeof val2) {
//       return String(val1) === String(val2);
//     }
//     return val1 === val2;
//   };

//   // Filter options based on search query
//   const filteredOptions = useMemo(() => {
//     if (!searchable || !searchQuery.trim()) return options;
    
//     const query = searchQuery.toLowerCase().trim();
//     return options.filter(option => {
//       const labelValue = option[labelKey];
//       if (labelValue === null || labelValue === undefined) return false;
      
//       const labelStr = String(labelValue).toLowerCase();
//       return labelStr.includes(query);
//     });
//   }, [options, searchQuery, searchable, labelKey]);

//   // Calculate dropdown position
//   const calculatePosition = useCallback(() => {
//     if (!buttonRef.current || !isOpen) return;

//     const buttonRect = buttonRef.current.getBoundingClientRect();
//     const viewport = {
//       width: window.innerWidth,
//       height: window.innerHeight
//     };

//     const dropdownMaxHeight = 240;
//     const itemHeight = 40;
//     const searchBarHeight = searchable ? 48 : 0;
//     const actualDropdownHeight = Math.min(
//       (filteredOptions.length + 1) * itemHeight + searchBarHeight,
//       dropdownMaxHeight
//     );

//     const padding = 5; // Slight spacing

//     let position = {
//       width: buttonRect.width,
//       maxHeight: dropdownMaxHeight,
//       transformOrigin: 'top'
//     };

//     const spaceBelow = viewport.height - buttonRect.bottom - padding;
//     const spaceAbove = buttonRect.top - padding;

//     // Determine vertical position
//     if (spaceBelow >= actualDropdownHeight || spaceBelow > spaceAbove) {
//       // Show below
//       position.top = buttonRect.bottom + window.scrollY + padding;
//       position.maxHeight = Math.min(actualDropdownHeight, spaceBelow - 10);
//       position.transformOrigin = 'top';
//     } else {
//       // Show above
//       position.top = buttonRect.top + window.scrollY - Math.min(actualDropdownHeight, spaceAbove) - padding;
//       position.maxHeight = Math.min(actualDropdownHeight, spaceAbove - 10);
//       position.transformOrigin = 'bottom';
//     }

//     // Determine horizontal position (align left usually)
//     position.left = buttonRect.left + window.scrollX;

//     setDropdownPosition(position);
//   }, [isOpen, filteredOptions.length, searchable]);

//   // Toggle dropdown
//   const toggleDropdown = () => {
//     if (!disabled) {
//       setIsOpen((prev) => !prev);
//       if (!isOpen) {
//         setSearchQuery("");
//       }
//     }
//   };

//   // Selection Handlers
//   const handleSingleSelect = (option) => {
//     const optionValue = option[valueKey];
//     if (isValueEmpty(optionValue)) {
//       onChange('');
//       setIsOpen(false);
//       setSearchQuery("");
//       return;
//     }
//     if (disabledOptions.some(disabled => areValuesEqual(disabled, optionValue))) return;
//     onChange(optionValue);
//     setIsOpen(false);
//     setSearchQuery("");
//   };

//   const handleMultipleSelect = (option) => {
//     const optionValue = option[valueKey];
//     if (disabledOptions.some(disabled => areValuesEqual(disabled, optionValue))) return;

//     const currentValues = normalizedValue;
//     const isSelected = currentValues.some(val => areValuesEqual(val, optionValue));
    
//     let newValues;
//     if (isSelected) {
//       newValues = currentValues.filter(v => !areValuesEqual(v, optionValue));
//     } else {
//       if (maxSelectedItems && currentValues.length >= maxSelectedItems) return;
//       newValues = [...currentValues, optionValue];
//     }
//     onChange(newValues);
//   };

//   const handleSelect = (option) => {
//     if (multiple) handleMultipleSelect(option);
//     else handleSingleSelect(option);
//   };

//   const removeSelectedItem = (itemValue, e) => {
//     e.stopPropagation();
//     const newValues = normalizedValue.filter(v => !areValuesEqual(v, itemValue));
//     onChange(newValues);
//   };

//   const clearAll = (e) => {
//     e.stopPropagation();
//     onChange([]);
//   };

//   // Click outside & Events
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       // Check if click is outside both button and dropdown menu
//       const isOutsideButton = buttonRef.current && !buttonRef.current.contains(event.target);
//       const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(event.target);
      
//       if (isOutsideButton && isOutsideDropdown) {
//         setIsOpen(false);
//         setSearchQuery("");
//       }
//     };
    
//     if (isOpen) {
//         document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [isOpen]);

//   useEffect(() => {
//     if (isOpen) {
//       calculatePosition();
//       // Use requestAnimationFrame to ensure DOM is ready
//       requestAnimationFrame(() => {
//           if (searchable && searchInputRef.current) {
//             searchInputRef.current?.focus();
//           }
//       });
//     }
//   }, [isOpen, calculatePosition, searchable]);

//   useEffect(() => {
//     if (!isOpen) return;
//     const handleResize = () => calculatePosition();
//     const handleScroll = () => calculatePosition();
    
//     window.addEventListener('resize', handleResize);
//     window.addEventListener('scroll', handleScroll, true);
    
//     return () => {
//       window.removeEventListener('resize', handleResize);
//       window.removeEventListener('scroll', handleScroll, true);
//     };
//   }, [isOpen, calculatePosition]);

//   // Labels & Helpers
//   const getSelectedLabel = () => {
//     if (!multiple) {
//       if (isValueEmpty(value)) return placeholder;
//       const match = options.find((opt) => areValuesEqual(opt[valueKey], value));
//       return match?.[labelKey] || placeholder;
//     } else {
//       if (!normalizedValue.length) return placeholder;
//       if (showSelectedCount && normalizedValue.length > 2) {
//         return `${normalizedValue.length} items selected`;
//       }
//       const selectedLabels = normalizedValue.map(val => {
//         const match = options.find(opt => areValuesEqual(opt[valueKey], val));
//         return match?.[labelKey] || String(val);
//       });
//       return selectedLabels.join(', ');
//     }
//   };

//   const isOptionSelected = (option) => {
//     if (!multiple) return areValuesEqual(value, option[valueKey]);
//     return normalizedValue.some(val => areValuesEqual(val, option[valueKey]));
//   };

//   const isOptionDisabled = (option) => {
//     return disabledOptions.some(disabled => areValuesEqual(disabled, option[valueKey]));
//   };

//   const handleKeyDown = (e) => {
//     if (e.key === 'Escape') {
//       setIsOpen(false);
//       setSearchQuery("");
//     }
//   };

//   const hasValue = !isValueEmpty(value) && (multiple ? normalizedValue.length > 0 : true);

//   // Portal content
//   const dropdownMenu = isOpen && !disabled ? (
//     ReactDOM.createPortal(
//       <div
//         ref={dropdownRef}
//         className={`absolute  z-[9999] rounded-[7px] border shadow-lg bg-white  border-gray-200  flex flex-col ${dropdownClassName}`}
//         style={{
//           top: dropdownPosition.top,
//           left: dropdownPosition.left,
//           width: dropdownPosition.width,
//           maxHeight: dropdownPosition.maxHeight,
//           transformOrigin: dropdownPosition.transformOrigin,
//           animation: 'dropdownFade 0.15s ease-out'
//         }}
//         onKeyDown={handleKeyDown}
//       >
//         {/* Search Input */}
//         {searchable && (
//           <div className="p-2 border-b border-gray-100 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800 shrink-0">
//             <div className="relative">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
//               <input
//                 ref={searchInputRef}
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder={searchPlaceholder}
//                 className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md 
//                   bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400
//                   focus:outline-none focus:ring-1 focus:ring-primaryLight focus:border-primaryLight text-sm transition-all duration-200"
//                 onClick={(e) => e.stopPropagation()}
//                 onKeyDown={(e) => e.stopPropagation()}
//               />
//             </div>
//           </div>
//         )}

//         {/* Options List */}
//         <ul
//           ref={listRef}
//           className="overflow-y-auto"
//           style={{
//             maxHeight: searchable 
//               ? `calc(${dropdownPosition.maxHeight}px - 56px)` 
//               : `${dropdownPosition.maxHeight}px`,
//             overflowX: 'hidden'
//           }}
//         >
//           {!multiple && (
//             <li
//               onClick={() => {
//                 onChange('');
//                 setIsOpen(false);
//                 setSearchQuery("");
//               }}
//               className={`px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 transition-colors duration-150
//                 ${isValueEmpty(value) ? "bg-gray-50 dark:bg-gray-700 font-semibold" : ""} ${itemClassName}`}
//             >
//               {placeholder}
//             </li>
//           )}

//           {multiple && filteredOptions.length > 0 && (
//             <li
//               onClick={() => {
//                 const allValues = filteredOptions
//                   .filter(opt => !isOptionDisabled(opt))
//                   .map(opt => opt[valueKey]);
                
//                 const allSelected = allValues.every(val => 
//                   normalizedValue.some(nVal => areValuesEqual(nVal, val))
//                 );
                
//                 if (allSelected) {
//                   const newValues = normalizedValue.filter(val => 
//                     !allValues.some(aVal => areValuesEqual(aVal, val))
//                   );
//                   onChange(newValues);
//                 } else {
//                   const newValues = [...new Set([...normalizedValue, ...allValues])];
//                   if (!maxSelectedItems || newValues.length <= maxSelectedItems) {
//                     onChange(newValues);
//                   }
//                 }
//               }}
//               className="px-4 py-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-700 font-medium text-blue-600 transition-colors duration-150"
//             >
//               {filteredOptions.filter(opt => !isOptionDisabled(opt)).every(opt => 
//                 normalizedValue.some(nVal => areValuesEqual(nVal, opt[valueKey]))
//               ) ? 'Deselect All' : 'Select All'}
//             </li>
//           )}

//           {filteredOptions.length > 0 ? (
//             filteredOptions.map((option, index) => {
//               const isDisabled = isOptionDisabled(option);
//               const isSelected = isOptionSelected(option);
              
//               return (
//                 <li
//                   key={`${option[valueKey]}-${index}`}
//                   onClick={() => !isDisabled && handleSelect(option)}
//                   className={`
//                     px-4 py-2 flex items-center justify-between transition-colors duration-150
//                     ${isDisabled
//                       ? 'cursor-not-allowed opacity-50 bg-gray-50 dark:bg-gray-800 text-gray-400'
//                       : 'cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100'
//                     }
//                     ${(!isDisabled && isSelected) ? "bg-blue-50 dark:bg-blue-900/20" : ""} 
//                     ${itemClassName}
//                   `}
//                   title={isDisabled ? 'This option is not available' : ''}
//                 >
//                   <span>{option[labelKey]}</span>
//                   {multiple && isSelected && !isDisabled && (
//                     <Check className="text-blue-600" size={16} />
//                   )}
//                 </li>
//               );
//             })
//           ) : (
//             <li className="px-4 py-3 text-center text-gray-400 text-sm">
//               {searchQuery ? 'No results found' : 'No options available'}
//             </li>
//           )}
//         </ul>
//         {footerRenderer && (
//           <div className="border-t border-gray-100 dark:border-gray-700 w-full box-border shrink-0">
//             <div className="w-full">
//               {footerRenderer()}
//             </div>
//           </div>
//         )}
//       </div>,
//       document.body
//     )
//   ) : null;

//   return (
//     <div className={`w-full ${parentClassName}`}>
//       {label && (
//         <label className={`block text-sm font-medium mb-1 text-black ${labelClassName}`}>
//           {label}
//         </label>
//       )}
//       <div className="relative">
//         <button
//           ref={buttonRef}
//           type="button"
//           onClick={toggleDropdown}
//           disabled={disabled}
//           className={`${ChildClassName} flex justify-between items-center w-full h-10 rounded-md px-3 text-left text-sm font-normal shadow-sm focus:outline-none transition-all duration-200
//             ${disabled
//               ? "bg-gray-100 text-gray-500 border border-gray-200 cursor-not-allowed"
//               : hasValue
//                 ? "bg-neutral border border-transparent"
//                 : "bg-white border border-placeholderBorder"
//             }
//             ${error
//               ? "border-red-500" // Error state
//               : "border-placeholderBorder" // Borderless by default
//             }
//             ${!disabled && !error ? "hover:bg-neutral" : ""}
//             ${isOpen ? "ring-2 ring-primaryLight" : "focus:ring-2 focus:ring-primaryLight"}
//           `}
//         >
//           <span className={`whitespace-nowrap overflow-hidden text-ellipsis ${inputClassName} ${!hasValue ? "text-gray-500" : "text-black"}`}>
//             {getSelectedLabel()}
//           </span>
//           <div className="flex items-center gap-1 ml-2">
//             {multiple && normalizedValue.length > 0 && !disabled && (
//               <X
//                 className="flex-shrink-0 hover:bg-gray-200 rounded-full p-0.5 text-gray-500"
//                 size={16}
//                 onClick={clearAll}
//               />
//             )}
//             <ChevronDown 
//               className={`flex-shrink-0 transition-transform duration-200 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}
//               size={iconSize}
//             />
//           </div>
//         </button>

//         {/* Selected items tags (for multiple select) */}
//         {multiple && !showSelectedCount && normalizedValue.length > 0 && (
//           <div className="flex flex-wrap gap-1 mt-2">
//             {normalizedValue.map((val) => {
//               const option = options.find(opt => areValuesEqual(opt[valueKey], val));
//               if (!option) return null;
              
//               return (
//                 <span
//                   key={String(val)}
//                   className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm"
//                 >
//                   {option[labelKey]}
//                   {!disabled && (
//                     <X
//                       className="cursor-pointer hover:bg-blue-200 rounded-full"
//                       size={14}
//                       onClick={(e) => removeSelectedItem(val, e)}
//                     />
//                   )}
//                 </span>
//               );
//             })}
//           </div>
//         )}

//         {dropdownMenu}
//       </div>

//       <style>{`
//         @keyframes dropdownFade {
//           from {
//             opacity: 0;
//             transform: translateY(-5px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//       `}</style>
//     </div>
//   );
// };

// export default SelectDropdown;

import React, { useState, useRef, useEffect, useMemo } from "react";
import ReactDOM from "react-dom";
import { Search,Check, ChevronDown } from "lucide-react";

const SelectDropdown = ({
  options = [],
  value,
  onChange,
  labelKey = "label",
  valueKey = "id",
  placeholder = "Select",
  parentClassName = "",
  ChildClassName = "",
  searchable = false,
}) => {

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  const filteredOptions = useMemo(() => {
  if (!searchQuery) return options;
  return options.filter(opt =>
    String(opt[labelKey]).toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [searchQuery, options, labelKey]);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const handleSelect = (option) => {
    onChange(option[valueKey]);
    setIsOpen(false);
    setSearchQuery("");
  };

 const selectedLabel = useMemo(() => {
  const match = options.find(opt => opt[valueKey] === value);
  return match ? match[labelKey] : placeholder;
}, [value, options, labelKey, valueKey, placeholder]);

  // click outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !buttonRef.current?.contains(e.target) &&
        !dropdownRef.current?.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative w-full ${parentClassName}`}>

      {/* BUTTON */}
      <button
        ref={buttonRef}
        onClick={toggleDropdown}
        className={`flex justify-between items-center w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-black text-sm ${ChildClassName}`}
      >
        <span className={`${!value ? "text-gray-400" : "text-black"}`}>
          {selectedLabel}
        </span>

        <ChevronDown
          size={18}
          className={`transition ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* DROPDOWN */}
      {isOpen &&
        ReactDOM.createPortal(
          <div
            ref={dropdownRef}
            className="absolute z-[9999] bg-white border border-gray-200 rounded-md shadow-lg w-[200px]"
            style={{
              top: buttonRef.current?.getBoundingClientRect().bottom + window.scrollY + 5,
              left: buttonRef.current?.getBoundingClientRect().left + window.scrollX,
            }}
          >

            {/* SEARCH */}
            {searchable && (
              <div className="p-2 border-b">
                <div className="relative">
                  <Search className="absolute left-2 top-2 text-gray-400" size={16} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full pl-8 pr-2 py-1 border rounded text-sm bg-white text-black"
                  />
                </div>
              </div>
            )}

            {/* OPTIONS */}
            <ul className="max-h-60 overflow-y-auto">

              {/* CLEAR OPTION */}
              <li
                onClick={() => handleSelect({ [valueKey]: "", [labelKey]: placeholder })}
                className="px-4 py-2 text-black hover:bg-gray-100 cursor-pointer"
              >
                {placeholder}
              </li>

              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt, i) => {
                  const selected = value === opt[valueKey];

                  return (
                    <li
                      key={i}
                      onClick={() => handleSelect(opt)}
                      className={`px-4 py-2 flex justify-between items-center cursor-pointer
                        ${selected ? "bg-gray-200" : "bg-white"}
                        hover:bg-gray-100 text-black`}
                    >
                      {opt[labelKey]}
                      {selected && <Check size={16} />}
                    </li>
                  );
                })
              ) : (
                <li className="px-4 py-2 text-gray-500 text-sm text-center">
                  No results
                </li>
              )}
            </ul>
          </div>,
          document.body
        )}
    </div>
  );
};

export default SelectDropdown;