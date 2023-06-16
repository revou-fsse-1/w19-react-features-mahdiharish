import { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

interface Category {
  id?: string;
  name: string;
  status: string;
}

const schema = yup.object().shape({
  id: yup.string().optional(),
  name: yup.string().required('Name is required'),
  status: yup.string().required('Status is required'),
});

function Dashboard() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { register, handleSubmit, formState: { errors }, reset } = useForm<Category>({
    resolver: yupResolver<Category>(schema),
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get<Category[]>('https://mock-api.arikmpt.com/api/category');
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddCategory = async (data: Category) => {
    try {
      const response = await axios.post<Category>('https://mock-api.arikmpt.com/api/category/create', data);
      setSuccessMessage('Category added successfully.');
      setCategories([...categories, response.data]);
      reset();
    } catch (error) {
      setErrorMessage('Failed to add category.');
      console.error(error);
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    try {
      await axios.delete(`https://mock-api.arikmpt.com/api/category/${categoryId}`);
      setSuccessMessage('Category deleted successfully.');
      const updatedCategories = categories.filter(category => category.id !== categoryId);
      setCategories(updatedCategories);
    } catch (error) {
      setErrorMessage('Failed to delete category.');
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold my-6">Dashboard Page</h1>
      <div className="my-6">
        <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
        <form onSubmit={handleSubmit(handleAddCategory)} className="w-64">
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2">Name:</label>
            <input type="text" id="name" {...register('name')} className="border border-gray-300 rounded px-2 py-1 w-full" />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block mb-2">Status:</label>
            <select id="status" {...register('status')} className="border border-gray-300 rounded px-2 py-1 w-full">
              <option value="">Select status</option>
              <option value="Active">Active</option>
              <option value="Deactive">Deactive</option>
            </select>
            {errors.status && <p className="text-red-500">{errors.status.message}</p>}
          </div>
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">Add Category</button>
          {successMessage && <p className="text-green-500 my-2">{successMessage}</p>}
          {errorMessage && <p className="text-red-500 my-2">{errorMessage}</p>}
        </form>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <table className="w-full border border-gray-300">
          <thead>
            <tr>
              <th className="border-b py-2 px-4">ID</th>
              <th className="border-b py-2 px-4">Name</th>
              <th className="border-b py-2 px-4">Status</th>
              <th className="border-b py-2 px-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(category => (
              <tr key={category.id}>
                <td className="border-b py-2 px-4">{category.id}</td>
                <td className="border-b py-2 px-4">{category.name}</td>
                <td className="border-b py-2 px-4">{category.status}</td>
                <td className="border-b py-2 px-4">
                  <button className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-700 mr-2">Edit</button>
                  <button onClick={() => handleDeleteCategory(category.id!)} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
