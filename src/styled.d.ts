import "styled-components";
import type { AppTheme } from "./theme";

// Teach styled-components about our theme shape so `props.theme` is typed.
declare module "styled-components" {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends AppTheme {}
}
