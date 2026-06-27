import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function MenuSkeleton() {
    return (
        <SkeletonTheme baseColor="#EFEAE2" highlightColor="#FAF7F2">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                {[...Array(8)].map((_, idx) => (
                    <div
                        key={idx}
                        className="rounded-2xl p-4 sm:p-5 border border-gray-300/85 flex flex-col justify-between w-full min-h-[380px]"
                    >
                        <div className="rounded-xl w-full h-56 sm:h-64 md:h-72 mb-4 overflow-hidden">
                            <Skeleton height="100%" width="100%" />
                        </div>

                        <div className="grow flex flex-col">
                            <div className="mb-2">
                                <Skeleton height={24} width="70%" />
                            </div>
                            <div className="grow space-y-1">
                                <Skeleton height={14} width="100%" />
                                <Skeleton height={14} width="85%" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-4">
                            <Skeleton height={28} width={70} />
                            <Skeleton circle width={40} height={40} />
                        </div>
                    </div>
                ))}
            </div>
        </SkeletonTheme>
    );
}

