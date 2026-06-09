import { createContext, useContext } from 'react';
import type { SegueDirection } from '../PathParser';

const SegueContext = createContext<SegueDirection>('lateral');

export const useSegueDirection = () => useContext(SegueContext);

export default SegueContext;
