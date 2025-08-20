import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function HelpSupport() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-blue-900 text-white !py-16 !px-4">
        <div className="max-w-4xl !mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold !mb-6">
            Help & Support
          </h1>
          <p className="text-lg md:text-xl !mb-8 text-blue-100">
            Find answers to common questions or contact our support team for
            assistance with your freelance projects and bids.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl !mx-auto relative">
            <Input
              type="text"
              placeholder="Search for help..."
              className="w-full !h-12 !pr-20 text-gray-900 bg-white border-0 rounded-lg"
            />
            <Button className="absolute right-1 top-1 !h-10 !px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-md">
              SEARCH
            </Button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="!py-16 !px-4">
        <div className="max-w-4xl !mx-auto">
          <h2 className="text-3xl font-bold text-center !mb-12 text-gray-900">
            Frequently Asked Questions
          </h2>

          <Accordion type="single" collapsible className="!space-y-4">
            <AccordionItem
              value="item-1"
              className="bg-white rounded-lg border shadow-sm"
            >
              <AccordionTrigger className="!px-6 !py-4 text-left font-medium text-gray-900 hover:no-underline">
                How do I post a job on the platform?
              </AccordionTrigger>
              <AccordionContent className="!px-6 !pb-4 text-gray-600">
                To post a job, navigate to the &quot;Post a Job&quot; section,
                fill out the job details including title, description, budget,
                and timeline. Once submitted, your job will be reviewed and
                published for providers to bid on.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-2"
              className="bg-white rounded-lg border shadow-sm"
            >
              <AccordionTrigger className="!px-6 !py-4 text-left font-medium text-gray-900 hover:no-underline">
                What&apos;s the bidding process for providers?
              </AccordionTrigger>
              <AccordionContent className="!px-6 !pb-4 text-gray-600">
                Providers can browse available jobs and submit bids with their
                proposed timeline and cost. You can review all bids, check
                provider profiles and ratings, then select the best fit for your
                project.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-3"
              className="bg-white rounded-lg border shadow-sm"
            >
              <AccordionTrigger className="!px-6 !py-4 text-left font-medium text-gray-900 hover:no-underline">
                How can I secure my payment?
              </AccordionTrigger>
              <AccordionContent className="!px-6 !pb-4 text-gray-600">
                Our platform uses a secure escrow system. Funds are held in
                escrow when you accept a bid and are only released to the
                provider once you approve the completed work.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-4"
              className="bg-white rounded-lg border shadow-sm"
            >
              <AccordionTrigger className="!px-6 !py-4 text-left font-medium text-gray-900 hover:no-underline">
                What if I have a dispute with a freelancer?
              </AccordionTrigger>
              <AccordionContent className="!px-6 !pb-4 text-gray-600">
                In case of a dispute, our resolution center is available to
                mediate. We encourage direct communication first, but if an
                agreement can&apos;t be reached, our support team will step in
                to help.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem
              value="item-5"
              className="bg-white rounded-lg border shadow-sm"
            >
              <AccordionTrigger className="!px-6 !py-4 text-left font-medium text-gray-900 hover:no-underline">
                Can I edit my job post after publishing?
              </AccordionTrigger>
              <AccordionContent className="!px-6 !pb-4 text-gray-600">
                Yes, you can edit your job post within a certain timeframe or
                until bids have been accepted. Go to your &quot;My Jobs&quot;
                section and select the option to edit the details of your active
                listing.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      {/* Support Options */}
      <section className="!py-16 !px-4 bg-white">
        <div className="max-w-6xl !mx-auto">
          <div className="grid md:grid-cols-2 !gap-8">
            {/* Live Chat Support */}
            <Card className="bg-gray-100 border-0">
              <CardHeader className="text-center !pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Live Chat Support
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 !mb-6 text-base leading-relaxed">
                  Chat with our support team in real-time for immediate
                  assistance. Available Monday-Friday, 9am-6pm EST.
                </CardDescription>
                <Button
                  className="bg-blue-900 hover:bg-blue-800 text-white !px-8 !py-2 rounded-md"
                  asChild
                >
                  <Link href={`/chat?id={1}`}>Start Live Chat</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Submit a Ticket */}
            <Card className="bg-gray-100 border-0">
              <CardHeader className="text-center !pb-4">
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Submit a Ticket
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 !mb-6 text-base text-center">
                  Can&apos;t find what you need? Send us a message and
                  we&apos;ll get back to you within 24 hours.
                </CardDescription>

                <form className="!space-y-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 !mb-1"
                    >
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      className="w-full bg-white border-gray-300"
                      placeholder="Enter your name"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 !mb-1"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      className="w-full bg-white border-gray-300"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="question"
                      className="block text-sm font-medium text-gray-700 !mb-1"
                    >
                      Your Question
                    </label>
                    <Textarea
                      id="question"
                      className="w-full bg-white border-gray-300 min-h-[100px]"
                      placeholder="Describe your question or issue..."
                    />
                  </div>

                  <div className="text-center !pt-2">
                    <Button className="bg-blue-900 hover:bg-blue-800 text-white !px-8 !py-2 rounded-md">
                      Submit Ticket
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
