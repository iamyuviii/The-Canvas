import { z } from "zod";
import { Hono } from "hono";
import { eq, and, desc, asc } from "drizzle-orm";
import { zValidator } from "@hono/zod-validator";

import { db } from "@/db/drizzle";
import { projects, projectsInsertSchema } from "@/db/schema";

const app = new Hono()
  .get(
    "/templates",
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      }),
    ),
    async (c) => {
      try {
        const { page, limit } = c.req.valid("query");

        const data = await db
          .select()
          .from(projects)
          .where(eq(projects.isTemplate, true))
          .limit(limit)
          .offset((page -1) * limit)
          .orderBy(
            asc(projects.isPro),
            desc(projects.updatedAt),
          );

        return c.json({ data });
      } catch (error) {
        console.error("Error fetching templates:", error);
        return c.json({ error: error.message }, 500);
      }
    },
  )
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");

      const data = await db
        .delete(projects)
        .where(
          eq(projects.id, id),
        )
        .returning();

      if (data.length === 0) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: { id } });
    },
  )
  .post(
    "/:id/duplicate",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");

      const data = await db
        .select()
        .from(projects)
        .where(
          eq(projects.id, id),
        );

      if (data.length === 0) {
        return c.json({ error:" Not found" }, 404);
      }

      const project = data[0];

      const duplicateData = await db
        .insert(projects)
        .values({
          name: `Copy of ${project.name}`,
          json: project.json,
          width: project.width,
          height: project.height,
          userId: "anonymous",
          createdAt: new Date(),
          updatedAt: new Date(),
        })
        .returning();

      return c.json({ data: duplicateData[0] });
    },
  )
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        page: z.coerce.number(),
        limit: z.coerce.number(),
      }),
    ),
    async (c) => {
      try {
        const { page, limit } = c.req.valid("query");

        const data = await db
          .select()
          .from(projects)
          .limit(limit)
          .offset((page - 1) * limit)
          .orderBy(desc(projects.updatedAt))

        return c.json({
          data,
          nextPage: data.length === limit ? page + 1 : null,
        });
      } catch (error) {
        console.error("Error fetching projects:", error);
        return c.json({ error: error.message }, 500);
      }
    },
  )
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({ id: z.string() }),
    ),
    zValidator(
      "json",
      projectsInsertSchema
        .omit({
          id: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        })
        .partial()
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      const data = await db
        .update(projects)
        .set({
          ...values,
          updatedAt: new Date(),
        })
        .where(
          eq(projects.id, id),
        )
        .returning();

      if (data.length === 0) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      return c.json({ data: data[0] });
    },
  )
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string() })),
    async (c) => {
      const { id } = c.req.valid("param");

      const data = await db
        .select()
        .from(projects)
        .where(
          eq(projects.id, id)
        );

      if (data.length === 0) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json({ data: data[0] });
    },
  )
  .post(
    "/",
    zValidator(
      "json",
      projectsInsertSchema
        .omit({
          id: true,
          userId: true,
          createdAt: true,
          updatedAt: true,
        })
    ),
    async (c) => {
      try {
        const { name, json, height, width } = c.req.valid("json");

        const data = await db
          .insert(projects)
          .values({
            name,
            json,
            width,
            height,
            userId: "anonymous",
            createdAt: new Date(),
            updatedAt: new Date(),
          })
          .returning();

        return c.json({ data: data[0] });
      } catch (error) {
        console.error("Error creating project:", error);
        return c.json({ error: error.message }, 500);
      }
    },
  );

export default app;
