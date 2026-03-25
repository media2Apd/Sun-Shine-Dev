import { useEffect, useState, useMemo } from "react";
import SummaryAPI from "../common/SummaryApi";
import axios from "axios";

export const useProducts = (filters = {}) => {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH ALL PRODUCTS ONCE ---------------- */
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios({
          method: SummaryAPI.getAllUserProducts.method,
          url: SummaryAPI.getAllUserProducts.url
        });

        setAllProducts(res.data.products || []);
      } catch (err) {
        console.error("Fetch products error", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getProductPriceRange = (product) => {
    const prices =
      product.variants?.flatMap(v =>
        v.sizes?.map(s => Number(s.price)) || []
      ) || [];

    if (!prices.length) {
      return { min: 0, max: 0 };
    }

    return {
      min: Math.min(...prices),
      max: Math.max(...prices)
    };
  };


  /* ---------------- APPLY FILTERS (ONE PLACE) ---------------- */
  const filteredProducts = useMemo(() => {
    let data = [...allProducts];

    /* ✅ SUB CATEGORY FILTER */
    if (filters.categories?.length) {
      data = data.filter(p =>
        filters.categories.includes(p.subCategory?.slug)
      );
    }

    // /* ✅ PRODUCT FLAGS FILTER */
    // if (filters.flags?.bestSeller) {
    //   data = data.filter(p => p.bestSeller === true);
    // }

    // if (filters.flags?.newArrivals) {
    //   data = data.filter(p => p.newArrivals === true);
    // }
    
    /* ✅ PRODUCT FLAGS FILTER (OR LOGIC) */
    if (filters.flags?.bestSeller || filters.flags?.newArrivals) {
      data = data.filter((p) => {
        return (
          (filters.flags.bestSeller && p.bestSeller === true) ||
          (filters.flags.newArrivals && p.newArrivals === true)
        );
      });
    }



    /* ✅ BRAND FILTER */
    if (filters.brands?.length) {
      data = data.filter(p =>
        filters.brands.includes(p.brand)
      );
    }

    /* ✅ PRICE RANGE FILTER (USING BACKEND minPrice / maxPrice) */
    // if (
    //   filters.price &&
    //   filters.price.min !== null &&
    //   filters.price.max !== null
    // ) {
    //   const { min, max } = filters.price;

    //   // Myntra-style overlap logic
    //   data = data.filter(p =>
    //     p.maxPrice >= min && p.minPrice <= max
    //   );
    // }

    if (
      filters.price &&
      filters.price.min !== null &&
      filters.price.max !== null
    ) {
      const { min, max } = filters.price;

      data = data.filter((p) =>
        p.variants?.some((v) =>
          v.sizes?.some((s) => {
            const price = Number(s.price);
            return price >= min && price <= max;
          })
        )
      );
    }

    /* ✅ SIZE FILTER */
    if (filters.sizes?.length) {
      data = data.filter(p =>
        p.variants?.some(v =>
          v.sizes?.some(s =>
            filters.sizes.includes(s.size)
          )
        )
      );
    }

    /* ✅ COLOR FILTER */
    if (filters.colors?.length) {
      data = data.filter(p =>
        p.variants?.some(v =>
          filters.colors.includes(
            v.colorName?.toLowerCase()
          )
        )
      );
    }

    return data;
  }, [allProducts, filters]);

  /* ---------------- BRAND COUNTS (CATEGORY AWARE) ---------------- */
  const brandCounts = useMemo(() => {
    const counts = {};
    let base = [...allProducts];

    // Only category should affect brand availability
    if (filters.categories?.length) {
      base = base.filter(p =>
        filters.categories.includes(p.subCategory?.slug)
      );
    }

    base.forEach((p) => {
      if (!p.brand) return;
      counts[p.brand] = (counts[p.brand] || 0) + 1;
    });

    return counts;
  }, [allProducts, filters.categories]);

  const priceBounds = useMemo(() => {
    let min = Infinity;
    let max = 0;

    allProducts.forEach((p) => {
      p.variants?.forEach((v) => {
        v.sizes?.forEach((s) => {
          const price = Number(s.price);
          if (!isNaN(price)) {
            if (price < min) min = price;
            if (price > max) max = price;
          }
        });
      });
    });

    if (min === Infinity) min = 0;

    return { min, max };
  }, [allProducts]);

  /* ---------------- CATEGORY COUNTS ---------------- */
  const categoryCounts = useMemo(() => {
    const counts = {};
    let base = [...allProducts];

    // Other filters should NOT affect category availability
    if (filters.brands?.length) {
      base = base.filter(p => filters.brands.includes(p.brand));
    }

    base.forEach((p) => {
      const slug = p.subCategory?.slug;
      const name = p.subCategory?.name;

      if (!slug || !name) return;

      if (!counts[slug]) {
        counts[slug] = {
          label: name,
          count: 0
        };
      }

      counts[slug].count += 1;
    });

    return counts;
  }, [allProducts, filters.brands]);

  const availableSizes = useMemo(() => {
    const sizeSet = new Set();

    let base = [...allProducts];

    // category decides size relevance
    if (filters.categories?.length) {
      base = base.filter(p =>
        filters.categories.includes(p.subCategory?.slug)
      );
    }

    base.forEach(p => {
      p.variants?.forEach(v => {
        v.sizes?.forEach(s => {
          if (s.size) {
            sizeSet.add(String(s.size));
          }
        });
      });
    });

    return Array.from(sizeSet);
  }, [allProducts, filters.categories]);

  /* ---------------- COLOR OPTIONS (DYNAMIC) ---------------- */
  const colorOptions = useMemo(() => {
    const map = new Map();

    allProducts.forEach((product) => {
      product.variants?.forEach((variant) => {
        const name = variant.colorName?.toLowerCase();
        const hex = variant.colorCode || variant.hex;

        if (name && hex && !map.has(name)) {
          map.set(name, hex);
        }
      });
    });

    return Array.from(map.entries()).map(([name, hex]) => ({
      name,
      hex
    }));
  }, [allProducts]);



  return {
    products: filteredProducts,
    loading,
    brandCounts,
    categoryCounts,
    priceBounds,
    availableSizes,
    colorOptions
  };
};
