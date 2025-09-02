# Polly App Style Guide

## Overview

This style guide outlines the consistent styling approach for the Polly polling application. The app uses Tailwind CSS v4 with Shadcn UI components and proper semantic color tokens for theme-aware design.

## Color System

### Semantic Color Tokens

All colors should use semantic CSS variables that automatically adapt to light/dark themes:

#### Primary Colors

- `bg-background` - Main page background
- `text-foreground` - Primary text color
- `bg-card` - Card backgrounds
- `text-card-foreground` - Text on cards

#### UI Element Colors

- `bg-primary` - Primary buttons, active states
- `text-primary-foreground` - Text on primary elements
- `bg-secondary` - Secondary buttons, subtle elements
- `text-secondary-foreground` - Text on secondary elements
- `bg-muted` - Disabled states, subtle backgrounds
- `text-muted-foreground` - Secondary text, descriptions

#### Interactive Colors

- `bg-accent` - Hover states, highlights
- `text-accent-foreground` - Text on accent elements
- `bg-destructive` - Error states, delete buttons
- `text-destructive-foreground` - Error text

#### Border and Input Colors

- `border-border` - Default borders
- `bg-input` - Form input backgrounds
- `ring-ring` - Focus rings

### Color Usage Guidelines

✅ **DO:**

- Use semantic color tokens (e.g., `bg-background`, `text-foreground`)
- Use opacity modifiers for subtle effects (e.g., `bg-destructive/10`)
- Ensure sufficient contrast ratios for accessibility

❌ **DON'T:**

- Use hardcoded colors like `bg-gray-50` or `text-black`
- Mix semantic and hardcoded color approaches
- Use colors that don't adapt to dark/light themes

## Typography

### Font Hierarchy

- **Headings**: Use Tailwind's font-size utilities (`text-3xl`, `text-2xl`, `text-xl`, `text-lg`)
- **Body Text**: Default size with `text-foreground`
- **Secondary Text**: Use `text-muted-foreground` for descriptions and metadata
- **Small Text**: Use `text-sm` with appropriate semantic colors

### Font Weight

- **Bold**: `font-bold` for headings and important text
- **Semibold**: `font-semibold` for card titles, labels
- **Medium**: `font-medium` for buttons and interactive elements
- **Normal**: Default weight for body text

## Layout & Spacing

### Container Approach

```tsx
// Page containers
<div className="container mx-auto px-4 py-8">

// Full-height centered layouts (auth pages)
<div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">

// Card containers
<div className="w-full max-w-md mx-auto">
```

### Spacing Scale

- **Large gaps**: `space-y-8`, `gap-8` (between major sections)
- **Medium gaps**: `space-y-4`, `gap-4` (between form fields, card elements)
- **Small gaps**: `space-y-2`, `gap-2` (between labels and inputs)
- **Tight spacing**: `space-y-1` (between title and description)

## Component Patterns

### Authentication Forms

```tsx
// Page wrapper
<div className="min-h-screen flex items-center justify-center bg-background py-12 px-4 sm:px-6 lg:px-8">
  <div className="w-full max-w-md space-y-8">
    {/* Error message */}
    <div className="bg-destructive/10 border border-destructive text-destructive px-4 py-3 rounded">
      {error}
    </div>
    {/* Form component */}
    <FormComponent />
  </div>
</div>
```

### Cards

```tsx
<Card className="w-full">
  <CardHeader>
    <CardTitle className="text-lg">Title</CardTitle>
    <CardDescription>Description text</CardDescription>
  </CardHeader>
  <CardContent className="space-y-4">{/* Content */}</CardContent>
</Card>
```

### Buttons

```tsx
// Primary action
<Button type="submit" className="w-full" disabled={loading}>
  {loading ? "Loading..." : "Submit"}
</Button>

// Secondary action
<Button variant="outline" type="button">
  Cancel
</Button>

// Destructive action
<Button variant="destructive">
  Delete
</Button>
```

### Form Fields

```tsx
<div className="space-y-2">
  <Label htmlFor="fieldId">Field Label</Label>
  <Input
    id="fieldId"
    type="text"
    placeholder="Enter value"
    value={value}
    onChange={handleChange}
    error={errors.field}
    disabled={loading}
  />
</div>
```

## Responsive Design

