# 🚀 React.js Kanban Todo List Application
This project is a robust Kanban-style Todo List Application built with React.js and Next.js. It provides a comprehensive interface for managing tasks across New, Ongoing, and Done stages, focusing on a smooth user experience, modern React practices, and a responsive design.

This project was bootstrapped with create-next-app.

## ✨ Key Features
Kanban Board Structure: Organizes tasks into three distinct columns (New, Ongoing, Done) for clear visual task progression.

Responsive Design: Utilizes Tailwind CSS for a fully responsive layout, ensuring optimal viewing and usability across all device sizes.

### Task Management (CRUD):

Creation: Add new tasks to the New column via a dedicated modal, with validation for required fields.

Details & Editing: View and update task details (title, description, status) through a TaskDetailsModal. Tasks moved to Ongoing automatically prompt for a due date/time.

Deletion: Remove tasks using an option in their context menu.

### Intuitive Task Movement:

Drag-and-Drop (DnD): Seamlessly move tasks between columns using custom useDrag and useDrop hooks. Tasks dropped into a new column update status and are appended to the bottom.
<!-- 
Right-Click Context Menu: Provides alternative options to move tasks, dynamically showing relevant target columns. -->

### Overdue Task Tracking:

Date/Time Selector: Set specific due dates and times for Ongoing tasks.

Prominent Alerts: Overdue tasks trigger a red border and "⚠️ Overdue!" text on the card, alongside a global, dismissible alert box at the top of the board listing all overdue tasks.

Data Persistence: Integrates with browser's local storage to save and load all task data across sessions.

# 🛠️ Technologies
React.js: Core UI library.

Next.js: React framework for production-grade applications.

TypeScript: For type safety and improved code maintainability.

Tailwind CSS: Utility-first CSS framework for rapid styling.

next/font: Optimizes and loads fonts (Geist) for performance.

# 💡 Advanced React Features & Best Practices
This project showcases proficiency in modern React development:

Component-Based Architecture: Structured into modular, reusable components (Board, Column, Card, TaskDetailsModal, AddTaskForm, Navbar, OptionsListMenu).

State Management: Employs useState for local component state and React Context API (ModalContext) for global state management, minimizing prop drilling.

React Hooks:

useEffect: Manages side effects like local storage persistence, overdue task monitoring, and initial data loading.

useCallback & useMemo: Strategically used for memoization of functions and components, optimizing rendering performance, especially within the DnD system.

Custom Hooks (useDrag, useDrop, useDragDrop): Encapsulates complex drag-and-drop logic, enhancing reusability and testability.

Event Handling: Comprehensive implementation of onClick, onChange, onDragStart, and onDrop for interactive elements.

TypeScript: Ensures robust type safety across all components, props, and data structures.

Performance Optimization: Achieved through memoization and immutable state updates.

Accessibility (A11y): Incorporates appropriate ARIA attributes for enhanced usability with assistive technologies.

Modern React Features (Suspense Concept): Demonstrates the principles of Suspense for asynchronous data loading, providing a smoother user experience with loading fallbacks.

Code Quality: Adheres to clean code principles with a logical folder structure and consistent coding styles.

# 🚀 Getting Started
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.
## 📚 Learn More
To learn more about Next.js, take a look at the following resources:

Next.js Documentation - learn about Next.js features and API.

Learn Next.js - an interactive Next.js tutorial.

You can check out the Next.js GitHub repository - your feedback and contributions are welcome!

## 🌐 Deploy on Vercel
The easiest way to deploy your Next.js app is to use the Vercel Platform from the creators of Next.js.

Check out our Next.js deployment documentation for more details.

## ⏳ Future Enhancements
Drag-and-Drop Refinements: Optimize HandleDrop to pass only taskId for cleaner event handling.

Performance Optimization: Investigate Virtualization/Windowing for large task lists and implement Lazy Loading/Code Splitting for larger application parts.

Overdue Alerts: Implement a "Toast" or "Notification Bar" system for overdue alerts and refine logic to prevent setting past deadlines.

Mobile Responsiveness: Conduct thorough testing on various mobile devices, address horizontal scrollbar issues, and consider "show more" functionality for long columns.

API Integration: Transition to a backend API (e.g., Firebase Firestore) for robust data persistence and multi-user capabilities.

Testing: Implement comprehensive unit, integration, and end-to-end tests.

Code Quality: Integrate ESLint and Prettier for automated code linting and formatting.

Keyboard Navigation: Enhance accessibility with full keyboard navigation support.