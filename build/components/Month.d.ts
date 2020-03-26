import * as React from "react";
import { Theme, WithStyles } from "@material-ui/core";
import { NavigationAction, DateRange } from "../types";
declare const styles: (_: Theme) => Record<"root" | "weekDaysContainer" | "daysContainer", import("@material-ui/styles").CSSProperties | import("@material-ui/styles").CreateCSSProperties<{}> | ((props: {}) => import("@material-ui/styles").CreateCSSProperties<{}>)>;
interface MonthProps extends WithStyles<typeof styles> {
    value: Date;
    marker: symbol;
    dateRange: DateRange;
    minDate: Date;
    maxDate: Date;
    navState: [boolean, boolean];
    setValue: (date: Date) => void;
    helpers: {
        inHoverRange: (day: Date) => boolean;
    };
    handlers: {
        onDayClick: (day: Date) => void;
        onDayHover: (day: Date) => void;
        onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
    };
    weekDays?: [string, string, string, string, string, string, string];
    months?: [string, string, string, string, string, string, string, string, string, string, string, string];
}
declare const _default: React.ComponentType<Pick<React.PropsWithChildren<MonthProps>, "marker" | "value" | "dateRange" | "minDate" | "maxDate" | "navState" | "setValue" | "helpers" | "handlers" | "weekDays" | "months" | "children"> & import("@material-ui/core").StyledComponentProps<"root" | "weekDaysContainer" | "daysContainer">>;
export default _default;
