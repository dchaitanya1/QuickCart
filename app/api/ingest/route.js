import { serve } from "inngest/next";
import { createUserOrder, inngest } from "@/config/ingest";
import { syncUserCreation, syncUserDeletion, syncUserUpdation } from "@/config/ingest";

// Create an API that serves zero functions
export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [
    syncUserCreation,
    syncUserUpdation,
    syncUserDeletion,
    createUserOrder
  ],
});