# E-Commerce Admin Dashboard

A modern, full-stack e-commerce admin dashboard built with Next.js 15, TypeScript, and Prisma. This application provides a complete solution for managing online stores with features like product management, order processing, analytics, and payment integration.

## 🚀 Features

### Core Functionality
- **Multi-Store Management**: Create and manage multiple stores from a single dashboard
- **Product Management**: Full CRUD operations for products with image uploads
- **Category Management**: Organize products with custom categories and billboards
- **Inventory Management**: Track sizes, colors, and stock levels
- **Order Processing**: Complete order management with Stripe payment integration
- **Analytics Dashboard**: Revenue tracking, sales analytics, and performance metrics
- **User Authentication**: Secure authentication with Clerk
- **Responsive Design**: Mobile-first design with dark/light theme support

### Advanced Features
- **Image Upload**: Cloudinary integration for product images
- **Real-time Analytics**: Revenue charts and sales statistics
- **Payment Processing**: Stripe checkout integration with webhooks
- **Store Switching**: Seamless switching between multiple stores
- **Form Validation**: Comprehensive form validation with Zod and React Hook Form
- **Toast Notifications**: User-friendly feedback system
- **Modal System**: Reusable modal components for various operations

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **React Hook Form** - Form management
- **Zod** - Schema validation
- **Zustand** - State management
- **Recharts** - Data visualization
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **Prisma** - Database ORM
- **MySQL** - Database (with Prisma relation mode)
- **Clerk** - Authentication and user management
- **Stripe** - Payment processing

### External Services
- **Cloudinary** - Image storage and optimization
- **Stripe** - Payment processing and webhooks

## 📁 Project Structure

```
ecommerce-backend/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication routes
│   │   └── (routes)/
│   │       ├── sign-in/          # Sign-in page
│   │       └── sign-up/          # Sign-up page
│   ├── (dashboard)/              # Dashboard routes
│   │   └── [storeId]/            # Store-specific routes
│   │       └── (routes)/
│   │           ├── billboards/   # Billboard management
│   │           ├── categories/   # Category management
│   │           ├── colors/       # Color management
│   │           ├── orders/       # Order management
│   │           ├── products/     # Product management
│   │           ├── sizes/        # Size management
│   │           └── settings/     # Store settings
│   ├── api/                      # API routes
│   │   ├── [storeId]/           # Store-specific APIs
│   │   ├── stores/              # Store management APIs
│   │   └── webhook/             # Stripe webhook
│   └── (root)/                  # Root layout and home
├── components/                   # Reusable components
│   ├── ui/                      # UI components
│   ├── modals/                  # Modal components
│   ├── main-nav.tsx             # Navigation component
│   ├── navbar.tsx               # Top navigation bar
│   ├── overview.tsx             # Analytics overview
│   └── store-switcher.tsx       # Store selection
├── actions/                     # Server actions
│   ├── get-graph-revenue.ts     # Revenue analytics
│   ├── get-sales-count.ts       # Sales counting
│   ├── get-stock-count.ts       # Stock counting
│   └── get-total-revenue.ts     # Total revenue calculation
├── hooks/                       # Custom React hooks
│   ├── use-origin.tsx           # Origin URL hook
│   └── use-store-modal.tsx      # Store modal state
├── lib/                         # Utility libraries
│   ├── prismadb.ts              # Database client
│   ├── stripe.ts                # Stripe configuration
│   └── utils.ts                 # Utility functions
├── providers/                   # Context providers
│   ├── modal-provider.tsx       # Modal state provider
│   ├── theme-provider.tsx       # Theme provider
│   └── toast-provider.tsx       # Toast notifications
└── prisma/                      # Database schema
    └── schema.prisma            # Prisma schema definition
```

## 🗄️ Database Schema

The application uses a MySQL database with the following main entities:

- **Store**: Multi-tenant store management
- **Product**: Product catalog with images, pricing, and metadata
- **Category**: Product categorization with billboard associations
- **Billboard**: Promotional banners for categories
- **Size & Color**: Product variants and attributes
- **Order & OrderItem**: Order management and line items
- **Image**: Product image storage

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- MySQL database
- Clerk account for authentication
- Stripe account for payments
- Cloudinary account for image storage

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ecommerce-backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file with the following variables:
   ```env
   # Database
   DATABASE_URL="mysql://username:password@localhost:3306/database_name"

   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
   NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

   # Stripe
   STRIPE_API_KEY=your_stripe_secret_key
   STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
   FRONTEND_STORE_URL=http://localhost:3000

   # Cloudinary
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   ```

4. **Database Setup**
   ```bash
   npx prisma generate
   npx prisma db push
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📱 Usage

### Creating Your First Store

1. Sign up or sign in to your account
2. You'll be prompted to create a store
3. Enter your store name and click "Continue"
4. You'll be redirected to your store dashboard

### Managing Products

1. Navigate to the "Products" section
2. Click "Add New" to create a product
3. Fill in product details:
   - Upload product images
   - Set name, price, and description
   - Select category, size, and color
   - Mark as featured if desired
4. Save your product

### Managing Categories

1. Go to "Categories" section
2. Create categories and associate them with billboards
3. Organize your product catalog

### Processing Orders

1. View orders in the "Orders" section
2. Orders are automatically created when customers complete checkout
3. Track payment status and customer information

### Analytics

1. View your store performance on the dashboard
2. Monitor total revenue, sales count, and stock levels
3. Analyze revenue trends with interactive charts

## 🔧 API Endpoints

### Store Management
- `POST /api/stores` - Create a new store
- `GET /api/stores/[storeId]` - Get store details

### Product Management
- `GET /api/[storeId]/products` - List products with filters
- `POST /api/[storeId]/products` - Create a new product
- `PATCH /api/[storeId]/products/[productId]` - Update product
- `DELETE /api/[storeId]/products/[productId]` - Delete product

### Order Processing
- `POST /api/[storeId]/checkout` - Create Stripe checkout session
- `POST /api/webhook` - Stripe webhook handler

### Category Management
- `GET /api/[storeId]/categories` - List categories
- `POST /api/[storeId]/categories` - Create category
- `PATCH /api/[storeId]/categories/[categoryId]` - Update category
- `DELETE /api/[storeId]/categories/[categoryId]` - Delete category

## 🎨 Customization

### Theming
The application supports light and dark themes. Customize the theme in `providers/theme-provider.tsx`.

### Styling
The project uses Tailwind CSS for styling. Customize the design system in `globals.css` and component files.

### Adding New Features
1. Create new API routes in the `app/api` directory
2. Add corresponding pages in the `app/(dashboard)/[storeId]/(routes)` directory
3. Create reusable components in the `components` directory
4. Update the navigation in `components/main-nav.tsx`

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🔒 Security

- **Authentication**: Secure user authentication with Clerk
- **Authorization**: Route protection and user-specific data access
- **API Security**: Input validation and error handling
- **Payment Security**: PCI-compliant payment processing with Stripe

## 📊 Performance

- **Server-Side Rendering**: Fast initial page loads
- **Image Optimization**: Automatic image optimization with Next.js
- **Database Optimization**: Efficient queries with Prisma
- **Caching**: Built-in Next.js caching strategies

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request




