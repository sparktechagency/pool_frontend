import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
        <Tabs className="mb-6" defaultValue="pending">
          <TabsList className="bg-inherit">
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="complete">Complete</TabsTrigger>
          </TabsList>
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
