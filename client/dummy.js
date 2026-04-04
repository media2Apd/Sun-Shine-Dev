

////////////////////////////////

// Price range state
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [minPrice, setMinPrice] = useState(0);

  const fetchData = useCallback(async (categories = [], screenSizes = []) => {
    setLoading(true);
    try {
      const response = await fetch(SummaryApi.filterProduct.url, {
        method: SummaryApi.filterProduct.method,
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          category: categories,
          parentCategory: validParentCategory || undefined,
          screenSize: screenSizes.length > 0 ? screenSizes : undefined
        })
      });
      const dataResponse = await response.json();

      if (dataResponse.data?.length === 0) {
        setData([]);
        setAllProducts([]);
      } else {
        const products = dataResponse?.data || [];
        setAllProducts(products); 
        setData(products);

        if (products.length > 0) {
          const prices = products.map(p => p.sellingPrice || 0);
          const max = Math.max(...prices);
          const min = Math.min(...prices);
          const calculatedMax = Math.ceil(max / 1000) * 1000;
          const calculatedMin = Math.floor(min / 1000) * 1000;
          setMaxPrice(calculatedMax);
          setMinPrice(calculatedMin);
          setPriceRange([calculatedMin, calculatedMax]);
        }

        if (hasScreenSizeFilter) {
          const sizes = [...new Set(products
            .map(p => p.screenSize)
            .filter(Boolean)
          )].sort((a, b) => parseInt(a) - parseInt(b));
          setAvailableScreenSizes(sizes);
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  }, [validParentCategory, hasScreenSizeFilter]);
  
const handleMinPriceChange = (e) => {
    const value = Math.min(Number(e.target.value), priceRange[1] - 100);
    setPriceRange([value, priceRange[1]]);
  };

  const handleMaxPriceChange = (e) => {
    const value = Math.max(Number(e.target.value), priceRange[0] + 100);
    setPriceRange([priceRange[0], value]);
  };
<div className='mb-4 border-t pt-4'>
                  <button onClick={() => setIsPriceRangeOpen(!isPriceRangeOpen)} className='flex justify-between items-center w-full py-2 text-left font-medium'>
                    <span>Price Range</span>
                    <svg className={`w-5 h-5 transition-transform ${isPriceRangeOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {isPriceRangeOpen && (
                    <div className="px-4 pb-6 mt-4">
                      <div className="flex justify-between mb-3">
                        <span className="text-sm font-medium">₹{priceRange[0]}</span>
                        <span className="text-sm font-medium">₹{priceRange[1]}</span>
                      </div>
                      <div className="relative h-3">
                        <div className="absolute top-1/2 -translate-y-1/2 w-full h-2 bg-brand-productCardImageBg rounded-full" />
                        <div className="absolute top-1/2 -translate-y-1/2 h-2 bg-brand-primary rounded-full" style={{ left: `${((priceRange[0] - minPrice) / (maxPrice - minPrice)) * 100}%`, right: `${100 - ((priceRange[1] - minPrice) / (maxPrice - minPrice)) * 100}%` }} />
                        <input type="range" min={minPrice} max={maxPrice} value={priceRange[0]} onChange={handleMinPriceChange} className="price-range absolute w-full appearance-none bg-transparent pointer-events-none -mt-1" />
                        <input type="range" min={minPrice} max={maxPrice} value={priceRange[1]} onChange={handleMaxPriceChange} className="price-range absolute w-full appearance-none bg-transparent pointer-events-none -mt-1" />
                      </div>
                    </div>
                  )}
                </div>