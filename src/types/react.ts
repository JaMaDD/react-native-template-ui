import type { Dispatch, SetStateAction } from 'react';
import type { LayoutChangeEvent } from 'react-native';

export type Timeout = ReturnType<typeof setTimeout>;

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type OnLayout = (event: LayoutChangeEvent) => void;
