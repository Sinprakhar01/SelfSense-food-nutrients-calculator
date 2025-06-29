'use client';
import React, { useState, useMemo, useEffect } from 'react';
import CountUp from 'react-countup';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { 
  Apple, 
  Beef, 
  Milk, 
  Wheat, 
  Coffee, 
  Carrot, 
  Droplets,
  Sun, 
  Moon, 
  Filter,
  Clock,
  AlertTriangle,
  CheckCircle,
  ChefHat,
  Refrigerator,
  TrendingUp,
  Calendar,
  Twitter,
  Facebook,
  Instagram,
  Mail,
  Shield,
  FileText,
  Phone,
  Edit3,
  Plus,
  Trash2,
  Save,
  X,
  Settings,
  Minus,
  ChevronDown, 
  ChevronUp
} from 'lucide-react';

interface FoodItem {
  id: string;
  name: string;
  category: 'vegetables' | 'fruits' | 'dairy' | 'meats' | 'grains' | 'beverages' | 'condiments';
  expiryDate: string;
  quantity: number;
  unit: 'bunch' | 'lbs' | 'container' | 'loaf' | 'cup' | 'pieces' | 'carton' | 'oz' | 'bottle' | 'heads' | 'jar' | 'box';
  macros: {
    proteins: number;
    carbohydrates: number;
    fats: number;
    fiber: number;
  };
  calories: number;
}

interface DailyGoals {
  proteins: number;
  carbohydrates: number;
  fats: number;
  fiber: number;
}

const mockFoodData: FoodItem[] = [
  { id: '1', name: 'Organic Spinach', category: 'vegetables', expiryDate: '2025-06-03', quantity: 1, unit: 'bunch', macros: { proteins: 2.9, carbohydrates: 3.6, fats: 0.4, fiber: 2.2 }, calories: 23 },
  { id: '2', name: 'Chicken Breast', category: 'meats', expiryDate: '2025-06-05', quantity: 2, unit: 'lbs', macros: { proteins: 31, carbohydrates: 0, fats: 3.6, fiber: 0 }, calories: 165 },
  { id: '3', name: 'Greek Yogurt', category: 'dairy', expiryDate: '2025-06-08', quantity: 1, unit: 'container', macros: { proteins: 20, carbohydrates: 9, fats: 0, fiber: 0 }, calories: 130 },
  { id: '4', name: 'Whole Wheat Bread', category: 'grains', expiryDate: '2025-06-07', quantity: 1, unit: 'loaf', macros: { proteins: 13, carbohydrates: 43, fats: 4, fiber: 6 }, calories: 247 },
  { id: '5', name: 'Blueberries', category: 'fruits', expiryDate: '2025-06-04', quantity: 1, unit: 'cup', macros: { proteins: 1.1, carbohydrates: 21, fats: 0.5, fiber: 3.6 }, calories: 84 },
  { id: '6', name: 'Salmon Fillet', category: 'meats', expiryDate: '2025-06-02', quantity: 4, unit: 'pieces', macros: { proteins: 25, carbohydrates: 0, fats: 11, fiber: 0 }, calories: 206 },
  { id: '7', name: 'Almond Milk', category: 'beverages', expiryDate: '2025-06-10', quantity: 1, unit: 'carton', macros: { proteins: 1, carbohydrates: 8, fats: 2.5, fiber: 1 }, calories: 39 },
  { id: '8', name: 'Bell Peppers', category: 'vegetables', expiryDate: '2025-06-06', quantity: 3, unit: 'pieces', macros: { proteins: 1, carbohydrates: 7, fats: 0.3, fiber: 2.5 }, calories: 31 },
  { id: '9', name: 'Cheddar Cheese', category: 'dairy', expiryDate: '2025-06-12', quantity: 8, unit: 'oz', macros: { proteins: 25, carbohydrates: 1, fats: 33, fiber: 0 }, calories: 403 },
  { id: '10', name: 'Brown Rice', category: 'grains', expiryDate: '2025-06-15', quantity: 2, unit: 'cup', macros: { proteins: 5, carbohydrates: 45, fats: 1.8, fiber: 3.5 }, calories: 216 },
  { id: '11', name: 'Avocado', category: 'fruits', expiryDate: '2025-06-03', quantity: 2, unit: 'pieces', macros: { proteins: 4, carbohydrates: 17, fats: 29, fiber: 13 }, calories: 322 },
  { id: '12', name: 'Olive Oil', category: 'condiments', expiryDate: '2025-08-01', quantity: 1, unit: 'bottle', macros: { proteins: 0, carbohydrates: 0, fats: 100, fiber: 0 }, calories: 884 },
  { id: '13', name: 'Tomatoes', category: 'vegetables', expiryDate: '2025-06-05', quantity: 4, unit: 'pieces', macros: { proteins: 1.1, carbohydrates: 4.8, fats: 0.2, fiber: 1.4 }, calories: 22 },
  { id: '14', name: 'Orange Juice', category: 'beverages', expiryDate: '2025-06-04', quantity: 1, unit: 'carton', macros: { proteins: 1.7, carbohydrates: 26, fats: 0.5, fiber: 0.5 }, calories: 112 },
  { id: '15', name: 'Ground Turkey', category: 'meats', expiryDate: '2025-06-03', quantity: 1, unit: 'lbs', macros: { proteins: 27, carbohydrates: 0, fats: 8, fiber: 0 }, calories: 176 },
  { id: '16', name: 'Quinoa', category: 'grains', expiryDate: '2025-12-01', quantity: 1, unit: 'box', macros: { proteins: 14, carbohydrates: 64, fats: 6, fiber: 7 }, calories: 368 },
  { id: '17', name: 'Strawberries', category: 'fruits', expiryDate: '2025-06-02', quantity: 1, unit: 'container', macros: { proteins: 1, carbohydrates: 11, fats: 0.5, fiber: 3 }, calories: 49 },
  { id: '18', name: 'Broccoli', category: 'vegetables', expiryDate: '2025-06-06', quantity: 2, unit: 'heads', macros: { proteins: 3, carbohydrates: 6, fats: 0.4, fiber: 2.3 }, calories: 25 },
  { id: '19', name: 'Eggs', category: 'dairy', expiryDate: '2025-06-09', quantity: 12, unit: 'pieces', macros: { proteins: 6, carbohydrates: 0.6, fats: 5, fiber: 0 }, calories: 68 },
  { id: '20', name: 'Honey', category: 'condiments', expiryDate: '2026-01-01', quantity: 1, unit: 'jar', macros: { proteins: 0.3, carbohydrates: 82, fats: 0, fiber: 0.2 }, calories: 304 },
  { id: '21', name: 'Sweet Potato', category: 'vegetables', expiryDate: '2025-06-08', quantity: 3, unit: 'pieces', macros: { proteins: 2, carbohydrates: 20, fats: 0.1, fiber: 3 }, calories: 86 },
  { id: '22', name: 'Green Tea', category: 'beverages', expiryDate: '2025-12-31', quantity: 1, unit: 'box', macros: { proteins: 0, carbohydrates: 0, fats: 0, fiber: 0 }, calories: 2 }
];

const categoryIcons = {
  vegetables: Carrot,
  fruits: Apple,
  dairy: Milk,
  meats: Beef,
  grains: Wheat,
  beverages: Coffee,
  condiments: Droplets
};

const categoryColors = {
  vegetables: '#10B981',
  fruits: '#F59E0B',
  dairy: '#3B82F6',
  meats: '#EF4444',
  grains: '#8B5CF6',
  beverages: '#06B6D4',
  condiments: '#84CC16'
};

const COLORS = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444'];

const filters = [
  'all','expiring',
  'vegetables','fruits','dairy',
  'meats','grains','beverages','condiments'
] as const;

