import React from "react";

export default function MilestonesGallery() {
  return (
    <div className=" bg-white section-padding">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-3 xl:grid-cols-4 lg:gap-5 gap-2.5">
          {/* Left Content Section - Column 1 */}
          <div className="lg:col-span-1 flex flex-col">
            <div className="mb-8">
              <h1 className="xl:text-5xl text-3xl  font-bold text-gray-900 mb-4 leading-tight">
                Milestones & Memories
              </h1>
              <p className="text-gray-600 text-base leading-relaxed">
                Take a look at our drone journey — from stunning aerial shots
                and surveying projects to real estate promotions and specialized
                operations. Every image reflects precision, innovation, and
                excellence in flight.
              </p>
            </div>

            {/* Bottom left image */}
            <div className="h-[448px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=800&h=900&fit=crop"
                alt="Drone in hand"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Column 2 */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="h-[448px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=800&h=900&fit=crop"
                alt="Drone on grass"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="h-[244px] rounded-lg overflow-hidden">
              <img
                src="https://farm.ws/wp-content/uploads/2022/07/dji-gfe543099e_640.jpg"
                alt="Delivery drone over city"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Column 3 */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <div className="h-[244px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?w=800&h=500&fit=crop"
                alt="Drone flying in sky"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="h-[448px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&h=900&fit=crop"
                alt="Drone close-up"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          {/* Column 4 */}
          <div className="hidden xl:flex lg:col-span-1 flex-col gap-5">
            <div className="h-[448px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?w=800&h=900&fit=crop"
                alt="Drone with autumn background"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="h-[244px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1464037866556-6812c9d1c72e?w=800&h=500&fit=crop"
                alt="Drone over landscape"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Bottom wide image spanning columns 2-4 */}
        <div className="lg:mt-5 mt-2.5 lg:ml-[calc(25%+1.25rem)]">
          
        </div>
      </div>
    </div>
  );
}
