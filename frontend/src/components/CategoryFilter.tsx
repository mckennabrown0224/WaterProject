import { useEffect, useState } from 'react';
import './CategoryFilter.css';

function CategoryFilter({
  selectedCategories,
  setSelectedCategories
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  // State to store the list of categories fetched from the API
  const [categories, setCategories] = useState<string[]>([]);

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        // Fetch category data from the API
        const response = await fetch(
          'https://localhost:4050/api/Water/GetProjectTypes'
        );
        
        // Parse the response as JSON
        const data = await response.json();
        console.log('Fetched categories: ', data);
        
        // Update state with fetched categories
        setCategories(data);
        // Initialize selected categories with all fetched categories
        setSelectedCategories(data);
      } catch (error) {
        // Log an error message if fetching fails
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, [setSelectedCategories]); // Dependency array ensures this effect runs only once

  // Handle checkbox selection changes
  function handleCheckboxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((x) => x !== target.value) // Remove if already selected
      : [...selectedCategories, target.value]; // Add if newly selected
  
    // Update selected categories state
    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h5>Project Types:</h5>
      <div className="category-list">
        {categories.map((c) => (
          <div key={c} className="category-item">
            <input
              className="category-checkbox"
              type="checkbox"
              id={c}
              value={c}
              checked={selectedCategories.includes(c)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={c}>{c}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
