/// <reference types="react" />
interface DayProps {
    filled?: boolean;
    outlined?: boolean;
    highlighted?: boolean;
    disabled?: boolean;
    startOfRange?: boolean;
    endOfRange?: boolean;
    onClick?: () => void;
    onHover?: () => void;
    value: number | string;
}
declare const Day: (props: DayProps) => JSX.Element;
export default Day;
