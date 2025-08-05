import React from "react";
import { CheckCircle2Icon } from "lucide-react";
import Image from "next/image";
export default function Features() {
  return (
    <>
      <section>
        <h2 className="text-center text-xl lg:text-3xl mb-12!">
          Are You A Homeowner Or A Pool Service Pro ?
        </h2>

        <div className="w-full py-6! bg-gradient-to-b from-[#003B7360] to-20% to-[#003B73] rounded-lg ">
          <h3 className="text-xl lg:text-3xl text-center text-background mb-8!">
            For Homeowners
          </h3>
          <div className="w-full relative pb-12!">
            <div className="absolute w-full lg:w-1/2 left-0 to-0 h-full z-20 flex items-center justify-center">
              <ul className="space-y-3! text-lg ">
                <li className="flex gap-2 items-center text-background">
                  <CheckCircle2Icon
                    stroke="#ffffff"
                    fill="#33628F"
                    className="size-8"
                  />
                  Save time comparing quotes
                </li>
                <li className="flex gap-2 items-center text-background">
                  <CheckCircle2Icon
                    stroke="#ffffff"
                    fill="#33628F"
                    className="size-8"
                  />
                  Work with trusted professionals
                </li>
                <li className="flex gap-2 items-center text-background">
                  <CheckCircle2Icon
                    stroke="#ffffff"
                    fill="#33628F"
                    className="size-8"
                  />
                  Track your service requests
                </li>
                <li className="flex gap-2 items-center text-background">
                  <CheckCircle2Icon
                    stroke="#ffffff"
                    fill="#33628F"
                    className="size-8"
                  />
                  Secure payment processing
                </li>
              </ul>
            </div>
            <div className="grid lg:grid-cols-7 items-center gap-6 lg:!pr-24">
              {/* Background image with subtle blur and low opacity */}
              <div className="lg:col-span-1">
                <Image
                  src="/image/sac.jpg"
                  alt="Background"
                  width={600}
                  height={600}
                  className="w-full h-[50dvh] object-cover rounded-r-lg blur-[1px] opacity-20 hidden lg:block"
                />
              </div>

              {/* Middle image with medium opacity and blur */}
              <div className="lg:col-span-3">
                <Image
                  src="/image/sab.jpg"
                  alt="Decorative"
                  width={600}
                  height={600}
                  className="w-full h-[50dvh] aspect-square object-cover rounded-lg blur-[1px] opacity-40 "
                />
              </div>

              {/* Foreground image with full visibility */}
              <div className="lg:col-span-3">
                <Image
                  src="/image/saa.png"
                  alt="Foreground"
                  width={600}
                  height={600}
                  className="w-full h-[55dvh] aspect-square object-cover rounded-lg hidden lg:block"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full py-6! bg-gradient-to-b from-[#003B7360] to-20% to-[#003B73] rounded-lg mt-12!">
          <h3 className="text-xl lg:text-3xl text-center text-background mb-8!">
            For Pool Service Providers
          </h3>
          <div className="w-full relative pb-12!">
            <div className="absolute w-full lg:w-1/2 right-0 to-0 h-full z-20 flex items-center justify-center">
              <ul className="space-y-3! text-lg ">
                <li className="flex gap-2 items-center text-background">
                  <CheckCircle2Icon
                    stroke="#ffffff"
                    fill="#33628F"
                    className="size-8"
                  />
                  Quality leads and customers
                </li>
                <li className="flex gap-2 items-center text-background">
                  <CheckCircle2Icon
                    stroke="#ffffff"
                    fill="#33628F"
                    className="size-8"
                  />
                  Easy quote management
                </li>
                <li className="flex gap-2 items-center text-background">
                  <CheckCircle2Icon
                    stroke="#ffffff"
                    fill="#33628F"
                    className="size-8"
                  />
                  Build your reputation
                </li>
                <li className="flex gap-2 items-center text-background">
                  <CheckCircle2Icon
                    stroke="#ffffff"
                    fill="#33628F"
                    className="size-8"
                  />
                  Streamlined scheduling
                </li>
              </ul>
            </div>
            <div className="grid lg:grid-cols-7 items-center gap-6 lg:!pl-24 ">
              {/* Foreground image with full visibility */}
              <div className="col-span-3 hidden lg:block">
                <Image
                  src="/image/sba.png"
                  alt="Foreground"
                  width={600}
                  height={600}
                  className="w-full h-[55dvh] aspect-square object-cover rounded-lg"
                />
              </div>

              {/* Middle image with medium opacity and blur */}
              <div className="col-span-3">
                <Image
                  src="/image/sbb.jpg"
                  alt="Decorative"
                  width={600}
                  height={600}
                  className="w-full h-[50dvh] aspect-square object-cover rounded-lg blur-[1px] opacity-40"
                />
              </div>
              {/* Background image with subtle blur and low opacity */}
              <div className="col-span-1 hidden lg:block">
                <Image
                  src="/image/sbc.jpg"
                  alt="Background"
                  width={600}
                  height={600}
                  className="w-full h-[50dvh] object-cover rounded-r-lg blur-[1px] opacity-20"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
