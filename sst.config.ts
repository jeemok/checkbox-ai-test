import { SSTConfig } from "sst";
import { StorageStack } from "./stacks/StorageStack";
import { AppStack } from "./stacks/AppStack";

export default {
  config(_input) {
    return {
      name: "checkbox-ai-test",
      region: "ap-southeast-1",
    };
  },
  stacks(app) {
    app.stack(StorageStack).stack(AppStack);
  },
} satisfies SSTConfig;
