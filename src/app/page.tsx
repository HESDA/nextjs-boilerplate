"use client"

import React from "react";
import { apiDocs } from "../data/apiDocs";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "../components/ui/accordion";
import { Badge } from "../components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";

const getMethodColor = (method: string) => {
  switch (method) {
    case 'GET':
      return 'bg-blue-500 hover:bg-blue-600';
    case 'POST':
      return 'bg-green-500 hover:bg-green-600';
    case 'PUT':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'PATCH':
      return 'bg-orange-500 hover:bg-orange-600';
    case 'DELETE':
      return 'bg-red-500 hover:bg-red-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

export default function ApiDocumentationPage() {
  if (!apiDocs || apiDocs.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              <h2 className="text-xl font-semibold mb-2">Tidak Ada Data</h2>
              <p>Dokumentasi API tidak tersedia saat ini.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Dokumentasi API
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Panduan lengkap untuk menggunakan API kami. Setiap endpoint dilengkapi dengan 
          contoh response dan penjelasan status yang berbeda.
        </p>
      </div>

      <div className="space-y-6">
        {apiDocs.map((api) => (
          <Card key={api.id} className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value={`item-${api.id}`} className="border-none">
                <AccordionTrigger className="px-6 py-4 hover:no-underline">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center space-x-4">
                      <Badge 
                        className={`${getMethodColor(api.method)} text-white font-semibold px-3 py-1`}
                      >
                        {api.method}
                      </Badge>
                      <span className="font-mono text-lg font-medium text-gray-800">
                        {api.url}
                      </span>
                    </div>
                  </div>
                </AccordionTrigger>
                
                <AccordionContent className="px-6 pb-6">
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Deskripsi</h3>
                      <p className="text-gray-700 leading-relaxed">{api.description}</p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Contoh Response</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {api.responses.map((resp, index) => (
                          <Card key={index} className={`${resp.color} text-white border-none`}>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-lg font-bold">
                                {resp.label}
                              </CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm opacity-90 mb-3">
                                {resp.description}
                              </p>
                              <div className="bg-black bg-opacity-20 rounded p-3">
                                <p className="text-xs opacity-75 mb-1">JSON Response:</p>
                                <pre className="text-xs text-left overflow-x-auto">
                                  {JSON.stringify(resp.example, null, 2)}
                                </pre>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        ))}
      </div>

      <div className="text-center mt-12 pt-8 border-t border-gray-200">
        <p className="text-gray-500">
          Dokumentasi API • Dibuat dengan Next.js dan Tailwind CSS
        </p>
      </div>
    </div>
  );
}
