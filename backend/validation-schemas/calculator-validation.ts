import { z } from "zod";

export const calculateSchema = z.object({
  name: z.string(),
  description: z.string(),
  id: z.number(),
  volume: z.number(),
  concentration: z.number(),
  components: z.record(
    z.string(),
    z.array(
      z.object({
        id: z.number(),
        element: z.object({
          name: z.string(),
          formula: z.string(),
          id:z.number(),
          type: z.enum(["MICROELEMENT", "MACROELEMENT", "VITAMIN"]),
          meta_data: z.record(z.any()),
        }),
        element_id: z.number(),
        mg_per_liter: z.number(),
        concentration: z.number(),
      }),
    ),
  ),
});

export type calculateInput = z.infer<typeof calculateSchema>;
