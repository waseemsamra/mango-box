# KisanFresh - Farm Fresh Pakistani Produce

A modern React e-commerce website connecting Pakistani farmers directly to customers, featuring fresh mangoes, vegetables, and seasonal produce.

## 🥭 Features

- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Modern Stack**: React 18 with Tailwind CSS and Material Design Icons
- **E-commerce Ready**: Product listings, shopping cart, and checkout flow
- **Mobile-First**: Bottom navigation for mobile users
- **Beautiful UI**: Asymmetric layouts, hover effects, and smooth animations
- **Component Architecture**: Clean, maintainable React components

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Clone or download this project
2. Navigate to the project directory:
   ```bash
   cd mango-box
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## 📁 Project Structure

```
mango-box/
├── public/
│   └── index.html              # Main HTML template with meta tags
├── src/
│   ├── components/
│   │   ├── Header.js           # Navigation header with search
│   │   ├── Hero.js            # Hero section with Sindhri mangoes
│   │   ├── SeasonalMangoes.js # Asymmetric mango product grid
│   │   ├── DailyVegetables.js  # Vegetable product carousel
│   │   ├── CustomerFavorites.js # Featured products section
│   │   ├── Footer.js          # Comprehensive footer with newsletter
│   │   ├── BottomNav.js       # Mobile bottom navigation
│   │   └── FloatingActionButton.js # Support button
│   ├── App.js                 # Main App component
│   ├── App.css                # App-specific styles
│   ├── index.js               # React entry point
│   └── index.css              # Global styles with Tailwind
├── tailwind.config.js          # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── package.json               # Dependencies and scripts
└── README.md                 # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: `#006e1c` (Fresh Green)
- **Secondary**: `#745b00` (Golden Yellow)
- **Tertiary**: `#7a5649` (Warm Brown)
- **Surface**: `#f5fbef` (Light Cream)
- **Background**: `#f5fbef` (Creamy Background)

### Typography
- **Font Family**: Plus Jakarta Sans
- **Material Icons**: Google Material Symbols

## 🛠️ Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm run eject` - Ejects from Create React App (one-way operation)

## 📱 Responsive Design

The website is fully responsive and works seamlessly on:
- **Desktop**: Full navigation, search bar, and floating action button
- **Tablet**: Optimized layout with touch-friendly interactions
- **Mobile**: Bottom navigation bar and simplified interface

## 🧩 Components

### Header
- Sticky navigation with KisanFresh branding
- Search functionality for products
- Shopping cart and account icons
- Responsive mobile menu

### Hero Section
- Stunning Sindhri mangoes hero image
- "In Season Now" badge
- Call-to-action buttons (Shop Now, Learn More)
- Gradient overlay for text readability

### Seasonal Mangoes
- Asymmetric grid layout
- Featured Chaunsa mangoes with "Best Flavor" badge
- Secondary mango varieties (Anwar Ratol, Langra)
- Gift box customization option

### Daily Fresh Vegetables
- Carousel navigation arrows
- Product cards with hover effects
- Add to cart functionality
- Local sourcing badges

### Customer Favorites
- Featured product bundles
- Image overlays with gradient
- Badge system (Best Seller, New Arrival, Kitchen Essential)
- Pricing information

### Footer
- Four-column layout with company info
- Newsletter subscription form
- Social media links
- Comprehensive navigation links

### Mobile Components
- Bottom navigation bar (Home, Shop, Offers, Cart)
- Floating action button for farmer support

## 🌟 Key Features

- **Product Catalog**: Organized by categories (mangoes, vegetables, bundles)
- **Search Functionality**: Find products quickly
- **Shopping Cart**: Add items with visual feedback
- **Newsletter**: Email subscription for seasonal updates
- **Responsive Images**: Optimized for different screen sizes
- **Hover Effects**: Interactive product cards
- **Dark Mode Ready**: Prepared for theme switching

## 📝 License

This project is open source and available under the MIT License.
