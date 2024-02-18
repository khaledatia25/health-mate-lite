import { mergeTypeDefs } from "@graphql-tools/merge";
import { loadFilesSync } from "@graphql-tools/load-files";

const typesArray = loadFilesSync(`${__dirname}/**/*.gql`);
export default mergeTypeDefs(typesArray);