### Breakpoint Strategy

- **Mobile First**: Design for mobile, enhance for larger screens
- **Key Breakpoints**: sm (640px), md (768px), lg (1024px), xl (1280px)

### Common Responsive Patterns

```tsx
// Navigation
<div className="hidden md:flex items-center space-x-6">
  {/* Desktop nav */}
</div>

// Grid layouts
<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
  {/* Responsive grid */}
</div>

// Text sizing
<h1 className="text-3xl md:text-6xl font-bold">
  {/* Responsive heading */}
</h1>

// Flexbox direction
<div className="flex flex-col sm:flex-row gap-4">
  {/* Stack on mobile, row on larger screens */}
</div>
```

## Theme Support

### Dark Mode Implementation

The app uses CSS variables that automatically adapt based on:

1. System preference (`prefers-color-scheme: dark`)
2. Manual theme selection (via `.dark` class)

### Theme-Aware Components

All components should use semantic color tokens to ensure proper theme adaptation:

```tsx
// Good - theme-aware
<div className="bg-card text-card-foreground border border-border">
  <p className="text-muted-foreground">Secondary text</p>
</div>

// Bad - hardcoded colors
<div className="bg-white text-black border-gray-200">
  <p className="text-gray-500">Secondary text</p>
</div>
```

## Interactive States

### Button States

- **Default**: Proper semantic colors
- **Hover**: Automatic hover effects via Tailwind utilities
- **Active**: Use `active:` prefix for pressed states
- **Disabled**: Use `disabled:` prefix and `opacity-50`
- **Loading**: Show loading text and disable interaction

### Form States

- **Default**: Clean, accessible inputs
- **Focus**: Clear focus rings using `ring-ring`
- **Error**: Red border and error text using `text-destructive`
- **Disabled**: Muted appearance using `disabled:` utilities

### Link States

- **Default**: Use `text-primary` or inherit
- **Hover**: `hover:text-primary hover:underline`
- **Active**: Clear active state indication

## Accessibility Guidelines

### Color Contrast

- Ensure WCAG AA compliance (4.5:1 ratio for normal text)
- Use semantic colors that maintain contrast in both themes
- Test with actual users and accessibility tools

### Focus Management

- Visible focus indicators on all interactive elements
- Logical tab order
- Proper focus trapping in modals/forms

### Semantic HTML

- Use proper heading hierarchy
- Label all form fields
- Use ARIA attributes where needed
- Provide alt text for images

## Animation & Transitions

### Micro-interactions

- Use Tailwind's `transition-` utilities for smooth state changes
- Keep animations subtle and purposeful
- Respect `prefers-reduced-motion` for accessibility

```tsx
// Smooth transitions
<button className="transition-colors hover:bg-primary/90">
  Button
</button>

// Loading states
<div className="animate-pulse">Loading...</div>
```

## File Organization

### Component Structure

```
components/
├── ui/           # Shadcn UI components
├── auth/         # Authentication-specific components
├── polls/        # Poll-related components
└── layout/       # Layout components (Navbar, Footer)
```

### Styling Approach

- Use Tailwind classes directly in components
- Keep related styling close to components
- Use semantic color tokens consistently
- Document complex styling decisions

## Best Practices

### Performance

- Use appropriate image formats and sizes
- Lazy load non-critical content
- Optimize bundle size with proper imports

### Maintainability

- Follow consistent naming conventions
- Use semantic color tokens throughout
- Comment complex styling decisions
- Keep components focused and reusable

### Testing

- Test in both light and dark themes
- Verify responsive behavior across breakpoints
- Test with keyboard navigation
- Validate with accessibility tools

## Common Mistakes to Avoid

1. **Hardcoded Colors**: Never use `bg-white`, `text-black`, `bg-gray-X`
2. **Inconsistent Spacing**: Stick to the established spacing scale
3. **Poor Contrast**: Always verify color combinations work in both themes
4. **Responsive Afterthought**: Design mobile-first, enhance for larger screens
5. **Missing Focus States**: Ensure all interactive elements have visible focus
6. **Inconsistent Typography**: Use the established type scale and weights
7. **Breaking Semantic Meaning**: Use colors for their intended semantic purpose

---

_This style guide should be referenced for all styling decisions in the Polly app to ensure consistency and maintainability._
