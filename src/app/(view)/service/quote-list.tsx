import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import All from "./all";
import Pending from "./pending";
import InProgress from "./inprogress";
import Complete from "./complete";

export default function QuoteList() {
  return (
    <Card className="w-2/3 mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-accent-foreground">
          Service
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs className="mb-6" defaultValue="all">
          <TabsList className="bg-inherit">
            <TabsTrigger value="all" className="data-[state=active]:border-b-2">
              All
            </TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="complete">Complete</TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <All />
          </TabsContent>
          <TabsContent value="pending">
            <Pending />
          </TabsContent>
          <TabsContent value="progress">
            <InProgress />
          </TabsContent>
          <TabsContent value="complete">
            <Complete />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
