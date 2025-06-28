-- Fix database schema to make userId optional in project table
-- Run this directly in your database

-- Make userId optional in project table
ALTER TABLE "project" ALTER COLUMN "userId" DROP NOT NULL;

-- Remove the foreign key constraint if it exists
ALTER TABLE "project" DROP CONSTRAINT IF EXISTS "project_userId_user_id_fk";

-- Add some sample data if table is empty
INSERT INTO "project" ("id", "name", "userId", "json", "height", "width", "isTemplate", "isPro", "createdAt", "updatedAt")
VALUES 
  ('template-1', 'Social Media Post', 'anonymous', '{"objects":[],"background":"#ffffff"}', 1080, 1080, true, false, NOW(), NOW()),
  ('template-2', 'Business Card', 'anonymous', '{"objects":[],"background":"#ffffff"}', 350, 200, true, false, NOW(), NOW()),
  ('template-3', 'Banner', 'anonymous', '{"objects":[],"background":"#ffffff"}', 1200, 400, true, false, NOW(), NOW()),
  ('template-4', 'Poster', 'anonymous', '{"objects":[],"background":"#ffffff"}', 800, 1200, true, false, NOW(), NOW())
ON CONFLICT (id) DO NOTHING; 