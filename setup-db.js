const { neon } = require("@neondatabase/serverless");

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function setupDatabase() {
  try {
    console.log("Setting up database...");
    
    // Create users table
    await sql`
      CREATE TABLE IF NOT EXISTS "user" (
        "id" text PRIMARY KEY NOT NULL,
        "name" text,
        "email" text NOT NULL,
        "emailVerified" timestamp,
        "image" text,
        "password" text
      )
    `;
    console.log("✓ Created users table");
    
    // Create project table with optional userId
    await sql`
      CREATE TABLE IF NOT EXISTS "project" (
        "id" text PRIMARY KEY NOT NULL,
        "name" text NOT NULL,
        "userId" text,
        "json" text NOT NULL,
        "height" integer NOT NULL,
        "width" integer NOT NULL,
        "thumbnailUrl" text,
        "isTemplate" boolean,
        "isPro" boolean,
        "createdAt" timestamp NOT NULL,
        "updatedAt" timestamp NOT NULL
      )
    `;
    console.log("✓ Created project table");
    
    // Add sample templates
    await sql`
      INSERT INTO "project" ("id", "name", "userId", "json", "height", "width", "isTemplate", "isPro", "createdAt", "updatedAt")
      VALUES 
        ('template-1', 'Social Media Post', 'anonymous', '{"objects":[],"background":"#ffffff"}', 1080, 1080, true, false, NOW(), NOW()),
        ('template-2', 'Business Card', 'anonymous', '{"objects":[],"background":"#ffffff"}', 350, 200, true, false, NOW(), NOW()),
        ('template-3', 'Banner', 'anonymous', '{"objects":[],"background":"#ffffff"}', 1200, 400, true, false, NOW(), NOW()),
        ('template-4', 'Poster', 'anonymous', '{"objects":[],"background":"#ffffff"}', 800, 1200, true, false, NOW(), NOW())
      ON CONFLICT (id) DO NOTHING
    `;
    console.log("✓ Added sample templates");
    
    console.log("Database setup completed successfully!");
  } catch (error) {
    console.error("Error setting up database:", error);
    process.exit(1);
  }
}

setupDatabase(); 