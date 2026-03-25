// src/hooks/useCategories.js
import { useState, useEffect, useCallback, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import SummaryApi from '../common/SummaryApi';

// Helper function to get auth token
const getAuthToken = () => {
    return localStorage.getItem('token');
};

// Helper function to create FormData for file uploads
const createFormData = (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
        if (data[key] !== null && data[key] !== undefined) {
            formData.append(key, data[key]);
        }
    });
    return formData;
};

export const useCategories = () => {
    const [topCategories, setTopCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // API Service functions integrated within the hook
    const apiService = useMemo(() => ({
        // Top Categories
        fetchAllTopCategories: async () => {
            const response = await fetch(SummaryApi.getAllTopCategories.url, {
                method: SummaryApi.getAllTopCategories.method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        },

        createTopCategory: async (categoryData) => {
            const formData = createFormData(categoryData);
            const response = await fetch(SummaryApi.createTopCategory.url, {
                method: SummaryApi.createTopCategory.method,
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        },

        updateTopCategory: async (id, categoryData) => {
          console.log(id);
          
            const formData = createFormData(categoryData);
            const response = await fetch(`${SummaryApi.updateTopCategory.url(id)}`, {
                method: SummaryApi.updateTopCategory.method,
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            console.log(response.data);
            
            return await response.json();
        },

        deleteTopCategory: async (id) => {
            const response = await fetch(`${SummaryApi.deleteTopCategory.url(id)}`, {
                method: SummaryApi.deleteTopCategory.method,
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        },

        hideTopCategory: async (id) => {
            const response = await fetch(`${SummaryApi.hideTopCategory.url(id)}`, {
                method: SummaryApi.hideTopCategory.method,
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        },

        // Sub Categories
        fetchAllSubCategories: async () => {
            const response = await fetch(SummaryApi.getAllSubCategories.url, {
                method: SummaryApi.getAllSubCategories.method,
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        },

        createSubCategory: async (subCategoryData) => {
            const formData = createFormData(subCategoryData);
            const response = await fetch(SummaryApi.createSubCategory.url, {
                method: SummaryApi.createSubCategory.method,
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        },

        updateSubCategory: async (id, subCategoryData) => {
            const formData = createFormData(subCategoryData);
            const response = await fetch(`${SummaryApi.updateSubCategory.url(id)}`, {
                method: SummaryApi.updateSubCategory.method,
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`
                },
                body: formData
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        },

        deleteSubCategory: async (id) => {
            const response = await fetch(`${SummaryApi.deleteSubCategory.url(id)}`, {
                method: SummaryApi.deleteSubCategory.method,
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        },

        hideSubCategory: async (id) => {
            const response = await fetch(`${SummaryApi.hideSubCategory.url(id)}`, {
                method: SummaryApi.hideSubCategory.method,
                headers: {
                    'Authorization': `Bearer ${getAuthToken()}`,
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            return await response.json();
        }
    }), []);



  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const [topCategoriesResponse, subCategoriesResponse] = await Promise.all([
        apiService.fetchAllTopCategories(),
        apiService.fetchAllSubCategories(),
      ]);

      setTopCategories(topCategoriesResponse.data || topCategoriesResponse || []);
      setSubCategories(subCategoriesResponse.data || subCategoriesResponse || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error.message);
      toast.error('Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  }, [apiService]); // You can safely leave apiService empty if it's static
    // Fetch data on component mount
    useEffect(() => {
        fetchAllData();
    }, [fetchAllData]);

    const addTopCategory = async (categoryData) => {
        try {
            const response = await apiService.createTopCategory(categoryData);
            
            // Add to local state
            const newCategory = response.data || response;
            setTopCategories(prev => [...prev, newCategory]);
            
            toast.success('Category created successfully');
            return newCategory;
        } catch (error) {
            console.error('Error adding top category:', error);
            toast.error('Failed to create category');
            throw error;
        }
    };

    const addSubCategory = async (subCategoryData) => {
        try {
            const response = await apiService.createSubCategory(subCategoryData);
            
            // Add to local state
            const newSubCategory = response.data || response;
            setSubCategories(prev => [...prev, newSubCategory]);
            
            toast.success('Sub-category created successfully');
            return newSubCategory;
        } catch (error) {
            console.error('Error adding sub category:', error);
            toast.error('Failed to create sub-category');
            throw error;
        }
    };

    const updateTopCategory = async (id, categoryData) => {
        try {
            const response = await apiService.updateTopCategory(id, categoryData);
            
            // Update local state
            const updatedCategory = response.data || response;
            setTopCategories(prev => 
                prev.map(cat => cat.id === id || cat._id === id ? { ...cat, ...updatedCategory } : cat)
            );
            
            toast.success('Category updated successfully');
            return updatedCategory;
        } catch (error) {
            console.error('Error updating top category:', error);
            toast.error('Failed to update category');
            throw error;
        }
    };

    const updateSubCategory = async (id, subCategoryData) => {
        try {
            const response = await apiService.updateSubCategory(id, subCategoryData);
            
            // Update local state
            const updatedSubCategory = response.data || response;
            setSubCategories(prev => 
                prev.map(sub => sub.id === id || sub._id === id ? { ...sub, ...updatedSubCategory } : sub)
            );
            
            toast.success('Sub-category updated successfully');
            return updatedSubCategory;
        } catch (error) {
            console.error('Error updating sub category:', error);
            toast.error('Failed to update sub-category');
            throw error;
        }
    };

    const deleteTopCategory = async (id) => {
        try {
            await apiService.deleteTopCategory(id);
            
            // Remove from local state
            setTopCategories(prev => prev.filter(cat => cat.id !== id && cat._id !== id));
            setSubCategories(prev => prev.filter(sub => sub.categoryId !== id && sub.topCategoryId !== id));
            
            toast.success('Category deleted successfully');
        } catch (error) {
            console.error('Error deleting top category:', error);
            toast.error('Failed to delete category');
            throw error;
        }
    };

    const deleteSubCategory = async (id) => {
        try {
            await apiService.deleteSubCategory(id);
            
            // Remove from local state
            setSubCategories(prev => prev.filter(sub => sub.id !== id && sub._id !== id));
            
            toast.success('Sub-category deleted successfully');
        } catch (error) {
            console.error('Error deleting sub category:', error);
            toast.error('Failed to delete sub-category');
            throw error;
        }
    };

    const toggleTopCategoryVisibility = async (id) => {
        try {
            await apiService.hideTopCategory(id);
            
            // Toggle in local state
            setTopCategories(prev => 
                prev.map(cat => 
                    (cat.id === id || cat._id === id) ? { ...cat, hidden: !cat.hidden, isHidden: !cat.isHidden } : cat
                )
            );
            
            toast.success('Category visibility updated');
        } catch (error) {
            console.error('Error toggling top category visibility:', error);
            toast.error('Failed to update category visibility');
            throw error;
        }
    };

    const toggleSubCategoryVisibility = async (id) => {
        try {
            await apiService.hideSubCategory(id);
            
            // Toggle in local state
            setSubCategories(prev => 
                prev.map(sub => 
                    (sub.id === id || sub._id === id) ? { ...sub, hidden: !sub.hidden, isHidden: !sub.isHidden } : sub
                )
            );
            
            toast.success('Sub-category visibility updated');
        } catch (error) {
            console.error('Error toggling sub category visibility:', error);
            toast.error('Failed to update sub-category visibility');
            throw error;
        }
    };

    return {
        topCategories,
        subCategories,
        loading,
        error,
        addTopCategory,
        addSubCategory,
        updateTopCategory,
        updateSubCategory,
        deleteTopCategory,
        deleteSubCategory,
        toggleSubCategoryVisibility,
        toggleTopCategoryVisibility,
        refetch: fetchAllData
    };
};
