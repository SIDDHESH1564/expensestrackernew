import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const IncomeSources = ['Salary', 'Freelance Work', 'Investment', 'Other'];

export default function IncomeForm() {
  const [formData, setFormData] = useState({
    amount: '',
    date: '',
    description: '',
    income_source: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData); // Replace with your logic to send data to backend or perform actions
    setFormSubmitted(true);
    // Reset form after submission if needed
    setFormData({
      amount: '',
      date: '',
      description: '',
      income_source: '',
    });
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8">
      {/* Background Shape */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[10rem] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 -z-10 aspect-[1155/678] w-[36.125rem] max-w-none -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-40rem)] sm:w-[72.1875rem]"
        />
      </div>
      {/* Content */}
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Add Your Income</h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Keep a record of income to manage your finances effectively.
        </p>
      </div>
      {/* Form */}
      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold leading-6 text-gray-900">
              Amount
            </label>
            <div className="mt-2.5">
              <input
                id="amount"
                name="amount"
                type="number"
                step="0.01"
                autoComplete="off"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Date */}
          <div>
            <label htmlFor="date" className="block text-sm font-semibold leading-6 text-gray-900">
              Date
            </label>
            <div className="mt-2.5">
              <input
                id="date"
                name="date"
                type="date"
                autoComplete="off"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Description */}
          <div className="sm:col-span-2">
            <label htmlFor="description" className="block text-sm font-semibold leading-6 text-gray-900">
              Description
            </label>
            <div className="mt-2.5">
              <textarea
                id="description"
                name="description"
                rows={4}
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          {/* Income Source */}
          <div className="sm:col-span-2">
            <label htmlFor="income_source" className="block text-sm font-semibold leading-6 text-gray-900">
              Income Source
            </label>
            <div className="relative mt-2.5">
              <select
                id="income_source"
                name="income_source"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={formData.income_source}
                onChange={handleChange}
                required
              >
                {IncomeSources.map((source) => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
              <ChevronDownIcon
                aria-hidden="true"
                className="pointer-events-none absolute right-3 top-0 h-full w-5 text-gray-400"
              />
            </div>
          </div>
        </div>
        {/* Submit Button */}
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Add Income
          </button>
        </div>
        {/* Success Message */}
        {formSubmitted && (
          <p className="mt-4 text-green-600 text-center">Income data added successfully!</p>
        )}
      </form>
    </div>
  );
}
