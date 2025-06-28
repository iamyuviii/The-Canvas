const { neon } = require("@neondatabase/serverless");

// Get the database URL from environment
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error("DATABASE_URL environment variable is required");
  process.exit(1);
}

const sql = neon(DATABASE_URL);

async function fixDatabase() {
  try {
    console.log("Fixing database schema...");
    
    // Make userId optional in project table
    await sql`ALTER TABLE "project" ALTER COLUMN "userId" DROP NOT NULL`;
    console.log("✓ Made userId optional in project table");
    
    // Remove foreign key constraint
    await sql`ALTER TABLE "project" DROP CONSTRAINT IF EXISTS "project_userId_user_id_fk"`;
    console.log("✓ Removed foreign key constraint");
    
    // Add sample templates if they don't exist
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
    
    console.log("Database fixed successfully!");
  } catch (error) {
    console.error("Error fixing database:", error);
    process.exit(1);
  }
}

fixDatabase(); 