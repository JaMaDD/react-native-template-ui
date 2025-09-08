import type { Dispatch, SetStateAction } from 'react';
import type { LayoutChangeEvent } from 'react-native';

export type Timeout = NodeJS.Timeout;

export type SetState<T> = Dispatch<SetStateAction<T>>;

export type OnLayout = (event: LayoutChangeEvent) => void;
