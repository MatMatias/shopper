/* Client Side Errors */
import { GenericClientError } from "./client/generic-client.error";

import { FieldnameError } from "./client/fieldname.error";
import { FileExtensionError } from "./client/file-extension.error";
import { EmptyCSVError } from "./client/empty-csv.error";
import { InvalidCSVBodyError } from "./client/invalid-csv-body.error";
import { InvalidCSVHeaderError } from "./client/invalid-csv-header.error";
import { LowerPricesError } from "./client/lower-prices.error";
import { NoFileError } from "./client/no-file.error";
import { PricesReadjustmentError } from "./client/prices-readjustment.error";
import { ProductNotFoundError } from "./client/product-not-found.error";

/* Server Side Errors */
import { GenericServerError } from "./server/generic-server.error";

import { DatabaseError } from "./server/database.error";

export {
  /* Client Side Errors */
  GenericClientError,
  EmptyCSVError,
  FieldnameError,
  FileExtensionError,
  InvalidCSVBodyError,
  InvalidCSVHeaderError,
  LowerPricesError,
  NoFileError,
  PricesReadjustmentError,
  ProductNotFoundError,

  /* Server Side Errors */
  GenericServerError,
  DatabaseError,
};
