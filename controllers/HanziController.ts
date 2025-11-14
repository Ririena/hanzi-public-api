import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { supabase } from "../supabase.js";

export default async function HanziController(app: FastifyInstance) {
  app.get("/hanzi", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { data, error } = await supabase.from("Hanzi").select("*");

      if (error) {
        return res.status(500).send({
          message: "Internal Server Error",
          error: error.message,
        });
      }

      return res.status(200).send({
        data,
        message: "Data Success Retrieved",
      });
    } catch (error: any) {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });

  interface HanziLevelParams {
    id_level: string;
  }

  interface HanziId {
    id: string;
  }

  app.get(
    "/hanzi/details/:id",
    async (req: FastifyRequest<{ Params: HanziId }>, res: FastifyReply) => {
      const { id } = req.params;

      try {
        const { data, error } = await supabase
          .from("Hanzi")
          .select("*")
          .eq("id", id);

        if (error) {
          return res.status(500).send({
            message: " Something When Wrong When Fetching The Data",
            error: error.message,
          });
        }

        return res.status(200).send({
          message: "Data Success Retrieved",
          data,
        });
      } catch (error) {
        return res
          .status(500)
          .send({ error: "Internal Server Error", message: error.message });
      }
    }
  );

  app.get(
    "/hanzi/level/:id_level",
    async (
      req: FastifyRequest<{ Params: HanziLevelParams }>,
      res: FastifyReply
    ) => {
      const { id_level } = req.params;
      try {
        const { data, error } = await supabase
          .from("Hanzi")
          .select("*")
          .eq("id_level", id_level);

        if (error) {
          return res.status(500).send({
            message: "Something Went Wrong When Fetching The Data",
            error: error.message,
          });
        }

        return res
          .status(200)
          .send({ message: "Data Success Retrieved", data });
      } catch (error) {
        return res.status(500).send({
          message: "Internal Server Error",
          error: error.message,
        });
      }
    }
  );

  app.get("/hanzi/random", async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { data, error } = await supabase
        .from("Hanzi")
        .select("*")
        .order("random()") // Supabase/PostgreSQL random
        .limit(1);

      if (error) {
        return res.status(500).send({
          message: "Failed to fetch random Hanzi",
          error: error.message,
        });
      }

      return res.status(200).send({
        message: "Random Hanzi Retrieved",
        data: data?.[0] ?? null,
      });
    } catch (error: any) {
      return res.status(500).send({
        message: "Internal Server Error",
        error: error.message,
      });
    }
  });

  app.get(
    "/hanzi/search",
    async (req: FastifyRequest, res: FastifyReply) => {
      const { q } = req.query as { q?: string };

      if (!q) {
        return res.status(400).send({
          message: "Query parameter 'q' is required",
        });
      }

      try {
        const { data, error } = await supabase
          .from("Hanzi")
          .select("*")
          .ilike("hanzi", `%${q}%`);

        if (error) {
          return res.status(500).send({
            message: "Failed to search Hanzi",
            error: error.message,
          });
        }

        return res.status(200).send({
          message: "Search Result",
          data,
        });
      } catch (error: any) {
        return res.status(500).send({
          message: "Internal Server Error",
          error: error.message,
        });
      }
    }
  );
}
