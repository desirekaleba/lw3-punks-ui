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
