import * as dotenv from 'dotenv';
dotenv.config();

import "reflect-metadata";
import Container from "typedi";
import ApplicationLoader from "./loaders/application-loader";

(async () => {
  const applicationLoader = Container.get(ApplicationLoader);
  await applicationLoader.loadAll();

})();
