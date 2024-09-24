declare module "*.jpg";
declare module "*.png";
declare module "*.woff2";
declare module "*.woff";
declare module "*.ttf";
declare module "*.css";
declare module "*.gif";

declare module "*.svg" {
  import React = require("react");
  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}
interface Window {
  appConfig: {
    BASE_URL: string;
    ERP_BASEURL: string;
    HOME_PAGE_URL?: string;
  };
}
