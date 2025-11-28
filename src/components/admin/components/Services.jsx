import React, { useState } from 'react';
import { Search, ChevronDown, Edit2, Trash2 } from 'lucide-react';

const Services = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showSubServiceModal, setShowSubServiceModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingSubService, setEditingSubService] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Sample data structure
  const [serviceCategories, setServiceCategories] = useState([
    {
      id: 1,
      name: 'Aerial Media Services',
      subServices: [
        {
          id: 1,
          code: 'VID',
          name: 'Aerial Photography & Videography',
          price: '₹150/Acre',
          description: 'Professional aerial photo and video capture',
        },
        {
          id: 2,
          code: 'CIN',
          name: 'Cinematography',
          price: '₹200/Acre',
          description: 'High-end cinematic aerial footage',
        },
        {
          id: 3,
          code: 'WED',
          name: 'Wedding Coverage',
          price: '₹180/Acre',
          description: 'Aerial wedding photography and videography',
        },
        {
          id: 4,
          code: 'EDT',
          name: 'Editing',
          price: '₹100/Acre',
          description: 'Post-production editing services',
        },
      ],
    },
    {
      id: 2,
      name: 'Real Estate & Marketing',
      subServices: [
        {
          id: 5,
          code: 'RES',
          name: 'Residential Photography',
          price: '₹120/Acre',
          description: 'Residential property aerial photography',
        },
        {
          id: 6,
          code: 'COM',
          name: 'Commercial Photography',
          price: '₹150/Acre',
          description: 'Commercial property aerial shots',
        },
        {
          id: 7,
          code: 'VRT',
          name: 'Virtual Tours',
          price: '₹200/Acre',
          description: '360-degree virtual property tours',
        },
        {
          id: 8,
          code: 'MKT',
          name: 'Marketing Material',
          price: '₹130/Acre',
          description: 'Marketing content creation',
        },
      ],
    },
    {
      id: 3,
      name: 'Mapping & Surveying',
      subServices: [
        {
          id: 9,
          code: 'TOP',
          name: 'Topographic Mapping',
          price: '₹180/Acre',
          description: 'Detailed topographic surveys',
        },
        {
          id: 10,
          code: 'ORT',
          name: 'Orthomosaic Maps',
          price: '₹170/Acre',
          description: 'High-resolution orthomosaic imagery',
        },
        {
          id: 11,
          code: 'VOL',
          name: 'Volume Calculations',
          price: '₹160/Acre',
          description: 'Stockpile and volume measurements',
        },
        {
          id: 12,
          code: 'LND',
          name: 'Land Survey',
          price: '₹140/Acre',
          description: 'Comprehensive land surveying',
        },
      ],
    },
    {
      id: 4,
      name: 'Agriculture',
      subServices: [
        {
          id: 13,
          code: 'CRP',
          name: 'Crop Health Monitoring',
          price: '₹100/Acre',
          description: 'NDVI crop health analysis',
        },
      ],
    },
    {
      id: 5,
      name: 'Inspection & Infrastructure',
      subServices: [
        {
          id: 14,
          code: 'INS',
          name: 'Infrastructure Inspection',
          price: '₹220/Acre',
          description: 'Building and infrastructure inspection',
        },
        {
          id: 15,
          code: 'SOL',
          name: 'Solar Panel Inspection',
          price: '₹190/Acre',
          description: 'Solar farm inspection and analysis',
        },
        {
          id: 16,
          code: 'PWR',
          name: 'Power Line Inspection',
          price: '₹210/Acre',
          description: 'Power line and tower inspection',
        },
        {
          id: 17,
          code: 'BRG',
          name: 'Bridge Inspection',
          price: '₹230/Acre',
          description: 'Bridge structural inspection',
        },
      ],
    },
    {
      id: 6,
      name: 'Specialized Operations',
      subServices: [
        {
          id: 18,
          code: 'THR',
          name: 'Thermal Imaging',
          price: '₹250/Acre',
          description: 'Thermal camera inspections',
        },
        {
          id: 19,
          code: 'SAR',
          name: 'Search & Rescue',
          price: '₹300/Acre',
          description: 'Emergency search and rescue operations',
        },
        {
          id: 20,
          code: 'ENV',
          name: 'Environmental Monitoring',
          price: '₹180/Acre',
          description: 'Environmental assessment and monitoring',
        },
      ],
    },
    {
      id: 7,
      name: 'Support & Training',
      subServices: [
        {
          id: 21,
          code: 'TRN',
          name: 'Pilot Training',
          price: '₹500/Session',
          description: 'Professional drone pilot training',
        },
        {
          id: 22,
          code: 'MNT',
          name: 'Maintenance',
          price: '₹150/Hour',
          description: 'Drone maintenance services',
        },
      ],
    },
    {
      id: 8,
      name: 'Other',
      subServices: [
        {
          id: 23,
          code: 'CUS',
          name: 'Custom Services',
          price: 'Custom',
          description: 'Customized drone services',
        },
      ],
    },
  ]);

  const toggleCategory = (categoryId) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  const handleAddSubService = (category) => {
    setSelectedCategory(category);
    setEditingSubService(null);
    setShowSubServiceModal(true);
  };

  const handleEditSubService = (category, subService) => {
    setSelectedCategory(category);
    setEditingSubService(subService);
    setShowSubServiceModal(true);
  };

  const handleDeleteSubService = (categoryId, subServiceId) => {
    const category = serviceCategories.find((cat) => cat.id === categoryId);
    const subService = category?.subServices.find(
      (sub) => sub.id === subServiceId
    );
    setDeleteTarget({
      type: 'subService',
      categoryId,
      subServiceId,
      name: subService?.name || '',
    });
    setShowDeleteModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowCategoryModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    const category = serviceCategories.find((cat) => cat.id === categoryId);
    setDeleteTarget({
      type: 'category',
      categoryId,
      name: category?.name || '',
    });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (deleteTarget?.type === 'category') {
      setServiceCategories((prevCategories) =>
        prevCategories.filter((cat) => cat.id !== deleteTarget.categoryId)
      );
    } else if (deleteTarget?.type === 'subService') {
      setServiceCategories((prevCategories) =>
        prevCategories.map((cat) =>
          cat.id === deleteTarget.categoryId
            ? {
                ...cat,
                subServices: cat.subServices.filter(
                  (sub) => sub.id !== deleteTarget.subServiceId
                ),
              }
            : cat
        )
      );
    }
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setDeleteTarget(null);
  };

  const filteredCategories = serviceCategories.filter(
    (category) =>
      category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.subServices.some((sub) =>
        sub.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <div className='w-full bg-[#fafffd] px-6 xl:px-11 py-3 lg:py-6'>
      <div className='bg-white rounded-lg shadow-sm'>
        {/* Header */}
        <div className='p-4 md:p-6 border-b border-gray-200'>
          <h1 className='text-xl md:text-2xl font-bold text-gray-900'>
            Services Management
          </h1>
          <p className='text-sm md:text-base text-gray-600 mt-1'>
            Manage drone service categories and sub-services for booking system
          </p>
        </div>

        {/* Actions Bar */}
        <div className='p-4 md:p-6 flex flex-col md:flex-row gap-3 md:gap-4 justify-between items-stretch md:items-center'>
          <button
            onClick={() => {
              setEditingCategory(null);
              setShowCategoryModal(true);
            }}
            className='w-full md:w-auto px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200'
          >
            Add Service Category
          </button>

          <div className='relative w-full md:w-80 lg:w-96'>
            <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
            <input
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className='w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
            />
          </div>
        </div>

        {/* Service Categories List */}
        <div className='px-4 md:px-6 pb-4 md:pb-6 space-y-3 md:space-y-4'>
          {filteredCategories.map((category) => (
            <div
              key={category.id}
              className='border border-gray-200 rounded-lg overflow-hidden'
            >
              {/* Category Header */}
              <div className='bg-gray-50 px-4 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3'>
                <div className='flex items-center gap-3 md:gap-4 min-w-0'>
                  <div className='w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-lg flex items-center justify-center flex-shrink-0'>
                    <div className='w-6 h-6 md:w-8 md:h-8 bg-white/50 rounded'></div>
                  </div>
                  <div className='min-w-0 flex-1'>
                    <h3 className='text-base md:text-lg font-semibold text-gray-900 truncate'>
                      {category.name}
                    </h3>
                    <p className='text-xs md:text-sm text-gray-600'>
                      {category.subServices.length} sub-services
                    </p>
                  </div>
                </div>

                <div className='flex items-center gap-2 md:gap-3 flex-wrap sm:flex-nowrap'>
                  <button
                    onClick={() => handleAddSubService(category)}
                    className='flex-1 sm:flex-none px-3 md:px-4 py-1.5 md:py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 text-xs md:text-sm font-medium rounded-lg transition-colors duration-200 whitespace-nowrap'
                  >
                    Add Sub Service
                  </button>
                  <div className='flex items-center gap-1 md:gap-2'>
                    <button
                      onClick={() => handleEditCategory(category)}
                      className='p-1.5 md:p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200'
                      aria-label='Edit category'
                    >
                      <Edit2 className='w-4 h-4 md:w-5 md:h-5 text-gray-600' />
                    </button>
                    <button
                      onClick={() => handleDeleteCategory(category.id)}
                      className='p-1.5 md:p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200'
                      aria-label='Delete category'
                    >
                      <Trash2 className='w-4 h-4 md:w-5 md:h-5 text-gray-600' />
                    </button>
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className='p-1.5 md:p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200'
                      aria-label='Toggle category'
                    >
                      <ChevronDown
                        className={`w-4 h-4 md:w-5 md:h-5 text-gray-600 transition-transform duration-200 ${
                          expandedCategory === category.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>

              {/* Sub-services List */}
              {expandedCategory === category.id && (
                <div className='bg-white divide-y divide-gray-100'>
                  {category.subServices.map((subService) => (
                    <div
                      key={subService.id}
                      className='px-4 md:px-6 py-3 md:py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-gray-50 transition-colors duration-150'
                    >
                      <div className='flex items-center gap-3 md:gap-4 min-w-0 flex-1'>
                        <div className='w-10 h-10 md:w-12 md:h-12 bg-gray-300 rounded-lg flex items-center justify-center flex-shrink-0'>
                          <div className='w-6 h-6 md:w-8 md:h-8 bg-white/50 rounded'></div>
                        </div>
                        <div className='min-w-0 flex-1'>
                          <h4 className='text-sm md:text-base font-semibold text-gray-900 truncate'>
                            {subService.name}
                          </h4>
                          <p className='text-xs md:text-sm text-gray-600 line-clamp-2'>
                            {subService.description}
                          </p>
                        </div>
                      </div>

                      <div className='flex items-center gap-2 md:gap-3 justify-end sm:justify-start'>
                        <button
                          onClick={() =>
                            handleEditSubService(category, subService)
                          }
                          className='p-1.5 md:p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200'
                          aria-label='Edit sub-service'
                        >
                          <Edit2 className='w-4 h-4 md:w-5 md:h-5 text-gray-600' />
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteSubService(category.id, subService.id)
                          }
                          className='p-1.5 md:p-2 hover:bg-gray-200 rounded-lg transition-colors duration-200'
                          aria-label='Delete sub-service'
                        >
                          <Trash2 className='w-4 h-4 md:w-5 md:h-5 text-gray-600' />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Add/Edit Service Category Modal */}
      {showCategoryModal && (
        <CategoryModal
          category={editingCategory}
          onClose={() => {
            setShowCategoryModal(false);
            setEditingCategory(null);
          }}
          onSave={(categoryData) => {
            if (editingCategory) {
              // Edit existing category
              setServiceCategories((prevCategories) =>
                prevCategories.map((cat) =>
                  cat.id === editingCategory.id
                    ? { ...cat, name: categoryData.name }
                    : cat
                )
              );
            } else {
              // Add new category
              const newCategory = {
                id: Date.now(),
                name: categoryData.name,
                subServices: [],
              };
              setServiceCategories((prev) => [...prev, newCategory]);
            }
            setShowCategoryModal(false);
            setEditingCategory(null);
          }}
        />
      )}

      {/* Add/Edit Sub-service Modal */}
      {showSubServiceModal && selectedCategory && (
        <SubServiceModal
          category={selectedCategory}
          subService={editingSubService}
          onClose={() => {
            setShowSubServiceModal(false);
            setSelectedCategory(null);
            setEditingSubService(null);
          }}
          onSave={(subServiceData) => {
            if (editingSubService) {
              // Edit existing sub-service
              setServiceCategories((prevCategories) =>
                prevCategories.map((cat) =>
                  cat.id === selectedCategory.id
                    ? {
                        ...cat,
                        subServices: cat.subServices.map((sub) =>
                          sub.id === editingSubService.id
                            ? { ...sub, ...subServiceData }
                            : sub
                        ),
                      }
                    : cat
                )
              );
            } else {
              // Add new sub-service
              const newSubService = {
                id: Date.now(),
                ...subServiceData,
              };
              setServiceCategories((prevCategories) =>
                prevCategories.map((cat) =>
                  cat.id === selectedCategory.id
                    ? {
                        ...cat,
                        subServices: [...cat.subServices, newSubService],
                      }
                    : cat
                )
              );
            }
            setShowSubServiceModal(false);
            setSelectedCategory(null);
            setEditingSubService(null);
          }}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          type={deleteTarget?.type}
          name={deleteTarget?.name}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

// Category Modal Component
const CategoryModal = ({ category, onClose, onSave }) => {
  const [categoryName, setCategoryName] = useState(category?.name || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (categoryName.trim()) {
      onSave({ name: categoryName });
    }
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto'>
        <form onSubmit={handleSubmit}>
          <div className='p-4 md:p-6'>
            <h2 className='text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6'>
              {category ? 'Edit Service Category' : 'Add Service Category'}
            </h2>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Category Name
                </label>
                <input
                  type='text'
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  placeholder='Aerial Media Services'
                  className='w-full px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                  required
                />
              </div>
            </div>
          </div>

          <div className='flex gap-2 md:gap-3 px-4 md:px-6 pb-4 md:pb-6'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-4 py-2 md:py-2.5 text-sm md:text-base border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='flex-1 px-4 py-2 md:py-2.5 text-sm md:text-base bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200'
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Sub-service Modal Component
const SubServiceModal = ({ category, subService, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    code: subService?.code || '',
    name: subService?.name || '',
    price: subService?.price || '',
    description: subService?.description || '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      formData.code &&
      formData.name &&
      formData.price &&
      formData.description
    ) {
      onSave(formData);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto'>
        <form onSubmit={handleSubmit}>
          <div className='p-4 md:p-6'>
            <h2 className='text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6'>
              {subService
                ? `Edit Sub-service`
                : `Add Sub-service to ${category.name}`}
            </h2>

            <div className='space-y-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Service Code
                </label>
                <input
                  type='text'
                  value={formData.code}
                  onChange={(e) => handleChange('code', e.target.value)}
                  placeholder='E.G. VID'
                  className='w-full px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Service Name
                </label>
                <input
                  type='text'
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder='Aerial Photography & Videography'
                  className='w-full px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Service Price
                </label>
                <input
                  type='text'
                  value={formData.price}
                  onChange={(e) => handleChange('price', e.target.value)}
                  placeholder='₹150/ Acre'
                  className='w-full px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent'
                  required
                />
              </div>

              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => handleChange('description', e.target.value)}
                  placeholder='Brief description of the service...'
                  rows={3}
                  className='w-full px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none'
                  required
                />
              </div>
            </div>
          </div>

          <div className='flex gap-2 md:gap-3 px-4 md:px-6 pb-4 md:pb-6'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-4 py-2 md:py-2.5 text-sm md:text-base border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors duration-200'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='flex-1 px-4 py-2 md:py-2.5 text-sm md:text-base bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-colors duration-200'
            >
              Create Category
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Delete Confirmation Modal Component
const DeleteConfirmationModal = ({ type, name, onConfirm, onCancel }) => {
  const getMessage = () => {
    if (type === 'category') {
      return 'Are you sure you want to delete this category?';
    }
    return 'Are you sure you want to delete this sub-service?';
  };

  return (
    <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
      <div className='bg-white rounded-xl shadow-xl w-full max-w-md'>
        <div className='p-6'>
          <h2 className='text-lg md:text-xl font-semibold text-gray-900 mb-2'>
            {name || 'localhost:5173 says'}
          </h2>
          <p className='text-sm md:text-base text-gray-700 mb-6'>
            {getMessage()}
          </p>

          <div className='flex gap-3 justify-end'>
            <button
              onClick={onCancel}
              className='px-6 py-2 text-sm md:text-base text-gray-700 font-medium rounded-lg hover:bg-gray-100 transition-colors duration-200'
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className='px-6 py-2 text-sm md:text-base bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200'
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
