import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { siFacebook, siInstagram, siTiktok } from "simple-icons/icons";

export default function Footer() {
  return (
    <footer className="px-[5%]! pt-12! pb-24! bg-[#E6EBF1] border-t-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
      <div className="space-y-3!">
        <Image
          src="/cropped-icon.png"
          height={1024}
          width={1024}
          className="w-1/2"
          alt="icon"
        />
        <p>info@poolvalet.com</p>
        <p className="text-sm font-semibold text-accent-foreground">
          Customer Supports:
        </p>
        <p className="text-lg font-semibold">(629) 00001111</p>
        <p>8494 Signal Hill Road Manassas, Va</p>
      </div>

      <div className="space-y-3! flex flex-col">
        <h3 className="text-lg font-bold text-[#003B73]">Quick Links</h3>
        <Link href="/">Home</Link>
        <Link href="/">How it works</Link>
        <Link href="/help">Contact</Link>
      </div>

      <div className="space-y-3! flex flex-col">
        <h3 className="text-lg font-bold text-[#003B73]">Resources</h3>
        <Link href="/help">Help & Support</Link>
        <Link href="/tnc">Terms of services</Link>
        <Link href="/privacy">Privacy Policy</Link>
      </div>

      <div className="space-y-3! flex flex-col">
        <h3 className="text-lg font-bold text-[#003B73]">Contact with us</h3>
        <div className="flex gap-3 flex-wrap">
          <Button variant="ghost" size="icon" asChild>
            <Link href="#">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#003B73"
                className="w-8 h-8 text-black"
              >
                <title>TikTok</title>
                <path d={siTiktok.path} />
              </svg>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#003B73"
                className="w-8 h-8 text-black"
              >
                <title>Instagram</title>
                <path d={siInstagram.path} />
              </svg>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#">
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                fill="#003B73"
                className="w-8 h-8 text-black"
              >
                <title>Facebook</title>
                <path d={siFacebook.path} />
              </svg>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="#">
              <Image
                src="/icon/linkedin.svg"
                height={64}
                width={64}
                className="size-4"
                alt="ico"
              />
            </Link>
          </Button>
        </div>
      </div>

      <div className="space-y-3! flex flex-col">
        <h3 className="text-lg font-bold text-[#003B73]">Download app</h3>
        <Link href="/">
          <Image
            height={60}
            width={201}
            src="/icon/app-store.png"
            alt="ico"
            className="w-1/2"
          />
        </Link>
        <Link href="/">
          <Image
            height={60}
            width={201}
            src="/icon/play-store.png"
            alt="ico"
            className="w-1/2"
          />
        </Link>
      </div>
    </footer>
  );
}
