declare module 'react' {
  export type ReactNode = any;
  export type ReactElement = any;
  export type FC<P = Record<string, unknown>> = (props: P) => any;
  export type ComponentType<P = Record<string, unknown>> = (props: P) => any;
  export type RefObject<T> = { current: T | null };
  export type MutableRefObject<T> = { current: T };
  export type Ref<T> = ((instance: T | null) => void) | RefObject<T> | null;
  export type MouseEvent<T = Element> = any;
  export type FormEvent<T = Element> = any;
  export type CSSProperties = Record<string, string | number | undefined>;
  export type SetStateAction<T> = T | ((prevState: T) => T);
  export type Dispatch<T> = (value: T) => void;

  export const Fragment: any;
  export const StrictMode: any;

  export function useState<T>(initialState: T | (() => T)): [T, Dispatch<SetStateAction<T>>];
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useRef<T>(initialValue: T | null): RefObject<T>;
  export function useMemo<T>(factory: () => T, deps?: readonly unknown[]): T;
  export function useCallback<T extends (...args: any[]) => any>(callback: T, deps?: readonly unknown[]): T;
  export function createElement(...args: any[]): any;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module 'react-dom/client' {
  export function createRoot(container: Element | DocumentFragment | null): {
    render: (element: any) => void;
    unmount: () => void;
  };
}

declare module 'motion/react' {
  export const motion: any;
  export const AnimatePresence: any;
  export function animate(...args: any[]): any;
  export function useInView(...args: any[]): boolean;
  export function useMotionValue<T>(initial: T): any;
  export function useTransform(...args: any[]): any;
}

declare module 'lucide-react' {
  export const ArrowLeft: any;
  export const ArrowRight: any;
  export const ArrowUpRight: any;
  export const Activity: any;
  export const AlertTriangle: any;
  export const Award: any;
  export const BarChart: any;
  export const Bell: any;
  export const Bookmark: any;
  export const Briefcase: any;
  export const Building2: any;
  export const Calendar: any;
  export const Check: any;
  export const CheckCircle2: any;
  export const ChevronDown: any;
  export const ChevronRight: any;
  export const Clock: any;
  export const Code: any;
  export const Cpu: any;
  export const Cursor: any;
  export const Database: any;
  export const Download: any;
  export const Dribbble: any;
  export const DollarSign: any;
  export const Edit3: any;
  export const Eye: any;
  export const EyeOff: any;
  export const Facebook: any;
  export const FileText: any;
  export const Filter: any;
  export const Globe: any;
  export const Github: any;
  export const History: any;
  export const Home: any;
  export const Instagram: any;
  export const Layers: any;
  export const Layout: any;
  export const LayoutDashboard: any;
  export const Lightbulb: any;
  export const Link: any;
  export const Linkedin: any;
  export const Lock: any;
  export const Loader2: any;
  export const LogOut: any;
  export const Mail: any;
  export const MapPin: any;
  export const MessageSquare: any;
  export const Menu: any;
  export const Minus: any;
  export const MoreVertical: any;
  export const Phone: any;
  export const Plus: any;
  export const Quote: any;
  export const Search: any;
  export const Send: any;
  export const Settings: any;
  export const Share2: any;
  export const Shield: any;
  export const ShieldCheck: any;
  export const ShieldQuestion: any;
  export const ShieldAlert: any;
  export const Tag: any;
  export const Terminal: any;
  export const TrendingUp: any;
  export const Trash2: any;
  export const Twitter: any;
  export const Users: any;
  export const User: any;
  export const X: any;
  export const XCircle: any;
  export const Zap: any;
  export const ExternalLink: any;
  export const EyeOff: any;
  export const CheckCircle: any;
  export const ChevronUp: any;
}

declare module 'recharts' {
  export const BarChart: any;
  export const Bar: any;
  export const XAxis: any;
  export const YAxis: any;
  export const CartesianGrid: any;
  export const Tooltip: any;
  export const ResponsiveContainer: any;
  export const AreaChart: any;
  export const Area: any;
}

declare module 'clsx' {
  export default function clsx(...inputs: any[]): string;
}

declare module 'tailwind-merge' {
  export function twMerge(...inputs: any[]): string;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}