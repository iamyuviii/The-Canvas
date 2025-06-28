-- Make userId optional in project table
ALTER TABLE "project" ALTER COLUMN "userId" DROP NOT NULL;

-- Remove the foreign key constraint
ALTER TABLE "project" DROP CONSTRAINT IF EXISTS "project_userId_user_id_fk"; 