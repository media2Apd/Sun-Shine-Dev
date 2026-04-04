<SelectDropdown
  options={categoryOptions}
  value={category}
  onChange={setCategory}
  placeholder="Select Category" // ✅ only display, not inside list
  searchable={true}
/>