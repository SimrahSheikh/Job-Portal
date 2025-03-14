export default function ProfileSkeleton() {
    return (
        <div className="p-6 bg-white shadow-md rounded-lg max-w-2xl mx-auto animate-pulse">
            {/* Profile Picture and Edit Button */}
            <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                    <div className="h-6 w-32 bg-gray-300 rounded"></div>
                </div>
                <div className="h-8 w-16 bg-gray-300 rounded"></div>
            </div>

            {/* Upload Profile Picture */}
            <div className="mt-4 flex flex-col items-center">
                <div className="h-10 w-32 bg-gray-300 rounded"></div>
            </div>

            {/* Form Fields */}
            <div className="mt-6 space-y-4">
                <div className="h-5 w-24 bg-gray-300 rounded"></div>
                <div className="h-10 w-full bg-gray-300 rounded"></div>

                <div className="h-5 w-24 bg-gray-300 rounded"></div>
                <div className="h-10 w-full bg-gray-300 rounded"></div>

                <div className="h-5 w-24 bg-gray-300 rounded"></div>
                <div className="h-10 w-full bg-gray-300 rounded"></div>

                <div className="h-5 w-24 bg-gray-300 rounded"></div>
                <div className="h-10 w-full bg-gray-300 rounded"></div>

                <div className="h-5 w-24 bg-gray-300 rounded"></div>
                <div className="h-10 w-full bg-gray-300 rounded"></div>
            </div>

            {/* Resume Button */}
            <div className="mt-6">
                <div className="h-10 w-32 bg-gray-300 rounded"></div>
            </div>

            {/* Skills Section */}
            <div className="mt-6">
                <div className="h-5 w-24 bg-gray-300 rounded"></div>
                <div className="mt-2 flex space-x-2">
                    <div className="h-8 w-16 bg-gray-300 rounded"></div>
                    <div className="h-8 w-20 bg-gray-300 rounded"></div>
                    <div className="h-8 w-24 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    );
}
