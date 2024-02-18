import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import typeDefs from "./schema/types/index";
import resolvers from "./schema/resolvers/index";
import { type Express } from "express";
import { getUser } from "./middleware/auth";

const getContext = async ({ req }: { req: any }) => {
  const token: string = req.headers.authorization || "";
  const user = await getUser(token);
  if (user) {
    return { user };
  }
  return {};
};

const startApolloServer = async (app: Express) => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  app.use("/graphql", expressMiddleware(server, { context: getContext }));
  const PORT = process.env.PORT || 3000;
  app.listen({ port: PORT }, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
};

export default startApolloServer;
