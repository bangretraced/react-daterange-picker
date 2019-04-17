import * as React from "react";
import {
	MuiThemeProvider,
	createMuiTheme,
	CssBaseline,
	createStyles,
	WithStyles,
	withStyles,
	Theme
} from "@material-ui/core";
import {
	addMonths,
	isSameDay,
	isWithinRange,
	isAfter,
	isBefore,
	isSameMonth,
	addYears,
	max,
	min
} from "date-fns";
import { DateRange, NavigationAction, DefinedRange } from "./types";
import Menu from "./components/Menu";
import { defaultRanges } from "./defaults";
import { parseOptionalDate } from "./utils";

const theme = createMuiTheme({ typography: { useNextVariants: true } });
type Marker = symbol;

export const MARKERS: { [key: string]: Marker } = {
	FIRST_MONTH: Symbol("firstMonth"),
	SECOND_MONTH: Symbol("secondMonth")
};

const styles = (theme: Theme) =>
	createStyles({
		header: {
			padding: "20px 70px"
		},
		headerItem: {
			flex: 1
		},
		divider: {
			borderLeft: `1px solid ${theme.palette.action.hover}`,
			marginBottom: 20
		}
	});

interface DateRangePickerProps extends WithStyles<typeof styles> {
	open: boolean;
	initialDateRange?: DateRange;
	definedRanges?: DefinedRange[];
	minDate?: Date | string;
	maxDate?: Date | string;
	onChange: (dateRange: DateRange) => void;
}

const DateRangePickerImpl: React.FunctionComponent<DateRangePickerProps> = props => {
	const today = new Date();

	const {
		classes,
		open,
		onChange,
		initialDateRange,
		minDate,
		maxDate,
		definedRanges = defaultRanges
	} = props;

	const minDateValid = parseOptionalDate(minDate, addYears(today, -10));
	const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10));

	// console.log("rendering DateRangePicker");
	const [dateRange, setDateRange] = React.useState<DateRange>({ ...initialDateRange });
	const [hoverDay, setHoverDay] = React.useState<Date>();
	const [firstMonth, setFirstMonth] = React.useState<Date>(
		(initialDateRange && initialDateRange.startDate) || today
	);
	const [secondMonth, setSecondMonth] = React.useState<Date>(
		(initialDateRange && initialDateRange.endDate) || addMonths(firstMonth, 1)
	);

	const { startDate, endDate } = dateRange;

	// handlers
	const setFirstMonthValidated = (date: Date) => {
		if (isBefore(date, secondMonth)) {
			setFirstMonth(date);
		}
	};

	const setSecondMonthValidated = (date: Date) => {
		if (isAfter(date, firstMonth)) {
			setSecondMonth(date);
		}
	};

	const setDateRangeValidated = (range: DateRange) => {
		let { startDate: newStart, endDate: newEnd } = range;
		if (newStart && newEnd) {
			range.startDate = newStart = max(newStart, minDateValid);
			range.endDate = newEnd = min(newEnd, maxDateValid);

			setDateRange(range);
			setFirstMonth(newStart);
			setSecondMonth(isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd);
		}
	};

	const onDayClick = (day: Date) => {
		if (startDate && !endDate && !isBefore(day, startDate)) {
			const newRange = { startDate, endDate: day };
			onChange(newRange);
			setDateRange(newRange);
		} else {
			setDateRange({ startDate: day, endDate: undefined });
		}
		setHoverDay(day);
	};

	const onMonthNavigate = (marker: Marker, action: NavigationAction) => {
		if (marker == MARKERS.FIRST_MONTH) {
			const firstNew = addMonths(firstMonth, action);
			if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
		} else {
			const secondNew = addMonths(secondMonth, action);
			if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
		}
	};

	const onDayHover = (date: Date) => {
		if (startDate && !endDate) {
			if (!hoverDay || !isSameDay(date, hoverDay)) {
				setHoverDay(date);
			}
		}
	};

	// helpers
	const inHoverRange = (day: Date) => {
		return (startDate &&
			!endDate &&
			hoverDay &&
			isAfter(hoverDay, startDate) &&
			isWithinRange(day, startDate, hoverDay)) as boolean;
	};

	const helpers = {
		inHoverRange
	};

	const handlers = {
		onDayClick,
		onDayHover,
		onMonthNavigate
	};

	return (
		<MuiThemeProvider theme={theme}>
			<CssBaseline />
			{open && (
				<Menu
					dateRange={dateRange}
					minDate={minDateValid}
					maxDate={maxDateValid}
					ranges={definedRanges}
					firstMonth={firstMonth}
					secondMonth={secondMonth}
					setFirstMonth={setFirstMonthValidated}
					setSecondMonth={setSecondMonthValidated}
					setDateRange={setDateRangeValidated}
					helpers={helpers}
					handlers={handlers}
				/>
			)}
		</MuiThemeProvider>
	);

	//return (<Typography>Hello blahblas {props.title}</Typography>);
};

export const DateRangePicker = withStyles(styles)(DateRangePickerImpl);