import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function OrderSkeleton() {
    return (
        <SkeletonTheme baseColor="#EFEAE2" highlightColor="#FAF7F2">
            <div className="space-y-4">
                {[...Array(3)].map((_, idx) => (
                    <div key={idx} className="border border-gray-200/50 rounded-2xl p-4 lg:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="w-full sm:w-auto space-y-2">
                            <div className="flex items-center gap-2 flex-wrap">
                                <Skeleton height={20} width={120} />
                                <Skeleton height={20} width={80} borderRadius={9999} />
                            </div>
                            <Skeleton height={14} width={150} />
                            <Skeleton height={14} width={220} className="mt-2" />
                        </div>
                        <div className="text-right w-full sm:w-auto border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-100 flex justify-end">
                            <Skeleton height={28} width={80} />
                        </div>
                    </div>
                ))}
            </div>
        </SkeletonTheme>
    );
}
