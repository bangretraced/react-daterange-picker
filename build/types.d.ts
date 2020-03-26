/// <reference types="react" />
export interface DateRange {
    startDate?: Date;
    endDate?: Date;
}
export declare type Setter<T> = React.Dispatch<React.SetStateAction<T>> | ((value: T) => void);
export declare enum NavigationAction {
    Previous = -1,
    Next = 1
}
export declare type DefinedRange = {
    startDate: Date;
    endDate: Date;
    label: string;
};
