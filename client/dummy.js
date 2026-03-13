<div className="overflow-x-auto rounded-md">
        <table className="min-w-full bg-white border-separate border-spacing-y-2 px-2">
          <thead className="text-sm text-gray-600">
            <tr className="text-center rounded-lg shadow-sm bg-purple-100">
              <th className="py-4 px-4 rounded-l-lg">S.No</th>
              <th className="py-4 px-4">Order ID</th>
              <th className="py-4 px-4 whitespace-nowrap">Invoice ID</th>
              <th className="py-4 px-4">Customer</th>
              <th className="py-4 px-4">Branch</th>
              <th className="py-4 px-4 whitespace-nowrap">Delivered Date</th>
              <th className="py-4 px-4 whitespace-nowrap">Assigned Staff</th>
              <th className="py-4 px-4 whitespace-nowrap">Delivery Address</th>
              <th className="py-4 px-4 whitespace-nowrap">Payment</th>
              <th className="py-4 px-4 whitespace-nowrap rounded-r-lg">Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((order, index) => (
              <tr
                key={order.orderId}
                className="bg-gray-50 hover:bg-gray-100 text-sm rounded-lg shadow-sm text-center"
              >
                <td className="py-3 px-4 font-medium text-gray-700 rounded-l-lg">
                  {itemsPerPage !== "All"
                    ? currentPage * itemsPerPage -
                    itemsPerPage +
                    serialNumber++
                    : serialNumber++}
                </td>
                <td className="py-3 px-4 font-medium text-gray-700 capitalize">
                  {order.orderId}
                </td>
                <td className="py-3 px-4 font-medium text-gray-700 whitespace-nowrap">
                  {order.invoiceId || "-"}
                </td>
                <td className="py-3 px-4">
                  <div>
                    <div className="font-medium whitespace-nowrap">{order.customer.name}</div>
                    <div className="text-xs text-gray-500">{order.customer.phoneNumber}</div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div>
                    <div className='whitespace-nowrap'>{order.branch?.branchCode}</div>
                    <div className="text-xs text-gray-500">
                      {order.branch.branchName.replace(/\s*Branch\s*$/i, "")}
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  {format(new Date(order?.date), "dd-MM-yyyy") || "N/A"}
                </td>
                <td className="py-3 px-4">
                  {order?.cuttingMaster?.name || order?.tailor?.name ? (
                    <div className="relative">
                      {/* Collapsed view */}
                      {expandedOrderId !== order._id && (
                        <div
                          className="cursor-pointer flex items-center"
                          onClick={() => setExpandedOrderId(order._id)}
                        >
                          <span>
                            {order?.cuttingMaster?.name?.split(' ')[0] ||
                              order?.tailor?.name?.split(' ')[0]}
                          </span>

                          {/* Show +1 if both names exist and are different */}
                          {(order?.cuttingMaster?.name &&
                            order?.tailor?.name &&
                            order.cuttingMaster.name !== order.tailor.name) && (
                              <span className="text-xs bg-gray-100 rounded px-1 ml-1">+1</span>
                            )}
                        </div>
                      )}

                      {/* Expanded view */}
                      {expandedOrderId === order._id && (
                        <div
                          className="cursor-pointer space-y-1"
                          onClick={() => setExpandedOrderId(null)}
                        >
                          {order?.cuttingMaster?.name && (
                            <div className="text-sm">{order.cuttingMaster.name} (cutting)</div>
                          )}

                          {order?.tailor?.name && (
                            <div className="text-sm">{order.tailor.name} (tailor)</div>
                          )}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-gray-400 items-center text-lg"><Minus /></div>
                  )}
                </td>
                <td className="py-3 px-4">{order.customer.address}</td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <StatusBadge status={order.paymentStatus} type='payment' />
                </td>
                <td className="py-3 px-4 whitespace-nowrap rounded-r-lg">
                  <StatusBadge status={order.status} type='order' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>


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
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />                    </svg>
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