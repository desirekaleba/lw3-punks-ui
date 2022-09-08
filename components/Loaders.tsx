import { FaChartLine } from "react-icons/fa";

type Props = {
    loading?: boolean,
    className?: string;
    loaderClassName?: string;
    text: string | React.ReactNode;
};

export const AnimatedText = ({
    text,
    loading = false,
    className,
    loaderClassName = ""
}: Props) => {
    if (loading) {
        return (
            <div
                className={`animate-pulse h-4 bg-slate-200 rounded ${loaderClassName}`}
            />
        );
    }
    return <div className={className}>{text}</div>;
};

export const NftCardLoader = () => {
    return (
        <div className="bg-white border rounded-lg p-4">
            <div className="animated-pulse">
                <div className="aspect-square bg-slate-200 rounded-lg" />
                <div className="mt-3 flex space-x-3">
                    <div className="flex-1">
                        <div>
                            <div className="h-4 bg-slate-200" />
                            <div className="h-4 bg-slate-200 w-32 mt-2" />
                        </div>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-slate-200" />
                </div>
            </div>
        </div>
    );
};

export const Spinner = () => {
    return (
        <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 text-primary"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
};

export const TransactionLoader = () => {
    return (
        <div className="p-4 border-b mb-3">
            <div className="animate-pulse flex space-x-4">
                <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                        <div className="grid grid-cols-3 gap-4">
                            <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const ChartLoader = ({ className = "h-96" }: { className?: string }) => {
    return (
        <div
            className={`w-full border rounded-lg bg-slate-200 animate-pulse flex justify-center items-center ${className}`}
        >
            <FaChartLine className="text-4xl animate-bounce" />
        </div>
    );
};
