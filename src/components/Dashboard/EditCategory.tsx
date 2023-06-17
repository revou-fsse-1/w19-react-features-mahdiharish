import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Category } from '../types';

const EditCategoryPage = () => {
  const navigate = useNavigate();
  const { categoryId } = useParams<{ categoryId: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get<{ data: Category }>(
          `https://mock-api.arikmpt.com/api/category/${categoryId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategory(response.data.data);
        setName(response.data.data.name);
        setIsActive(response.data.data.is_active);
      } catch (error) {
        console.error('Failed to fetch category:', error);
      }
    };

    fetchCategory();
  }, [categoryId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      const response = await axios.put<{ data: Category }>(
        `https://mock-api.arikmpt.com/api/category/update`,
        { id: categoryId, name, is_active: isActive },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log('Update response:', response);

      // Handle success

      navigate('/dashboard'); // Navigate back to the dashboard page
    } catch (error) {
      console.error('Failed to update category:', error);
      // Handle error
    }
  };

  if (!category) {
    return <div>Loading...</div>; // Show a loading state while fetching the category data
  }

  console.log('Category:', category);

  return (
    <div>
      <h2>Edit Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="isActive">Active:</label>
          <input
            type="checkbox"
            id="isActive"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default EditCategoryPage;
