# Canva-Clone

A modern web-based design tool inspired by Canva, built with Next.js, React, and Fabric.js. Create, edit, and export beautiful designs directly in your browser.

## Features
- Drag-and-drop canvas editor
- Add and edit text, shapes, and images
- Drawing mode with brush settings
- Export designs as PNG, JPG, SVG, JSON, or PDF
- Upload your own images
- Responsive and modern UI

## Getting Started

### Prerequisites
- Node.js (v18 or later recommended)
- npm, yarn, pnpm, or bun

### Installation
1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd canva-clone
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```
3. Set up your environment variables:
   - Create a `.env.local` file in the `canva-clone` directory.
   - Add the following (if you want Unsplash integration):
     ```env
     NEXT_PUBLIC_UNSPLASH_ACCESS_KEY=your_unsplash_access_key
     DATABASE_URL=your_postgres_connection_string
     UPLOADTHING_SECRET=your_uploadthing_secret
     ```
   - If you do not want Unsplash images, you can skip the Unsplash key.

4. Set up the database:
   - Run the setup script to initialize tables and sample data:
     ```bash
     node setup-db.js
     ```

### Running the App
Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage
- Use the sidebar to add images, text, shapes, or draw on the canvas.
- Upload your own images or use Unsplash (if configured).
- Export your design in various formats using the Export menu.

## Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `NEXT_PUBLIC_UNSPLASH_ACCESS_KEY`: Unsplash API key (optional, for Unsplash images)
- `UPLOADTHING_SECRET`: Secret for UploadThing (required for image uploads)




