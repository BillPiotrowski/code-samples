import { useOutletContext } from 'react-router-dom';
import type { SplitNavContext } from './SplitNavContext';

const useSplitNavContext = <T = Record<string, never>>() =>
    useOutletContext<SplitNavContext & T>();

export default useSplitNavContext;