export default function SmartFridgeDashboard() {
  const [showFilterDropdownMobile, setShowFilterDropdownMobile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'expiring' | string>('all');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [foodItems, setFoodItems] = useState<FoodItem[]>(mockFoodData);
  const [dailyGoals, setDailyGoals] = useState<DailyGoals>({
    proteins: 50,
    carbohydrates: 130,
    fats: 65,
    fiber: 25
  });
  const [showEditModal, setShowEditModal] = useState(false);
  const [showFoodModal, setShowFoodModal] = useState(false);
  const [showGoalsModal, setShowGoalsModal] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodItem | null>(null);
  const [newFood, setNewFood] = useState<Partial<FoodItem>>({
    name: '',
    category: 'vegetables',
    expiryDate: '',
    quantity: 1,
    unit: 'pieces',
    macros: { proteins: 0, carbohydrates: 0, fats: 0, fiber: 0 },
    calories: 0
  });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showUnitDropdown, setShowUnitDropdown] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(true);

  // Loading screen effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500); // Show loading for 2.5 seconds

    return () => clearTimeout(timer);
  }, []);

  // Hide webkit scrollbars for specific containers and handle modal scroll prevention
  useEffect(() => {
    // Import Montserrat font
    const fontLink = document.createElement('link');
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap';
    fontLink.rel = 'stylesheet';
    document.head.appendChild(fontLink);

    const style = document.createElement('style');
    style.textContent = `
      .hide-webkit-scrollbar::-webkit-scrollbar {
        display: none;
      }
      
      /* Apply Montserrat to the entire app */
      body, * {
        font-family: 'Montserrat', sans-serif !important;
      }
      
      /* Hide main page scrollbar */
      body {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      
      body::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
      
      /* Hide scrollbars from html element */
      html {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      
      html::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
      
      /* Universal scrollbar hiding */
      * {
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      
      *::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
      
      /* Dark mode calendar styling */
      .dark-calendar::-webkit-calendar-picker-indicator {
        filter: invert(1);
      }
      

      .dark-calendar {
        color-scheme: dark;
      }
      
      .light-calendar {
        color-scheme: light;
      }
      
      /* Remove focus outline from pie chart cells */
      .recharts-pie-sector:focus {
        outline: none !important;
      }
      
      .recharts-pie-sector:active {
        outline: none !important;
      }
      
      /* Prevent body scroll when modal is open */
      .modal-open {
        overflow: hidden !important;
      }
      
      /* Custom scrollbar for unit dropdown */
      .custom-scrollbar {
        scrollbar-width: thin;
        scrollbar-color: #8B5CF6 transparent;
      }
      
      .custom-scrollbar::-webkit-scrollbar {
        width: 6px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 3px;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #3B82F6, #8B5CF6);
        border-radius: 3px;
        transition: background 0.2s ease;
      }
      
      .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #2563EB, #7C3AED);
      }
      
      /* Dark mode scrollbar */
      .dark .custom-scrollbar {
        scrollbar-color: #A855F7 transparent;
      }
      
      .dark .custom-scrollbar::-webkit-scrollbar-thumb {
        background: linear-gradient(to bottom, #60A5FA, #A855F7);
      }
      
      .dark .custom-scrollbar::-webkit-scrollbar-thumb:hover {
        background: linear-gradient(to bottom, #3B82F6, #9333EA);
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(fontLink);
      document.head.removeChild(style);
    };
  }, []);

  // Prevent body scroll when any modal is open
  useEffect(() => {
    const isAnyModalOpen = showEditModal || showFoodModal || showGoalsModal;
    
    if (isAnyModalOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    
    // Cleanup on unmount
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [showEditModal, showFoodModal, showGoalsModal]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      if (showCategoryDropdown && !target.closest('.category-dropdown')) {
        setShowCategoryDropdown(false);
      }
      
      if (showUnitDropdown && !target.closest('.unit-dropdown')) {
        setShowUnitDropdown(false);
      }
      
      if (showCalendar && !target.closest('.calendar-container')) {
        setShowCalendar(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showCategoryDropdown, showUnitDropdown, showCalendar]);

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getExpiryStatus = (daysUntilExpiry: number) => {
    if (daysUntilExpiry < 0) return 'expiring'; // Already expired
    if (daysUntilExpiry <= 2) return 'expiring';
    if (daysUntilExpiry <= 14) return 'moderate';
    return 'fresh';
  };

  const filteredData = useMemo(() => {
    if (activeFilter === 'all') return foodItems;
    if (activeFilter === 'expiring') {
      return foodItems.filter(item => getDaysUntilExpiry(item.expiryDate) <= 14);
    }
    return foodItems.filter(item => item.category === activeFilter);
  }, [activeFilter, foodItems]);

  const totalMacros = useMemo(() => {
    const totals = filteredData.reduce((acc, item) => ({
      proteins: acc.proteins + item.macros.proteins,
      carbohydrates: acc.carbohydrates + item.macros.carbohydrates,
      fats: acc.fats + item.macros.fats,
      fiber: acc.fiber + item.macros.fiber
    }), { proteins: 0, carbohydrates: 0, fats: 0, fiber: 0 });

    return [
      { name: 'Proteins', value: totals.proteins, color: '#8B5CF6' },
      { name: 'Carbohydrates', value: totals.carbohydrates, color: '#10B981' },
      { name: 'Fats', value: totals.fats, color: '#F59E0B' },
      { name: 'Fiber', value: totals.fiber, color: '#EF4444' }
    ];
  }, [filteredData]);

  const categoryData = useMemo(() => {
    const categories = Object.keys(categoryColors);
    return categories.map(category => ({
      category,
      count: foodItems.filter(item => item.category === category).length,
      color: categoryColors[category as keyof typeof categoryColors]
    }));
  }, [foodItems]);

  const sortedByExpiry = useMemo(() => {
    return [...filteredData]
      .map(item => ({
        ...item,
        daysUntilExpiry: getDaysUntilExpiry(item.expiryDate),
        status: getExpiryStatus(getDaysUntilExpiry(item.expiryDate))
      }))
      .sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
  }, [filteredData]);

  const mealSuggestions = useMemo(() => {
    const expiringSoon = sortedByExpiry.filter(item => item.daysUntilExpiry <= 14);
    if (expiringSoon.length === 0) return [];
    
    // Group expiring items by category
    const categories = {
      vegetables: expiringSoon.filter(item => item.category === 'vegetables'),
      fruits: expiringSoon.filter(item => item.category === 'fruits'),
      meats: expiringSoon.filter(item => item.category === 'meats'),
      dairy: expiringSoon.filter(item => item.category === 'dairy'),
      grains: expiringSoon.filter(item => item.category === 'grains'),
      beverages: expiringSoon.filter(item => item.category === 'beverages'),
      condiments: expiringSoon.filter(item => item.category === 'condiments')
    };

    const suggestions = [];

    // Vegetable-based suggestions
    if (categories.vegetables.length > 0) {
      const vegNames = categories.vegetables.slice(0, 2).map(item => item.name).join(' and ');
      if (categories.meats.length > 0) {
        suggestions.push(`Make a hearty stir-fry with ${vegNames} and ${categories.meats[0].name}`);
      } else if (categories.grains.length > 0) {
        suggestions.push(`Create a nutritious ${vegNames} and ${categories.grains[0].name} bowl`);
      } else {
        suggestions.push(`Prepare a fresh ${vegNames} salad with olive oil dressing`);
      }
    }

    // Fruit-based suggestions
    if (categories.fruits.length > 0) {
      const fruitNames = categories.fruits.slice(0, 2).map(item => item.name).join(' and ');
      if (categories.dairy.length > 0) {
        suggestions.push(`Blend ${fruitNames} with ${categories.dairy[0].name} for a creamy smoothie`);
      } else if (categories.grains.length > 0) {
        suggestions.push(`Make a ${fruitNames} and ${categories.grains[0].name} breakfast bowl`);
      } else {
        suggestions.push(`Create a refreshing ${fruitNames} fruit salad`);
      }
    }

    // Meat-based suggestions
    if (categories.meats.length > 0 && !suggestions.some(s => s.includes(categories.meats[0].name))) {
      const meatName = categories.meats[0].name;
      if (categories.vegetables.length > 0) {
        suggestions.push(`Grill ${meatName} with roasted ${categories.vegetables[0].name}`);
      } else if (categories.grains.length > 0) {
        suggestions.push(`Cook ${meatName} with seasoned ${categories.grains[0].name}`);
      } else {
        suggestions.push(`Prepare pan-seared ${meatName} with herbs`);
      }
    }

    // Dairy-based suggestions
    if (categories.dairy.length > 0 && !suggestions.some(s => s.includes(categories.dairy[0].name))) {
      const dairyName = categories.dairy[0].name;
      if (categories.grains.length > 0) {
        suggestions.push(`Make a creamy ${categories.grains[0].name} dish with ${dairyName}`);
      } else if (categories.fruits.length > 0) {
        suggestions.push(`Create a ${dairyName} and ${categories.fruits[0].name} parfait`);
      } else {
        suggestions.push(`Use ${dairyName} in a quick pasta or omelet`);
      }
    }

    // Grain-based suggestions
    if (categories.grains.length > 0 && !suggestions.some(s => s.includes(categories.grains[0].name))) {
      const grainName = categories.grains[0].name;
      if (categories.vegetables.length > 0) {
        suggestions.push(`Cook ${grainName} pilaf with ${categories.vegetables[0].name}`);
      } else {
        suggestions.push(`Prepare seasoned ${grainName} as a nutritious side dish`);
      }
    }

    // Beverage suggestions
    if (categories.beverages.length > 0) {
      const bevName = categories.beverages[0].name;
      if (categories.fruits.length > 0) {
        suggestions.push(`Use ${bevName} in a ${categories.fruits[0].name} smoothie or cocktail`);
      } else {
        suggestions.push(`Incorporate ${bevName} into a refreshing drink or recipe`);
      }
    }

    // Multiple category combinations
    if (categories.vegetables.length > 0 && categories.meats.length > 0 && categories.grains.length > 0) {
      suggestions.push(`Make a complete meal: ${categories.meats[0].name} with ${categories.vegetables[0].name} over ${categories.grains[0].name}`);
    }

    // Return top 3 unique suggestions
    return [...new Set(suggestions)].slice(0, 3);
  }, [sortedByExpiry]);

  // CRUD Operations
  const addFood = () => {
    if (newFood.name && newFood.expiryDate) {
      const food: FoodItem = {
        id: Date.now().toString(),
        name: newFood.name,
        category: newFood.category || 'vegetables',
        expiryDate: newFood.expiryDate,
        quantity: newFood.quantity || 1,
        unit: newFood.unit || 'pieces',
        macros: newFood.macros || { proteins: 0, carbohydrates: 0, fats: 0, fiber: 0 },
        calories: newFood.calories || 0
      };
      setFoodItems([...foodItems, food]);
      setNewFood({
        name: '',
        category: 'vegetables',
        expiryDate: '',
        quantity: 1,
        unit: 'pieces',
        macros: { proteins: 0, carbohydrates: 0, fats: 0, fiber: 0 },
        calories: 0
      });
      setShowFoodModal(false);
      setShowCategoryDropdown(false);
      setShowUnitDropdown(false);
    }
  };

  const editFood = (food: FoodItem) => {
    setEditingFood(food);
    setNewFood(food);
    setShowFoodModal(true);
  };

  const updateFood = () => {
    if (editingFood && newFood.name && newFood.expiryDate) {
      const updatedFood: FoodItem = {
        ...editingFood,
        name: newFood.name,
        category: newFood.category || 'vegetables',
        expiryDate: newFood.expiryDate,
        quantity: newFood.quantity || 1,
        unit: newFood.unit || 'pieces',
        macros: newFood.macros || { proteins: 0, carbohydrates: 0, fats: 0, fiber: 0 },
        calories: newFood.calories || 0
      };
      setFoodItems(foodItems.map(item => item.id === editingFood.id ? updatedFood : item));
      setEditingFood(null);
      setNewFood({
        name: '',
        category: 'vegetables',
        expiryDate: '',
        quantity: 1,
        unit: 'pieces',
        macros: { proteins: 0, carbohydrates: 0, fats: 0, fiber: 0 },
        calories: 0
      });
      setShowFoodModal(false);
      setShowCategoryDropdown(false);
      setShowUnitDropdown(false);
    }
  };

  const deleteFood = (id: string) => {
    setFoodItems(foodItems.filter(item => item.id !== id));
  };

  const updateDailyGoals = (goals: DailyGoals) => {
    setDailyGoals(goals);
    setShowGoalsModal(false);
  };

  const getIntakeStatus = (current: number, recommended: number) => {
    const percentage = (current / recommended) * 100;
    if (percentage >= 80) return 'sufficient';
    if (percentage >= 50) return 'moderate';
    return 'deficient';
  };

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const formatDateForInput = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleCalendarDateClick = (day: number) => {
    const selectedDate = new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), day);
    setNewFood({ ...newFood, expiryDate: formatDateForInput(selectedDate) });
    setShowCalendar(false);
  };

  const navigateCalendar = (direction: 'prev' | 'next') => {
    const newDate = new Date(currentCalendarDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentCalendarDate(newDate);
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentCalendarDate(today);
    setNewFood({ ...newFood, expiryDate: formatDateForInput(today) });
    setShowCalendar(false);
  };

  // Loading Screen Component
  if (isLoading) {
    return (
      <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-300 ${
        darkMode 
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' 
          : 'bg-gradient-to-br from-blue-50 via-white to-indigo-100'
      }`}>
        {/* Animated Background Particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse ${
            darkMode ? 'bg-blue-500' : 'bg-blue-300'
          }`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-20 animate-pulse ${
            darkMode ? 'bg-purple-500' : 'bg-purple-300'
          }`} style={{ animationDelay: '1s' }}></div>
          <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl opacity-10 animate-pulse ${
            darkMode ? 'bg-green-500' : 'bg-green-300'
          }`} style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Main Loading Content */}
        <div className="relative z-10 text-center px-4">
          {/* Logo Section */}
          <div className="mb-8 animate-bounce">
            <div className={`inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-3xl shadow-2xl mb-6 ${
              darkMode 
                ? 'bg-gradient-to-br from-blue-600 to-purple-700' 
                : 'bg-gradient-to-br from-blue-500 to-purple-600'
            }`}>
              <Refrigerator className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
            
            <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold mb-3 bg-gradient-to-r bg-clip-text text-transparent ${
              darkMode 
                ? 'from-blue-400 via-purple-400 to-blue-400' 
                : 'from-blue-600 via-purple-600 to-blue-600'
            }`}>
              ShelfSense
            </h1>
            
            <p className={`text-lg sm:text-xl font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Smart fridge management
            </p>
          </div>

          {/* Loading Animation */}
          <div className="mb-8">
            <div className="flex justify-center space-x-2 mb-4">
              <div className={`w-3 h-3 rounded-full animate-bounce ${
                darkMode ? 'bg-blue-400' : 'bg-blue-500'
              }`}></div>
              <div className={`w-3 h-3 rounded-full animate-bounce ${
                darkMode ? 'bg-purple-400' : 'bg-purple-500'
              }`} style={{ animationDelay: '0.1s' }}></div>
              <div className={`w-3 h-3 rounded-full animate-bounce ${
                darkMode ? 'bg-green-400' : 'bg-green-500'
              }`} style={{ animationDelay: '0.2s' }}></div>
            </div>
            
            {/* Progress Bar */}
            <div className={`w-64 sm:w-80 h-2 rounded-full mx-auto overflow-hidden ${
              darkMode ? 'bg-gray-700' : 'bg-gray-200'
            }`}>
              <div className={`h-full rounded-full animate-pulse bg-gradient-to-r ${
                darkMode 
                  ? 'from-blue-400 via-purple-400 to-green-400' 
                  : 'from-blue-500 via-purple-500 to-green-500'
              }`} style={{
                width: '100%',
                animation: 'loading-progress 2.5s ease-in-out infinite'
              }}></div>
            </div>
          </div>

          {/* Loading Text */}
          <div className="space-y-2">
            <p className={`text-sm sm:text-base font-medium animate-pulse ${
              darkMode ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Initializing your smart kitchen...
            </p>
            
            {/* Feature Highlights */}
            <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto text-xs sm:text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              <div className="flex items-center justify-center gap-2 animate-fadeIn">
                <TrendingUp className="w-4 h-4 text-blue-500" />
                <span>Track Nutrition</span>
              </div>
              <div className="flex items-center justify-center gap-2 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                <Clock className="w-4 h-4 text-purple-500" />
                <span>Monitor Expiry</span>
              </div>
              <div className="flex items-center justify-center gap-2 animate-fadeIn" style={{ animationDelay: '1s' }}>
                <ChefHat className="w-4 h-4 text-green-500" />
                <span>Meal Suggestions</span>
              </div>
            </div>
          </div>
        </div>

        {/* Custom CSS for animations */}
        <style jsx>{`
          @keyframes loading-progress {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(100%); }
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .animate-fadeIn {
            animation: fadeIn 0.8s ease-out forwards;
            opacity: 0;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-all duration-300 hide-webkit-scrollbar ${
      darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-50 to-indigo-100'}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-8">
        {/* everything else */}
      <div className="container mx-auto p-4 lg:p-8 pb-0">
                <div className="relative mb-8">
          <div className={`flex items-center justify-between p-3 sm:p-4 rounded-xl shadow-lg transition-all duration-300 ${
            darkMode 
              ? 'bg-gray-800/90 backdrop-blur-sm border border-gray-700' 
              : 'bg-white/90 backdrop-blur-sm border border-gray-200'
          }`}>
            <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
              <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-1.5 sm:p-2 rounded-full shadow-lg flex-shrink-0">
                <Refrigerator className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
              <div className="min-w-0 flex-1">
                <h1 className={`text-lg sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${darkMode ? 'from-blue-400 to-purple-400' : ''} truncate`}>
                  ShelfSense
                </h1>
                <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-0.5 font-medium hidden sm:block`}>
                  Monitor freshness • Track nutrition • Reduce waste
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-0.5 font-medium sm:hidden`}>
                  Smart fridge management
                </p>
                  </div>
                  </div>
            
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                          <button
                onClick={() => setShowEditModal(true)}
                className={`cursor-pointer p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-blue-400 shadow-lg' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-lg'
                }`}
                aria-label="Edit dashboard"
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                          </button>
              
                          <button
                onClick={() => setDarkMode(!darkMode)}
                className={`cursor-pointer p-2 sm:p-3 rounded-full transition-all duration-300 hover:scale-105 ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-yellow-400 shadow-lg' 
                    : 'bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-lg'
                }`}
                aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
              >
                {darkMode ? <Sun className="w-4 h-4 sm:w-5 sm:h-5" /> : <Moon className="w-4 h-4 sm:w-5 sm:h-5" />}
                          </button>
                        </div>
                      </div>
        </div>

        {/* Mobile: single dropdown toggle */}
      <div className="sm:hidden relative mb-4">
        <button
          onClick={() => setShowFilterDropdownMobile(!showFilterDropdownMobile)}
          className={`w-full flex justify-between items-center px-4 py-3 rounded-xl border-2 transition-all duration-200 shadow-lg font-medium ${
            darkMode 
              ? 'bg-gradient-to-r from-gray-800 to-gray-750 border-gray-600 text-white hover:from-gray-700 hover:to-gray-650' 
              : 'bg-gradient-to-r from-white to-gray-50 border-gray-300 text-gray-900 hover:from-gray-50 hover:to-gray-100'
          }`}
        >
          <span className="text-sm sm:text-base">
            {activeFilter === 'all' ? 'All Items'
              : activeFilter === 'expiring' ? 'Expiring Soon'
              : activeFilter.charAt(0).toUpperCase() + activeFilter.slice(1)}
          </span>
          {showFilterDropdownMobile
            ? <ChevronUp className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />
            : <ChevronDown className={`w-4 h-4 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`} />}
        </button>

        {showFilterDropdownMobile && (
          <div className={`absolute z-20 mt-2 w-full rounded-xl border-2 shadow-2xl overflow-hidden backdrop-blur-sm ${
            darkMode 
              ? 'bg-gray-800/95 border-gray-600' 
              : 'bg-white/95 border-gray-300'
          }`}>
            {filters.map(filter => (
              <button
                key={filter}
                onClick={() => {
                  setActiveFilter(filter);
                  setShowFilterDropdownMobile(false);
                }}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  activeFilter === filter
                    ? darkMode
                      ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white font-bold'
                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold'
                    : darkMode
                      ? 'text-gray-200 hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 hover:text-white'
                      : 'text-gray-800 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-gray-900'
                }`}
              >
                {filter === 'all' ? 'All Items'
                  : filter === 'expiring' ? 'Expiring Soon'
                  : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Tablet+ horizontal pills with icons + labels */}
      <div className="hidden sm:flex flex-wrap gap-2 mb-8">
        {filters.map(filter => {
          // choose the right icon
          const Icon = filter === 'all'
            ? Filter
            : filter === 'expiring'
              ? AlertTriangle
              : categoryIcons[filter];

          const label = filter === 'all'
            ? 'All'
            : filter === 'expiring'
              ? 'Expiring'
              : filter.charAt(0).toUpperCase() + filter.slice(1);

          return (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`cursor-pointer px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                activeFilter === filter
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : darkMode
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50 shadow-sm'
              }`}
            >
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </div>
            </button>
          );
        })}
      </div>


        {/* Quick Stats Card - Top Section */}
        <div className="mb-6 lg:mb-8">
          <div className="text-center mb-6 lg:mb-8">
            <div className="flex items-center justify-center gap-2 sm:gap-3 mb-4">
              {/* <div className={`p-2 sm:p-3 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}> */}
                {/* <TrendingUp className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} /> */}
              </div>
            </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {/* Fresh Items Card */}
            <div className={`p-4 sm:p-6 rounded-2xl shadow-xl transition-all duration-300 border hover:shadow-2xl hover:scale-105 ${
              darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
            }`}>
              <div className="text-center">
                <div className={`inline-flex p-3 sm:p-4 rounded-full mb-4 ${darkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <CheckCircle className={`w-6 h-6 sm:w-8 sm:h-8 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <p className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${darkMode ? 'text-green-400' : 'text-green-600'}`}>
                  <CountUp
                    end={sortedByExpiry.filter(item => item.status === 'fresh').length}
                    duration={0.8}
                    easingFn={(t, b, c, d) => c * (1 - Math.pow(2, -10 * t / d)) + b}
                    useEasing={true}
                  />
                </p>
                <p className={`text-sm sm:text-base font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Fresh Items
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Ready to use
                </p>
              </div>
            </div>

            {/* Use Soon Card */}
            <div className={`p-4 sm:p-6 rounded-2xl shadow-xl transition-all duration-300 border hover:shadow-2xl hover:scale-105 ${
              darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
            }`}>
              <div className="text-center">
                <div className={`inline-flex p-3 sm:p-4 rounded-full mb-4 ${darkMode ? 'bg-yellow-500/20' : 'bg-yellow-100'}`}>
                  <Clock className={`w-6 h-6 sm:w-8 sm:h-8 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`} />
                </div>
                <p className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${darkMode ? 'text-yellow-400' : 'text-yellow-600'}`}>
                  <CountUp
                    end={sortedByExpiry.filter(item => item.status === 'moderate').length}
                    duration={0.8}
                    easingFn={(t, b, c, d) => c * (1 - Math.pow(2, -10 * t / d)) + b}
                    useEasing={true}
                  />
                </p>
                <p className={`text-sm sm:text-base font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Use Soon
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Within 2 weeks
                </p>
              </div>
            </div>

            {/* Need Attention Card */}
            <div className={`p-4 sm:p-6 rounded-2xl shadow-xl transition-all duration-300 border hover:shadow-2xl hover:scale-105 ${
              darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
            }`}>
              <div className="text-center">
                <div className={`inline-flex p-3 sm:p-4 rounded-full mb-4 ${darkMode ? 'bg-red-500/20' : 'bg-red-100'}`}>
                  <AlertTriangle className={`w-6 h-6 sm:w-8 sm:h-8 ${darkMode ? 'text-red-400' : 'text-red-600'}`} />
                </div>
                <p className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${darkMode ? 'text-red-400' : 'text-red-600'}`}>
                  <CountUp
                    end={sortedByExpiry.filter(item => item.status === 'expiring').length}
                    duration={0.8}
                    easingFn={(t, b, c, d) => c * (1 - Math.pow(2, -10 * t / d)) + b}
                    useEasing={true}
                  />
                </p>
                <p className={`text-sm sm:text-base font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Need Attention
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Expiring soon
                </p>
              </div>
            </div>

            {/* Total Items Card */}
            <div className={`p-4 sm:p-6 rounded-2xl shadow-xl transition-all duration-300 border hover:shadow-2xl hover:scale-105 ${
              darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
            }`}>
              <div className="text-center">
                <div className={`inline-flex p-3 sm:p-4 rounded-full mb-4 ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                  <Refrigerator className={`w-6 h-6 sm:w-8 sm:h-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <p className={`text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  <CountUp
                    end={foodItems.length}
                    duration={0.8}
                    easingFn={(t, b, c, d) => c * (1 - Math.pow(2, -10 * t / d)) + b}
                    useEasing={true}
                  />
                </p>
                <p className={`text-sm sm:text-base font-bold mb-1 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Total Items
                </p>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  In inventory
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Goals Card - Horizontal Layout */}
        <div className="mb-6 lg:mb-8">
            <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl transition-all duration-300 border ${
              darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
            }`}>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
                <div className={`p-2 sm:p-3 rounded-xl ${darkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <CheckCircle className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
    </div>
                <div>
                <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Daily Goals Progress
                </h2>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1 hidden sm:block`}>
                  Track your recommended daily intake
                  </p>
                </div>
              </div>
              
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {Object.entries(dailyGoals).map(([nutrient, recommended]) => {
                  const current = totalMacros.find(macro => macro.name.toLowerCase() === nutrient)?.value || 0;
                  const percentage = Math.min((current / recommended) * 100, 100);
                  const status = getIntakeStatus(current, recommended);
                  
                  const statusConfig = {
                    sufficient: { 
                      bgColor: darkMode ? 'bg-green-500/20 border-green-500/30' : 'bg-green-50 border-green-200', 
                      textColor: darkMode ? 'text-green-400' : 'text-green-700',
                      barColor: 'bg-gradient-to-r from-green-400 to-green-600',
                      icon: '✓'
                    },
                    moderate: { 
                      bgColor: darkMode ? 'bg-yellow-500/20 border-yellow-500/30' : 'bg-yellow-50 border-yellow-200', 
                      textColor: darkMode ? 'text-yellow-400' : 'text-yellow-700',
                      barColor: 'bg-gradient-to-r from-yellow-400 to-orange-500',
                      icon: '◐'
                    },
                    deficient: { 
                      bgColor: darkMode ? 'bg-red-500/20 border-red-500/30' : 'bg-red-50 border-red-200', 
                      textColor: darkMode ? 'text-red-400' : 'text-red-700',
                      barColor: 'bg-gradient-to-r from-red-400 to-red-600',
                      icon: '!'
                    }
                  };
                  
                  const config = statusConfig[status];
                  
                  return (
                  <div key={nutrient} className={`p-4 sm:p-5 rounded-xl border transition-all duration-300 hover:scale-102 ${config.bgColor}`}>
                    <div className="text-center mb-3">
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <span className={`text-lg sm:text-xl ${config.textColor}`}>{config.icon}</span>
                        <h3 className={`font-bold text-sm sm:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {nutrient.charAt(0).toUpperCase() + nutrient.slice(1)}
                        </h3>
                          </div>
                      <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold ${config.bgColor} ${config.textColor} border mb-3`}>
                        {current.toFixed(1)}g / {recommended}g
                        </div>
                        </div>
                    
                    <div className={`w-full bg-gray-200 rounded-full h-3 overflow-hidden mb-2 ${darkMode ? 'bg-gray-700' : ''}`}>
                        <div 
                          className={`h-full rounded-full transition-all duration-500 ease-out ${config.barColor} shadow-sm`}
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                    
                    <div className="text-center">
                      <p className={`text-xs font-medium ${config.textColor}`}>
                        {percentage.toFixed(0)}% Complete
                      </p>
                      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                        {status === 'sufficient' ? 'Goal reached!' : 
                         status === 'moderate' ? 'Nearly there' : 
                         'Needs attention'}
                      </p>
                    </div>
                    </div>
                  );
                })}
              </div>
              
              <div className={`mt-6 p-4 rounded-xl border-2 border-dashed ${
                darkMode ? 'border-gray-600 bg-gray-700/30' : 'border-gray-300 bg-gray-50'
              }`}>
                <div className="text-center">
                <p className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-2`}>
                  Overall Progress Summary
                  </p>
                <div className="flex justify-center gap-4 sm:gap-6">
                    {['sufficient', 'moderate', 'deficient'].map(status => {
                      const count = Object.entries(dailyGoals).filter(([nutrient, recommended]) => {
                        const current = totalMacros.find(macro => macro.name.toLowerCase() === nutrient)?.value || 0;
                        return getIntakeStatus(current, recommended) === status;
                      }).length;
                      
                      const colors: Record<string, string> = {
                        sufficient: darkMode ? 'text-green-400' : 'text-green-600',
                        moderate: darkMode ? 'text-yellow-400' : 'text-yellow-600', 
                        deficient: darkMode ? 'text-red-400' : 'text-red-600'
                      };
                      
                      return (
                      <div key={status} className="text-center">
                        <div className={`text-lg sm:text-xl font-bold ${colors[status] || ''}`}>
                          {count}
                        </div>
                        <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} capitalize`}>
                          {status}
                        </div>
                      </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div className="flex flex-col h-full">
            <div className={`flex-grow p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl transition-all duration-300 border flex flex-col ${
              darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
            }`}>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
                <div className={`p-2 sm:p-3 rounded-xl ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                  <TrendingUp className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Macro Nutrients
                  </h2>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1 hidden sm:block`}>
                    Total nutritional breakdown
                  </p>
                </div>
            </div>

              <div className="relative flex-shrink-0">
                <div className="h-48 sm:h-56 lg:h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={totalMacros}
                        cx="50%"
                        cy="50%"
                        outerRadius="80%"
                        innerRadius="40%"
                        dataKey="value"
                        strokeWidth={0}
                        stroke="none"
                      >
                        {totalMacros.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            stroke="none"
                            strokeWidth={0}
                            className="hover:opacity-80 transition-opacity duration-200"
                            style={{ outline: 'none' }}
                          />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                          border: 'none',
                          borderRadius: '16px',
                          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                          color: darkMode ? '#FFFFFF' : '#000000',
                          fontSize: '12px',
                          fontWeight: '500'
                        }}
                        labelStyle={{
                          color: darkMode ? '#FFFFFF' : '#000000',
                          fontWeight: '600'
                        }}
                        itemStyle={{
                          color: darkMode ? '#FFFFFF' : '#000000',
                          fontWeight: '500'
                        }}
                        formatter={(value, name) => {
                          const numValue = typeof value === 'number' ? value : parseFloat(value as string) || 0;
                          return [`${numValue.toFixed(1)}g`, name];
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
                
                <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:gap-5 mt-4 sm:mt-6 flex-grow">
                  {totalMacros.map((entry, index) => {
                    const nutrientName = entry.name.toLowerCase();
                    const dailyGoal = dailyGoals[nutrientName as keyof DailyGoals] || 100;
                    const percentage = Math.min((entry.value / dailyGoal) * 100, 100);
                    
                    return (
                      <div key={entry.name} className={`flex flex-col justify-between gap-2 sm:gap-3 p-4 sm:p-5 lg:p-6 rounded-xl transition-all duration-200 hover:scale-105 ${
                        darkMode ? 'bg-gray-700/50 hover:bg-gray-700' : 'bg-gray-50 hover:bg-gray-100'
                      }`}>
                        <div className="flex flex-col items-center text-center">
                          <div 
                            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full shadow-sm flex-shrink-0 mb-2"
                            style={{ backgroundColor: entry.color }}
                          ></div>
                          <p className={`font-semibold text-sm sm:text-base ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {entry.name}
                          </p>
                          <p className={`text-lg sm:text-xl lg:text-2xl font-bold mt-1 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                            {entry.value.toFixed(1)}g
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                            of {dailyGoal}g goal
                          </p>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full">
                          <div className={`w-full bg-gray-200 rounded-full h-2 overflow-hidden ${darkMode ? 'bg-gray-600' : ''}`}>
                            <div 
                              className="h-full rounded-full transition-all duration-500 ease-out shadow-sm"
                              style={{ 
                                width: `${percentage}%`,
                                backgroundColor: entry.color,
                                background: `linear-gradient(to right, ${entry.color}, ${entry.color}dd)`
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center mt-1">
                            <p className={`text-xs font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                              {percentage.toFixed(0)}%
                            </p>
                            <p className={`text-xs ${
                              percentage >= 100 
                                ? (darkMode ? 'text-green-400' : 'text-green-600')
                                : percentage >= 75
                                  ? (darkMode ? 'text-yellow-400' : 'text-yellow-600')
                                  : (darkMode ? 'text-gray-400' : 'text-gray-600')
                            }`}>
                              {percentage >= 100 ? '✓ Complete' : percentage >= 75 ? '◐ Close' : '○ In Progress'}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-8 h-full">
            <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl transition-all duration-300 border ${
              darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
            }`}>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
                <div className={`p-2 sm:p-3 rounded-xl ${darkMode ? 'bg-purple-500/20' : 'bg-purple-100'}`}>
                  <TrendingUp className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? 'text-purple-400' : 'text-purple-600'}`} />
                </div>
                <div>
                  <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Food Categories
              </h2>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1 hidden sm:block`}>
                    Distribution by category
                  </p>
                </div>
              </div>
              
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? '#374151' : '#E5E7EB'} />
                    <XAxis 
                      dataKey="category" 
                      tick={{ fontSize: 12, fill: darkMode ? '#D1D5DB' : '#6B7280' }}
                      angle={-45}
                      textAnchor="end"
                      height={80}
                    />
                    <YAxis tick={{ fontSize: 12, fill: darkMode ? '#D1D5DB' : '#6B7280' }} />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: darkMode ? '#1F2937' : '#FFFFFF',
                        border: 'none',
                        borderRadius: '12px',
                        color: darkMode ? '#FFFFFF' : '#000000'
                      }}
                      cursor={false}
                    />
                    <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                    
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className={`flex-grow p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl transition-all duration-300 border ${
              darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
            }`}>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
                <div className={`p-2 sm:p-3 rounded-xl ${darkMode ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
                  <Refrigerator className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                </div>
                <div>
                  <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Food Items ({filteredData.length})
                  </h2>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1 hidden sm:block`}>
                    Your current inventory
                  </p>
                </div>
              </div>
              
              <div 
                className="grid grid-cols-1 gap-2 sm:gap-3 max-h-80 sm:max-h-96 overflow-y-auto hide-webkit-scrollbar"
                style={{
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none'
                }}
              >
                {filteredData.map(item => {
                  const Icon = categoryIcons[item.category];
                  const daysUntilExpiry = getDaysUntilExpiry(item.expiryDate);
                  const status = getExpiryStatus(daysUntilExpiry);

  return (
                    <div
                      key={item.id}
                      className={`p-3 sm:p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' 
                          : 'bg-gray-50 border-gray-200 hover:bg-white'
                      } ${hoveredItem === item.id ? 'transform scale-102' : ''}`}
                      onMouseEnter={() => setHoveredItem(item.id)}
                      onMouseLeave={() => setHoveredItem(null)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                          <div 
                            className="p-1.5 sm:p-2 rounded-lg flex-shrink-0"
                            style={{ backgroundColor: `${categoryColors[item.category]}20` }}
                          >
                            <Icon className="w-4 h-4 sm:w-5 sm:h-5" style={{ color: categoryColors[item.category] }} />
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className={`font-medium text-sm sm:text-base ${darkMode ? 'text-white' : 'text-gray-900'} truncate`}>
                              {item.name}
                            </p>
                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                              {item.quantity} {item.unit}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              editFood(item);
                            }}
                            className={`cursor-pointer p-1 rounded-md transition-colors ${
                              darkMode ? 'hover:bg-gray-600 text-gray-400' : 'hover:bg-gray-200 text-gray-600'
                            }`}
                            aria-label="Edit food item"
                          >
                            <Edit3 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteFood(item.id);
                            }}
                            className={`cursor-pointer p-1 rounded-md transition-colors ${
                              darkMode ? 'hover:bg-red-900/20 text-red-400' : 'hover:bg-red-100 text-red-600'
                            }`}
                            aria-label="Delete food item"
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <span className={`px-1.5 sm:px-2 py-1 rounded-full text-xs font-medium ${
                            status === 'fresh' ? 'bg-green-100 text-green-800' :
                            status === 'moderate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            <span className="hidden sm:inline">
                              {daysUntilExpiry > 0 ? `${daysUntilExpiry}d` : daysUntilExpiry === 0 ? 'Today' : 'Expired'}
                            </span>
                            <span className="sm:hidden">
                              {daysUntilExpiry > 0 ? `${daysUntilExpiry}` : daysUntilExpiry === 0 ? 'T' : 'E'}
                            </span>
                          </span>
                        </div>
                      </div>
                      
                      {hoveredItem === item.id && (
                        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-200 dark:border-gray-600">
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                            <div className="text-center">
                              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Protein
                              </p>
                              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {item.macros.proteins}g
                </p>
              </div>
                            <div className="text-center">
                              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Carbs
                              </p>
                              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {item.macros.carbohydrates}g
                              </p>
          </div>
                            <div className="text-center">
                              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Fats
                              </p>
                              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {item.macros.fats}g
                              </p>
        </div>
                            <div className="text-center">
                              <p className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                Fiber
                              </p>
                              <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {item.macros.fiber}g
                              </p>
      </div>
      </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-4 sm:space-y-6 lg:space-y-8 h-full">
            <div className={`p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl transition-all duration-300 border ${
              darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
            }`}>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
                <div className={`p-2 sm:p-3 rounded-xl ${darkMode ? 'bg-orange-500/20' : 'bg-orange-100'}`}>
                  <Clock className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? 'text-orange-400' : 'text-orange-600'}`} />
                </div>
                <div>
                  <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Expiration Monitor
                </h2>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1 hidden sm:block`}>
                    Track items by expiry date
                  </p>
                </div>
              </div>
              
              <div 
                className="space-y-3 max-h-80 overflow-y-auto hide-webkit-scrollbar"
                style={{
                  msOverflowStyle: 'none',
                  scrollbarWidth: 'none'
                }}
              >
                {sortedByExpiry.slice(0, 12).map(item => {
                  const statusColors: Record<string, string> = {
                  expiring: 'border-l-red-500 bg-red-50 dark:bg-[#ff4c4c1a] dark:border-l-red-300',
                  moderate: 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-700/20 dark:border-l-yellow-300',
                  fresh: 'border-l-green-500 bg-green-50 dark:bg-green-700/20 dark:border-l-green-300',
                };

  return (
                    <div
                      key={item.id}
                      className={`p-4 rounded-lg border-l-4 transition-all duration-200 hover:shadow-sm ${
                        statusColors[item.status] || statusColors.fresh
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {item.name}
                          </p>
                          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1`}>
                            {item.quantity} {item.unit}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className={`text-sm font-medium ${
                            item.status === 'expiring' ? (darkMode ? 'text-red-400' : 'text-red-600') :
                            item.status === 'moderate' ? (darkMode ? 'text-yellow-400' : 'text-yellow-600') :
                            (darkMode ? 'text-green-400' : 'text-green-600')
                          }`}>
                            {item.daysUntilExpiry > 0 ? `${item.daysUntilExpiry} days` : item.daysUntilExpiry === 0 ? 'Expires today' : 'Expired'}
                          </p>
                          <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-500'} mt-1`}>
                            {new Date(item.expiryDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
          </div>

            <div className={`flex-grow p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl transition-all duration-300 border ${
              darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-750 border-gray-700' : 'bg-gradient-to-br from-white to-gray-50 border-gray-100'
            }`}>
              <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8">
                <div className={`p-2 sm:p-3 rounded-xl ${darkMode ? 'bg-green-500/20' : 'bg-green-100'}`}>
                  <ChefHat className={`w-5 h-5 sm:w-6 sm:h-6 ${darkMode ? 'text-green-400' : 'text-green-600'}`} />
                </div>
                <div>
                  <h2 className={`text-lg sm:text-xl lg:text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Smart Meal Suggestions
                  </h2>
                  <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mt-1 hidden sm:block`}>
                    Recipe ideas for expiring items
                  </p>
                </div>
              </div>
              
              {mealSuggestions.length > 0 ? (
                <div className="space-y-3">
                  {mealSuggestions.map((suggestion, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-sm ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 hover:bg-gray-650' 
                          : 'bg-green-50 border-green-200 hover:bg-green-100'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg ${
                          darkMode ? 'bg-green-900/30' : 'bg-green-100'
                        }`}>
                          <ChefHat className="w-4 h-4 text-green-600" />
          </div>
                        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {suggestion}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  <div className={`mt-4 p-3 rounded-lg ${
                    darkMode ? 'bg-blue-900/20 border-blue-700' : 'bg-blue-50 border-blue-200'
                  } border`}>
                    <p className={`text-xs text-center ${darkMode ? 'text-blue-300' : 'text-blue-700'}`}>
                      Use items expiring within 2 weeks to reduce food waste
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <CheckCircle className={`w-12 h-12 mx-auto mb-3 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    All items are fresh! No urgent meal suggestions needed.
                  </p>
                </div>
              )}
            </div>
          </div>
                </div>
      </div>

      {/* Edit Dashboard Modal */}
      {showEditModal && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
          onClick={() => setShowEditModal(false)}
        >
          <div 
            className={`rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto backdrop-blur-md border ${
              darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Dashboard Settings
                </h2>
              <button
                  onClick={() => setShowEditModal(false)}
                  className={`cursor-pointer p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
           
              <div className="space-y-3 sm:space-y-4">
            <button
                  onClick={() => {
                    setShowEditModal(false);
                    setShowGoalsModal(true);
                  }}
                  className={`cursor-pointer w-full p-3 sm:p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 hover:bg-gray-650 text-white' 
                      : 'bg-gray-50 border-gray-200 hover:bg-white text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500 flex-shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base">Edit Daily Goals</p>
                      <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} hidden sm:block`}>
                        Customize your nutritional targets
                      </p>
                    </div>
                  </div>
            </button>
           
            <button
                  onClick={() => {
                    setShowEditModal(false);
                    setEditingFood(null);
                    setNewFood({
                      name: '',
                      category: 'vegetables',
                      expiryDate: '',
                      quantity: 1,
                      unit: 'pieces',
                      macros: { proteins: 0, carbohydrates: 0, fats: 0, fiber: 0 },
                      calories: 0
                    });
                    setShowFoodModal(true);
                  }}
                  className={`cursor-pointer w-full p-3 sm:p-4 rounded-xl border transition-all duration-200 hover:shadow-md ${
                    darkMode 
                      ? 'bg-gray-700 border-gray-600 hover:bg-gray-650 text-white' 
                      : 'bg-gray-50 border-gray-200 hover:bg-white text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 flex-shrink-0" />
                    <div className="text-left min-w-0 flex-1">
                      <p className="font-medium text-sm sm:text-base">Add Food Item</p>
                      <p className={`text-xs sm:text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} hidden sm:block`}>
                        Add a new item to your inventory
                      </p>
                    </div>
                  </div>
            </button>
          </div>
        </div>
      </div>
        </div>
      )}

      {/* Food Modal */}
      {showFoodModal && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
          onClick={() => {
            setShowFoodModal(false);
            setEditingFood(null);
            setShowCategoryDropdown(false);
            setShowUnitDropdown(false);
            setShowCalendar(false);
          }}
        >
          <div 
            className={`rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto backdrop-blur-md border hide-webkit-scrollbar ${
              darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
            }`}
            style={{
              msOverflowStyle: 'none',
              scrollbarWidth: 'none'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {editingFood ? 'Edit Food Item' : 'Add Food Item'}
                </h2>
          <button
                  onClick={() => {
                    setShowFoodModal(false);
                    setEditingFood(null);
                    setShowCategoryDropdown(false);
                    setShowUnitDropdown(false);
                    setShowCalendar(false);
                  }}
                  className={`cursor-pointer p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
              </div>
              
              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Food Name *
                  </label>
                  <input
                    type="text"
                    value={newFood.name || ''}
                    onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
                    className={`w-full p-2.5 sm:p-3 rounded-lg border text-sm sm:text-base ${
                      darkMode 
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900'
                    } focus:ring-2 focus:ring-blue-500`}
                    placeholder="Enter food name"
              />
            </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Category *
                    </label>
                    <div className="relative category-dropdown">
          <button
                        type="button"
                        onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                        className={`cursor-pointer w-full p-2.5 sm:p-3 rounded-lg border text-sm sm:text-base transition-all duration-200 flex items-center justify-between ${
                          darkMode 
                            ? 'bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600 text-white hover:from-gray-600 hover:to-gray-700' 
                            : 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-300 text-gray-900 hover:from-blue-100 hover:to-purple-100'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      >
                        <div className="flex items-center gap-2">
                          {React.createElement(categoryIcons[newFood.category || 'vegetables'], { 
                            className: "w-4 h-4", 
                            style: { color: categoryColors[newFood.category || 'vegetables'] } 
                          })}
                          <span className="capitalize">{newFood.category || 'vegetables'}</span>
                        </div>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${showCategoryDropdown ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

                      {showCategoryDropdown && (
                        <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg border shadow-lg z-50 overflow-hidden ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-600' 
                            : 'bg-white border-gray-300'
                        }`}>
                          {(['vegetables', 'fruits', 'dairy', 'meats', 'grains', 'beverages', 'condiments'] as const).map((category) => {
                            const Icon = categoryIcons[category];
                            return (
                              <button
                                key={category}
                                type="button"
                                onClick={() => {
                                  setNewFood({ ...newFood, category });
                                  setShowCategoryDropdown(false);
                                }}
                                className={`cursor-pointer w-full p-2.5 sm:p-3 text-left flex items-center gap-2 sm:gap-3 transition-all duration-200 ${
                                  newFood.category === category
                                    ? darkMode
                                      ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white'
                                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                    : darkMode
                                    ? 'hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 text-gray-300'
                                    : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-gray-900'
                                }`}
                              >
                                <Icon 
                                  className="w-4 h-4 flex-shrink-0" 
                                  style={{ color: newFood.category === category ? 'currentColor' : categoryColors[category] }} 
                                />
                                <span className="capitalize text-sm sm:text-base">{category}</span>
                              </button>
                            );
                          })}
            </div>
                      )}
                    </div>
              </div>

                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Expiry Date *
                    </label>
                    <div className="relative calendar-container">
                      <button
                        type="button"
                        onClick={() => {
                          setShowCalendar(!showCalendar);
                          if (!showCalendar && newFood.expiryDate) {
                            setCurrentCalendarDate(new Date(newFood.expiryDate));
                          }
                        }}
                        className={`cursor-pointer w-full p-2.5 sm:p-3 rounded-lg border text-sm sm:text-base text-left flex items-center justify-between ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white hover:bg-gray-650' 
                            : 'bg-white border-gray-300 text-gray-900 hover:bg-gray-50'
                        } focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                      >
                        <span className={newFood.expiryDate ? '' : (darkMode ? 'text-gray-400' : 'text-gray-500')}>
                          {newFood.expiryDate 
                            ? new Date(newFood.expiryDate).toLocaleDateString('en-US', { 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric' 
                              })
                            : 'Select expiry date'
                          }
                        </span>
                        <Calendar className="w-4 h-4 flex-shrink-0" />
                      </button>
                      
                      {showCalendar && (
                        <div className={`absolute top-full left-0 right-0 mt-2 rounded-lg border shadow-2xl z-50 overflow-hidden ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-600' 
                            : 'bg-white border-gray-300'
                        }`}>
                          {/* Calendar Header */}
                          <div className={`flex items-center justify-between p-3 border-b ${
                            darkMode ? 'border-gray-600' : 'border-gray-200'
                          }`}>
                            <button
                              type="button"
                              onClick={() => navigateCalendar('prev')}
                              className={`p-1 rounded-md transition-colors ${
                                darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                              }`}
                            >
                              <ChevronDown className="w-4 h-4 rotate-90" />
                            </button>
                            
                            <h3 className={`font-semibold text-sm ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                              {currentCalendarDate.toLocaleDateString('en-US', { 
                                month: 'long', 
                                year: 'numeric' 
                              })}
                            </h3>
                            
                            <button
                              type="button"
                              onClick={() => navigateCalendar('next')}
                              className={`p-1 rounded-md transition-colors ${
                                darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                              }`}
                            >
                              <ChevronDown className="w-4 h-4 -rotate-90" />
                            </button>
                          </div>
                          
                          {/* Calendar Grid */}
                          <div className="p-3">
                            {/* Day Headers */}
                            <div className="grid grid-cols-7 gap-1 mb-2">
                              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                                <div key={day} className={`text-center text-xs font-medium py-2 ${
                                  darkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                  {day}
                                </div>
                              ))}
                            </div>
                            
                            {/* Calendar Days */}
                            <div className="grid grid-cols-7 gap-1">
                              {Array.from({ length: getFirstDayOfMonth(currentCalendarDate) }, (_, i) => (
                                <div key={`empty-${i}`} className="aspect-square" />
                              ))}
                              
                              {Array.from({ length: getDaysInMonth(currentCalendarDate) }, (_, i) => {
                                const day = i + 1;
                                const isToday = new Date().toDateString() === new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), day).toDateString();
                                const isSelected = newFood.expiryDate === formatDateForInput(new Date(currentCalendarDate.getFullYear(), currentCalendarDate.getMonth(), day));
                                
                                return (
                                  <button
                                    key={day}
                                    type="button"
                                    onClick={() => handleCalendarDateClick(day)}
                                    className={`aspect-square flex items-center justify-center text-sm rounded-md transition-all duration-200 ${
                                      isSelected
                                        ? 'bg-blue-500 text-white font-bold'
                                        : isToday
                                        ? darkMode
                                          ? 'bg-blue-900/30 text-blue-400 font-medium'
                                          : 'bg-blue-100 text-blue-600 font-medium'
                                        : darkMode
                                        ? 'text-gray-300 hover:bg-gray-700'
                                        : 'text-gray-700 hover:bg-gray-100'
                                    }`}
                                  >
                                    {day}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                          
                          {/* Calendar Footer */}
                          <div className={`flex items-center justify-between p-3 border-t ${
                            darkMode ? 'border-gray-600' : 'border-gray-200'
                          }`}>
                            <button
                              type="button"
                              onClick={() => {
                                setNewFood({ ...newFood, expiryDate: '' });
                                setShowCalendar(false);
                              }}
                              className={`text-xs px-3 py-1 rounded-md transition-colors ${
                                darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-700'
                              }`}
                            >
                              Clear
                            </button>
                            
                            <button
                              type="button"
                              onClick={goToToday}
                              className={`text-xs px-3 py-1 rounded-md font-medium transition-colors ${
                                darkMode 
                                  ? 'text-blue-400 hover:text-blue-300' 
                                  : 'text-blue-600 hover:text-blue-700'
                              }`}
                            >
                              Today
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                </div>
              </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Quantity
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={newFood.quantity === 1 ? '' : newFood.quantity || ''}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value) || 1;
                          setNewFood({ ...newFood, quantity: Math.round(value * 100) / 100 });
                        }}
                        className={`w-full p-2.5 sm:p-3 pr-16 sm:pr-20 rounded-lg border text-sm sm:text-base ${
                          darkMode 
                            ? 'bg-gray-700 border-gray-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-900'
                        } focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                        placeholder="1"
                      />
                      <div className="absolute right-1 top-1 bottom-1 flex flex-col">
              <button
                          type="button"
                          onClick={() => {
                            const newValue = Math.round(((newFood.quantity || 1) + 0.1) * 100) / 100;
                            setNewFood({ ...newFood, quantity: newValue });
                          }}
                          className={`cursor-pointer flex-1 px-1.5 sm:px-2 rounded-t-md transition-all duration-200 ${
                            darkMode 
                              ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                              : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                          }`}
                        >
                          <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const newValue = Math.max(0.1, Math.round(((newFood.quantity || 1) - 0.1) * 100) / 100);
                            setNewFood({ ...newFood, quantity: newValue });
                          }}
                          className={`cursor-pointer flex-1 px-1.5 sm:px-2 rounded-b-md transition-all duration-200 ${
                            darkMode 
                              ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                              : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                          }`}
                        >
                          <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              </button>
                </div>
          </div>
        </div>
             
                  <div>
                    <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      Unit
                    </label>
                    <div className="relative unit-dropdown">
              <button
                        type="button"
                        onClick={() => setShowUnitDropdown(!showUnitDropdown)}
                        className={`cursor-pointer w-full p-2.5 sm:p-3 rounded-lg border text-sm sm:text-base transition-all duration-200 flex items-center justify-between ${
                          darkMode 
                            ? 'bg-gradient-to-r from-gray-700 to-gray-800 border-gray-600 text-white hover:from-gray-600 hover:to-gray-700' 
                            : 'bg-gradient-to-r from-blue-50 to-purple-50 border-gray-300 text-gray-900 hover:from-blue-100 hover:to-purple-100'
                        } focus:ring-2 focus:ring-blue-500 focus:border-blue-500`}
                      >
                        <span className="capitalize">{newFood.unit || 'pieces'}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-200 ${showUnitDropdown ? 'rotate-180' : ''}`} 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
              </button>
                      
                      {showUnitDropdown && (
                        <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg border shadow-lg z-50 overflow-hidden ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-600' 
                            : 'bg-white border-gray-300'
                        }`}>
                          <div className="max-h-[160px] overflow-y-auto custom-scrollbar">
                            {(['bunch', 'lbs', 'container', 'loaf', 'cup', 'pieces', 'carton', 'oz', 'bottle', 'heads', 'jar', 'box'] as const).map((unit) => (
                              <button
                                key={unit}
                                type="button"
                                onClick={() => {
                                  setNewFood({ ...newFood, unit });
                                  setShowUnitDropdown(false);
                                }}
                                className={`cursor-pointer w-full p-2.5 sm:p-3 text-left transition-all duration-200 ${
                                  newFood.unit === unit
                                    ? darkMode
                                      ? 'bg-gradient-to-r from-blue-600 to-purple-700 text-white'
                                      : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                                    : darkMode
                                    ? 'hover:bg-gradient-to-r hover:from-gray-700 hover:to-gray-600 text-gray-300'
                                    : 'hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 text-gray-900'
                                }`}
                              >
                                <span className="capitalize text-sm sm:text-base">{unit}</span>
                              </button>
                            ))}
            </div>
          </div>
                      )}
        </div>
      </div>
    </div>
                
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Macronutrients (per serving)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Proteins
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={newFood.macros?.proteins === 0 ? '' : newFood.macros?.proteins || ''}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            setNewFood({ 
                              ...newFood, 
                              macros: { 
                                ...newFood.macros!, 
                                proteins: Math.round(value * 100) / 100 
                              } 
                            });
                          }}
                          className={`w-full p-2.5 sm:p-3 pr-12 sm:pr-16 rounded-lg border text-sm sm:text-base ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                          placeholder="0.0g"
                        />
                        <div className="absolute right-1 top-1 bottom-1 flex flex-col">
                          <button
                            type="button"
                            onClick={() => {
                              const newValue = Math.round(((newFood.macros?.proteins || 0) + 0.1) * 100) / 100;
                              setNewFood({ 
                                ...newFood, 
                                macros: { 
                                  ...newFood.macros!, 
                                  proteins: newValue 
                                } 
                              });
                            }}
                            className={`cursor-pointer flex-1 px-0.5 sm:px-1 rounded-t-md transition-all duration-200 ${
                              darkMode 
                                ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                                : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                            }`}
                          >
                            <Plus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const newValue = Math.max(0, Math.round(((newFood.macros?.proteins || 0) - 0.1) * 100) / 100);
                              setNewFood({ 
                                ...newFood, 
                                macros: { 
                                  ...newFood.macros!, 
                                  proteins: newValue 
                                } 
                              });
                            }}
                            className={`cursor-pointer flex-1 px-0.5 sm:px-1 rounded-b-md transition-all duration-200 ${
                              darkMode 
                                ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                                : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                            }`}
                          >
                            <Minus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                          </button>
                        </div>
                      </div>
        </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Carbohydrates
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={newFood.macros?.carbohydrates === 0 ? '' : newFood.macros?.carbohydrates || ''}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            setNewFood({ 
                              ...newFood, 
                              macros: { 
                                ...newFood.macros!, 
                                carbohydrates: Math.round(value * 100) / 100 
                              } 
                            });
                          }}
                          className={`w-full p-2.5 sm:p-3 pr-12 sm:pr-16 rounded-lg border text-sm sm:text-base ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                          placeholder="0.0g"
                        />
                        <div className="absolute right-1 top-1 bottom-1 flex flex-col">
                          <button
                            type="button"
                            onClick={() => {
                              const newValue = Math.round(((newFood.macros?.carbohydrates || 0) + 0.1) * 100) / 100;
                              setNewFood({ 
                                ...newFood, 
                                macros: { 
                                  ...newFood.macros!, 
                                  carbohydrates: newValue 
                                } 
                              });
                            }}
                            className={`cursor-pointer flex-1 px-0.5 sm:px-1 rounded-t-md transition-all duration-200 ${
                              darkMode 
                                ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                                : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                            }`}
                          >
                            <Plus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                          </button>
          <button
                            type="button"
                            onClick={() => {
                              const newValue = Math.max(0, Math.round(((newFood.macros?.carbohydrates || 0) - 0.1) * 100) / 100);
                              setNewFood({ 
                                ...newFood, 
                                macros: { 
                                  ...newFood.macros!, 
                                  carbohydrates: newValue 
                                } 
                              });
                            }}
                            className={`cursor-pointer flex-1 px-0.5 sm:px-1 rounded-b-md transition-all duration-200 ${
                              darkMode 
                                ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                                : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                            }`}
                          >
                            <Minus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
          </button>
            </div>
          </div>
        </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Fats
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={newFood.macros?.fats === 0 ? '' : newFood.macros?.fats || ''}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            setNewFood({ 
                              ...newFood, 
                              macros: { 
                                ...newFood.macros!, 
                                fats: Math.round(value * 100) / 100 
                              } 
                            });
                          }}
                          className={`w-full p-2.5 sm:p-3 pr-12 sm:pr-16 rounded-lg border text-sm sm:text-base ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                          placeholder="0.0g"
                        />
                        <div className="absolute right-1 top-1 bottom-1 flex flex-col">
                          <button
                            type="button"
                            onClick={() => {
                              const newValue = Math.round(((newFood.macros?.fats || 0) + 0.1) * 100) / 100;
                              setNewFood({ 
                                ...newFood, 
                                macros: { 
                                  ...newFood.macros!, 
                                  fats: newValue 
                                } 
                              });
                            }}
                            className={`cursor-pointer flex-1 px-0.5 sm:px-1 rounded-t-md transition-colors ${
                              darkMode 
                                ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            }`}
                          >
                            <Plus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const newValue = Math.max(0, Math.round(((newFood.macros?.fats || 0) - 0.1) * 100) / 100);
                              setNewFood({ 
                                ...newFood, 
                                macros: { 
                                  ...newFood.macros!, 
                                  fats: newValue 
                                } 
                              });
                            }}
                            className={`cursor-pointer flex-1 px-0.5 sm:px-1 rounded-b-md transition-colors ${
                              darkMode 
                                ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            }`}
                          >
                            <Minus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                          </button>
      </div>
    </div>
    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        Fiber
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={newFood.macros?.fiber === 0 ? '' : newFood.macros?.fiber || ''}
                          onChange={(e) => {
                            const value = parseFloat(e.target.value) || 0;
                            setNewFood({ 
                              ...newFood, 
                              macros: { 
                                ...newFood.macros!, 
                                fiber: Math.round(value * 100) / 100 
                              } 
                            });
                          }}
                          className={`w-full p-2.5 sm:p-3 pr-12 sm:pr-16 rounded-lg border text-sm sm:text-base ${
                            darkMode 
                              ? 'bg-gray-700 border-gray-600 text-white' 
                              : 'bg-white border-gray-300 text-gray-900'
                          } focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                          placeholder="0.0g"
                        />
                        <div className="absolute right-1 top-1 bottom-1 flex flex-col">
                          <button
                            type="button"
                            onClick={() => {
                              const newValue = Math.round(((newFood.macros?.fiber || 0) + 0.1) * 100) / 100;
                              setNewFood({ 
                                ...newFood, 
                                macros: { 
                                  ...newFood.macros!, 
                                  fiber: newValue 
                                } 
                              });
                            }}
                            className={`cursor-pointer flex-1 px-0.5 sm:px-1 rounded-t-md transition-colors ${
                              darkMode 
                                ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            }`}
                          >
                            <Plus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              const newValue = Math.max(0, Math.round(((newFood.macros?.fiber || 0) - 0.1) * 100) / 100);
                              setNewFood({ 
                                ...newFood, 
                                macros: { 
                                  ...newFood.macros!, 
                                  fiber: newValue 
                                } 
                              });
                            }}
                            className={`cursor-pointer flex-1 px-0.5 sm:px-1 rounded-b-md transition-colors ${
                              darkMode 
                                ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' 
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                            }`}
                          >
                            <Minus className="w-2 h-2 sm:w-2.5 sm:h-2.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Calories (per serving)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={newFood.calories === 0 ? '' : newFood.calories || ''}
                      onChange={(e) => setNewFood({ ...newFood, calories: parseInt(e.target.value) || 0 })}
                      className={`w-full p-2.5 sm:p-3 pr-16 sm:pr-20 rounded-lg border text-sm sm:text-base ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                      placeholder="Calories"
                    />
                    <div className="absolute right-1 top-1 bottom-1 flex flex-col">
                      <button
                        type="button"
                        onClick={() => setNewFood({ ...newFood, calories: (newFood.calories || 0) + 1 })}
                        className={`cursor-pointer flex-1 px-1.5 sm:px-2 rounded-t-md transition-all duration-200 ${
                          darkMode 
                            ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                            : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                        }`}
                      >
                        <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setNewFood({ ...newFood, calories: Math.max(0, (newFood.calories || 0) - 1) })}
                        className={`cursor-pointer flex-1 px-1.5 sm:px-2 rounded-b-md transition-all duration-200 ${
                          darkMode 
                            ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                            : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                        }`}
                      >
                        <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <button
                    onClick={() => {
                      setShowFoodModal(false);
                      setEditingFood(null);
                      setShowCategoryDropdown(false);
                      setShowUnitDropdown(false);
                      setShowCalendar(false);
                    }}
                    className={`cursor-pointer flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg border transition-all duration-200 text-sm sm:text-base ${
                      darkMode 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </button>
          <button
                    onClick={editingFood ? updateFood : addFood}
                    // disabled={!newFood.name || !newFood.expiryDate}
                    className={`cursor-pointer flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg transition-all duration-200 text-sm sm:text-base ${
                      (!newFood.name || !newFood.expiryDate)
                        ? 'bg-gray-400 text-white cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">{editingFood ? 'Update' : 'Add'} Food</span>
                      <span className="sm:hidden">{editingFood ? 'Update' : 'Add'}</span>
                    </div>
          </button>
            </div>
          </div>
        </div>
      </div>
    </div>
      )}

      {/* Daily Goals Modal */}
      {showGoalsModal && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4"
          onClick={() => setShowGoalsModal(false)}
        >
          <div 
            className={`rounded-2xl shadow-2xl max-w-md w-full backdrop-blur-md border ${
              darkMode ? 'bg-gray-800/90 border-gray-700/50' : 'bg-white/90 border-gray-200/50'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-4 sm:mb-6">
                <h2 className={`text-lg sm:text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Edit Daily Goals
              </h2>
                <button
                  onClick={() => setShowGoalsModal(false)}
                  className={`cursor-pointer p-2 rounded-lg transition-colors ${
                    darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
                  }`}
                >
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
          </div>

              <div className="space-y-3 sm:space-y-4">
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Proteins (g)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={dailyGoals.proteins === 0 ? '' : dailyGoals.proteins}
                      onChange={(e) => setDailyGoals({ ...dailyGoals, proteins: parseInt(e.target.value) || 0 })}
                      className={`w-full p-2.5 sm:p-3 pr-16 sm:pr-20 rounded-lg border text-sm sm:text-base ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                    <div className="absolute right-1 top-1 bottom-1 flex flex-col">
                      <button
                        type="button"
                        onClick={() => setDailyGoals({ ...dailyGoals, proteins: dailyGoals.proteins + 1 })}
                        className={`cursor-pointer flex-1 px-1.5 sm:px-2 rounded-t-md transition-all duration-200 ${
                          darkMode 
                            ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                            : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                        }`}
                      >
                        <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDailyGoals({ ...dailyGoals, proteins: Math.max(0, dailyGoals.proteins - 1) })}
                        className={`cursor-pointer flex-1 px-1.5 sm:px-2 rounded-b-md transition-all duration-200 ${
                          darkMode 
                            ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                            : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                        }`}
                      >
                        <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Carbohydrates (g)
                </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={dailyGoals.carbohydrates === 0 ? '' : dailyGoals.carbohydrates}
                      onChange={(e) => setDailyGoals({ ...dailyGoals, carbohydrates: parseInt(e.target.value) || 0 })}
                      className={`w-full p-2.5 sm:p-3 pr-16 sm:pr-20 rounded-lg border text-sm sm:text-base ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                    <div className="absolute right-1 top-1 bottom-1 flex flex-col">
                      <button
                        type="button"
                        onClick={() => setDailyGoals({ ...dailyGoals, carbohydrates: dailyGoals.carbohydrates + 1 })}
                        className={`cursor-pointer flex-1 px-1.5 sm:px-2 rounded-t-md transition-all duration-200 ${
                          darkMode 
                            ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                            : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                        }`}
                      >
                        <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDailyGoals({ ...dailyGoals, carbohydrates: Math.max(0, dailyGoals.carbohydrates - 1) })}
                        className={`cursor-pointer flex-1 px-1.5 sm:px-2 rounded-b-md transition-all duration-200 ${
                          darkMode 
                            ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                            : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                        }`}
                      >
                        <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
              </div>
                  </div>
          </div>

                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Fats (g)
                </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={dailyGoals.fats === 0 ? '' : dailyGoals.fats}
                      onChange={(e) => setDailyGoals({ ...dailyGoals, fats: parseInt(e.target.value) || 0 })}
                      className={`w-full p-2.5 sm:p-3 pr-16 sm:pr-20 rounded-lg border text-sm sm:text-base ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                    <div className="absolute right-1 top-1 bottom-1 flex flex-col">
                      <button
                        type="button"
                        onClick={() => setDailyGoals({ ...dailyGoals, fats: dailyGoals.fats + 1 })}
                        className={`cursor-pointer flex-1 px-1.5 sm:px-2 rounded-t-md transition-all duration-200 ${
                          darkMode 
                            ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                            : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                        }`}
                      >
                        <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDailyGoals({ ...dailyGoals, fats: Math.max(0, dailyGoals.fats - 1) })}
                        className={`cursor-pointer flex-1 px-1.5 sm:px-2 rounded-b-md transition-all duration-200 ${
                          darkMode 
                            ? 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600 text-gray-300' 
                            : 'bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100 text-gray-600'
                        }`}
                      >
                        <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
                  </div>
              </div>
                
                <div>
                  <label className={`block text-xs sm:text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Fiber (g)
                </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      value={dailyGoals.fiber === 0 ? '' : dailyGoals.fiber}
                      onChange={(e) => setDailyGoals({ ...dailyGoals, fiber: parseInt(e.target.value) || 0 })}
                      className={`w-full p-2.5 sm:p-3 pr-16 sm:pr-20 rounded-lg border text-sm sm:text-base ${
                        darkMode 
                          ? 'bg-gray-700 border-gray-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-900'
                      } focus:ring-2 focus:ring-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none`}
                    />
                    <div className="absolute right-1 top-1 bottom-1 flex flex-col">
                      <button
                        type="button"
                        onClick={() => setDailyGoals({ ...dailyGoals, fiber: dailyGoals.fiber + 1 })}
                        className={`cursor-pointer flex-1 px-1.5 sm:px-2 rounded-t-md transition-colors ${
                          darkMode 
                            ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        }`}
                      >
                        <Plus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDailyGoals({ ...dailyGoals, fiber: Math.max(0, dailyGoals.fiber - 1) })}
                        className={`cursor-pointer flex-1 px-1.5 sm:px-2 rounded-b-md transition-colors ${
                          darkMode 
                            ? 'bg-gray-600 hover:bg-gray-500 text-gray-300' 
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                        }`}
                      >
                        <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      </button>
                    </div>
            </div>
          </div>

                <div className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                  <button
                    onClick={() => setShowGoalsModal(false)}
                    className={`cursor-pointer flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg border transition-all duration-200 text-sm sm:text-base ${
                      darkMode 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => updateDailyGoals(dailyGoals)}
                    className="cursor-pointer flex-1 py-2.5 sm:py-3 px-3 sm:px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white transition-all duration-200 text-sm sm:text-base"
                  >
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <Save className="w-3 h-3 sm:w-4 sm:h-4" />
                      <span className="hidden sm:inline">Save Goals</span>
                      <span className="sm:hidden">Save</span>
            </div>
                  </button>
          </div>
            </div>
            </div>
          </div>
        </div>
      )}

      <footer className={`mt-16 transition-all duration-300 ${
        darkMode ? 'bg-gray-900 border-t border-gray-700' : 'bg-white border-t border-gray-200'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="pt-12 pb-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg shadow-lg">
                  <Refrigerator className="w-6 h-6 text-white" />
                </div>
                <h3 className={`text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${darkMode ? 'from-blue-400 to-purple-400' : ''}`}>
                  ShelfSense
                  </h3>
              </div>
              <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                The smart way to manage your kitchen inventory, reduce food waste, and maintain optimal nutrition.
              </p>
            </div>

            <div className={`pt-8 border-t flex flex-col items-center gap-4 ${
              darkMode ? 'border-gray-700' : 'border-gray-200'
            }`}>
              <div className={`text-sm font-medium ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                © 2025 ShelfSense. All rights reserved.
                </div>

              <div className={`text-sm font-medium ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                Made with for better kitchens
                  </div>
                </div>
              </div>
            </div>
        </footer>   
    </div>
    </div>
  );
}

