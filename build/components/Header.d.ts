import { WithStyles } from '@material-ui/core/styles';
import React from "react";
interface HeaderProps extends WithStyles<typeof styles> {
    date: Date;
    setDate: (date: Date) => void;
    nextDisabled: boolean;
    prevDisabled: boolean;
    onClickNext: () => void;
    onClickPrevious: () => void;
    months?: [string, string, string, string, string, string, string, string, string, string, string, string];
}
declare const styles: Record<"iconContainer" | "icon", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<HeaderProps>, "date" | "setDate" | "nextDisabled" | "prevDisabled" | "onClickNext" | "onClickPrevious" | "months" | "children"> & import("@material-ui/core").StyledComponentProps<"iconContainer" | "icon">>;
export default _default;
